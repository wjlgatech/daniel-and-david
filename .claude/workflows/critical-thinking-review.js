export const meta = {
  name: 'critical-thinking-review',
  description: 'Interrogate a target (claim, plan, product, venture idea, decision) through the 5W1H critical-thinking grid — six agents in parallel, one per question-word, then an honest synthesized verdict.',
  whenToUse: 'Before committing to a venture decision, trusting a bold claim, or shipping something with real consequences. Pass the target as args (a string, or {target, context}).',
  phases: [
    { title: 'Interrogate', detail: 'six agents, one per question-word (Who/What/Where/When/Why/How)' },
    { title: 'Synthesize', detail: 'one agent weighs all findings into a verdict' },
  ],
}

// The target to interrogate comes from `args`.
const target =
  typeof args === 'string' ? args
  : args && args.target ? args.target
  : null

if (!target) {
  log('No target provided. Pass the thing to interrogate as args, e.g. "Sell power-bank rentals at $15 with a $25 deposit".')
  return { error: 'no target' }
}
const context = (args && args.context) ? `\n\nContext:\n${args.context}` : ''

const LENSES = [
  { word: 'WHO',   ask: 'Who benefits? Who is harmed? Who decides? Who is most affected? Who should be consulted? Who is missing from the picture (esp. vulnerable people, e.g. children who cannot consent)?' },
  { word: 'WHAT',  ask: 'What are the strengths and weaknesses? What is another perspective or alternative? What is the strongest counter-argument? What is the best and worst case? What is most important, and what is getting in the way?' },
  { word: 'WHERE', ask: 'Where would this show up in the real world? Where are similar situations or precedents? Where is the most need? Where could it become a problem? Where can we get more information or help?' },
  { word: 'WHEN',  ask: 'When is this acceptable vs unacceptable? When would it benefit or harm society? When is the right time to act? When will we know we have succeeded? When might it change?' },
  { word: 'WHY',   ask: 'Why is this a problem worth solving? Why is it relevant? Why has nobody already done it (or why has it been this way so long)? Is there a real need today? Keep asking "why" up the chain to the root.' },
  { word: 'HOW',   ask: 'How does this work? How is it similar to something known? How could it disrupt or harm us/others? How do we KNOW it is true (verify, do not assume)? How do we approach it safely? How could it be changed for good?' },
]

const FINDINGS_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: ['word', 'findings', 'sharpest'],
  properties: {
    word: { type: 'string' },
    findings: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['point', 'kind'],
        properties: {
          point: { type: 'string', description: 'one concrete observation about the target' },
          kind: { type: 'string', enum: ['risk', 'opportunity', 'assumption', 'unknown'] },
        },
      },
    },
    sharpest: { type: 'string', description: 'the single most important / most-tempting-to-skip question this lens raises, answered honestly' },
  },
}

const VERDICT_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: ['verdict', 'reason', 'topRisks', 'uncomfortableQuestion', 'valuesCheck'],
  properties: {
    verdict: { type: 'string', enum: ['proceed', 'proceed-with-changes', 'stop'] },
    reason: { type: 'string', description: 'the single most important reason for the verdict' },
    topRisks: { type: 'array', items: { type: 'string' }, description: 'the 2-4 risks that matter most' },
    uncomfortableQuestion: { type: 'string', description: 'the question most tempting to skip, answered honestly' },
    valuesCheck: { type: 'string', description: 'how this squares with the four-question values test (true? legal/word-kept? serves? proud?) — flag anything that needs a human decision' },
  },
}

// --- Interrogate: six lenses in parallel ---
const lensResults = await parallel(
  LENSES.map(l => () =>
    agent(
      `You are applying the ${l.word} lens of the 5W1H critical-thinking grid to this target:\n\n"${target}"${context}\n\n${l.ask}\n\nReturn only what the ${l.word} lens genuinely surfaces — concrete, specific, honest. Prefer uncomfortable truths over reassurance.`,
      { label: `5W1H:${l.word}`, phase: 'Interrogate', schema: FINDINGS_SCHEMA }
    )
  )
)

const found = lensResults.filter(Boolean)
log(`Interrogated through ${found.length}/6 lenses. ${found.reduce((n, r) => n + (r.findings?.length || 0), 0)} findings.`)

// --- Synthesize: one honest verdict ---
const digest = found.map(r =>
  `### ${r.word}\n` +
  (r.findings || []).map(f => `- (${f.kind}) ${f.point}`).join('\n') +
  `\nSharpest: ${r.sharpest}`
).join('\n\n')

const verdict = await agent(
  `Here is a 5W1H critical-thinking interrogation of this target:\n\n"${target}"\n\n${digest}\n\n` +
  `Weigh it honestly. Do not rationalize. Check it against this project's four-question values test ` +
  `(Is it true? Is it legal and is my word kept? Does it genuinely serve someone? Would I be proud to explain it?). ` +
  `Anything that is a human values/legal judgment call, flag for a human — do not self-approve it. ` +
  `Return your verdict.`,
  { label: 'synthesize-verdict', phase: 'Synthesize', schema: VERDICT_SCHEMA }
)

return { target, lenses: found, verdict }
