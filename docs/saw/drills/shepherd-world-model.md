# Drill · The Shepherd's World Model (15 minutes, ages 7–11 with a grown-up)

**What it is.** A browser game in which a shepherd learns a wolf's secret habit in order to guard two flocks. It is the
smallest real "world model" in AI: watch, count what happens, plan on the counts, act, repeat. That is section 19.3 of
Stanford's CS229 notes, so a child can play the exact loop that robot researchers build on. It uses SAW's picture: learn
how the attack works, so you can protect. The wolf is an animal. No person is ever the enemy.

| | Link |
|---|---|
| ▶️ The game (no install, works on a phone) | https://agentic-portfolio-lovat.vercel.app/play/shepherd.html |
| 📖 The essay behind it (for the grown-up) | https://agentic-portfolio-lovat.vercel.app/articles/world-models-start-in-cs229.html |
| 💬 Where to report the result | the comments at the bottom of the essay |

**Status, honestly.** Built 2026-10-16. Not yet run with our own sons as written. Each run reported in the essay's comments
is counted in [`signal.json`](../signal.json) as `shepherd_demo_drills`. That is a **supplementary** number. It is not one
of SAW's four signal numbers, it never counts toward `family_drills_run` (the weekly car-ride drill in
[part 5](https://agentic-portfolio-lovat.vercel.app/articles/saw-scorecard-drill-numbers-tripwires.html)), and it is not
the SAW build.

The game's buttons are in English. Each step below names the button.

---

## English script

**Opening (1 min).** "Today you two are coaches. We're going to teach a shepherd to protect the sheep, and at the end
you'll explain to me how the shepherd got smart. I'll be the student. See the two flocks 🐑 in the bottom corners, the
shepherd 🧑‍🌾 between them, and the wolf 🐺 coming in from the top. The wolf is fast: for every step the shepherd takes,
the wolf takes two. So chasing doesn't work. The shepherd has to be waiting where the wolf is going."

**Step 1 · Hide the wolf's secret (2 min).** "Older brother, pick the wolf's habit without letting your younger brother
see. There are four: *River sneak*, *Ridge runner*, *Straight runner*, *Wanderer*. The shepherd isn't told which one
either. It has to work it out."

**Step 2 · Guess first, then watch (6 min).** Before each press of **Watch one night**, ask:
- the younger one: "Which way will the wolf go, left or right?"
- the older one: "Where should the shepherd stand?"

After the night, ask: "Did you guess right? Did the shepherd turn the wolf away?" Point at the light-orange squares:
"That is where the shepherd *thinks* the wolf will go next. At first it knows nothing and guesses every direction
equally. The darker the orange, the surer it is." Play 5–10 nights.

**Step 3 · Fast-forward 30 nights (2 min).** Press **Learn 30 nights**. "How many wolves did it turn away? Look at the line
underneath: a shepherd who never learns only turns away this many. What's the difference?"

**Step 4 · The dream (1 min, older one).** Tap **Engineer mode**, then **Dream one night**. "This grey wolf isn't real.
It moves the way the shepherd *thinks* this wolf moves. The shepherd rehearses in its head first, so it knows where to
stand when the real wolf comes. Scientists call that a *world model*: a small map of the world inside your head, used to
try things out before you act."

**Step 5 · You teach me (3 min).** "Now I'm the student. Teach me:
1. Why couldn't the shepherd stop the wolf at first?
2. What did it learn? Say it in one sentence, like 'the wolf sneaks down the river on the left'.
3. If the wolf just wanders, can the shepherd still learn anything? Why or why not?"

**Close (30 s).** "The shepherd doesn't hate the wolf. It studies the wolf's habits to protect the sheep. That's our
academy's rule: learn how an attack works, so you can live as a protector."

**After (grown-up).** Post in the essay's comments: both children's ages, the sentence "what the shepherd learned", and
how many wolves were turned away. Example: "11 and 7. The younger one said: the wolf likes to sneak down the river on the
left. Turned away 28 of 30."

---

## 中文引导词

**开场（1 分钟）**："今天我们玩一个游戏。你们俩当教练，教一个牧羊人保护羊群。最后你们要给我讲讲，牧羊人是怎么变聪明的，我来当学生。你们看，下面两个角落各有一群羊 🐑，中间是牧羊人 🧑‍🌾，狼 🐺 从最上面进来。狼跑得快，牧羊人走一步，狼能走两步。所以牧羊人光追是追不上的，得提前站到狼要去的地方。"

**第一步：藏起狼的秘密（2 分钟）**："哥哥，你偷偷选狼的习惯，别让弟弟看见。有四种：河边偷偷溜（River sneak）、山脊快跑（Ridge runner）、直冲羊群（Straight runner）、乱逛（Wanderer）。牧羊人也不知道你选了哪个，它得自己看出来。"

**第二步：先猜，再看（6 分钟）**：每晚按一次"看一晚"（Watch one night），按之前先问：
- 问弟弟："狼会往哪边走？左边还是右边？"
- 问哥哥："牧羊人应该站在哪里？"

看完问："猜对了吗？牧羊人拦住狼了吗？"再指着淡橙色的格子说："这是牧羊人心里猜狼下一步会去的地方。一开始它什么都不知道，每个方向都一样猜。橙色越深，它越确定。"这样玩 5 到 10 晚。

**第三步：快进 30 晚（2 分钟）**：按"学 30 晚"（Learn 30 nights）。"看分数，它拦住了几只狼？再看下面那行：一个从来不学习的牧羊人只能拦住这么多。差别在哪？"

**第四步：做梦（1 分钟，哥哥可以试）**：先点"工程师模式"（Engineer mode），再按"做梦"（Dream one night）。"这只灰色的狼不是真的，它是按牧羊人心里以为的样子在走。牧羊人在梦里先演练一遍，醒来就知道该站哪了。科学家管这个叫'世界模型'：心里有一张世界的小地图，先在心里试，再去做。"

**第五步：你们来教我（3 分钟）**："现在我是学生，你们来教我：
1. 牧羊人一开始为什么老是拦不住？
2. 它后来学到了什么？用一句话说，比如'狼喜欢从左边河边溜下来'。
3. 如果狼是乱逛的，牧羊人还能学到东西吗？为什么？"

**收尾（30 秒）**："牧羊人不恨狼。它认真看狼的习惯，是为了保护羊。这就是我们学院说的：学会进攻是怎么回事，是为了做一个保护者。"

**玩完以后（家长）**：在文章底部留言，写上两个孩子的年龄、"牧羊人学到了什么"那句话，以及拦住了几只狼。例如："11 岁和 7 岁。弟弟说：狼喜欢从左边河边溜。30 晚里拦住 28 只。"
