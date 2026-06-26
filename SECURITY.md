# Security Policy

## Reporting a vulnerability

If you find a security issue — especially anything touching payments, customer data, or the
admin surface of a venture app — **please do not open a public issue.**

Email **wjlgatech@gmail.com** with:
- a description of the issue,
- steps to reproduce,
- and the potential impact.

We'll acknowledge within a few days and work with you on a fix and responsible disclosure.

## Scope and ground rules

This repo includes real-business specs (e.g. `ventures/kc-matchday-basecamp/`) that involve
payments and personal data. When contributing to those:

- **Never commit secrets.** No API keys, tokens, Stripe keys, or `.env` files. Use
  `.env.example` with placeholder values only. See `.gitignore`.
- **Never store card details.** Payment flows go through Stripe; the app stores references,
  not card numbers.
- **Respect privacy by default.** Collect the minimum data, gate admin actions behind auth
  and roles, and treat customer contact info as sensitive.
- **Keep dependencies honest.** Prefer well-known, maintained packages; flag anything risky.

A safe project is part of being trustworthy — which is the entire business model.
