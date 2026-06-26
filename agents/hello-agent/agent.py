#!/usr/bin/env python3
"""
hello-agent — your very first AI teammate.

An "agent" is just a loop: it LOOKS at a goal, THINKS of a step, ACTS, and CHECKS
whether it's done. Real agents use an AI model and tools to do the thinking and acting.
This tiny one uses plain Python so you can read every line and see the shape of it.

It plays "business coach": you give it a price and a cost, and it teaches you margin —
the most important number in any venture (see docs/curriculum/daniel-age-11).

Run it:
    python3 agents/hello-agent/agent.py
    python3 agents/hello-agent/agent.py --price 29 --cost 7
"""

import argparse


# --- A "tool" the agent can use. Real agents call many of these. ---
def margin_tool(price: float, cost: float) -> dict:
    """Compute the profit and margin for one sale."""
    profit = price - cost
    margin_pct = (profit / price * 100) if price else 0
    return {"profit": profit, "margin_pct": margin_pct}


# --- The agent loop: GOAL -> THINK -> ACT -> CHECK -> SPEAK ---
def run(price: float, cost: float) -> None:
    print("🤖 hello-agent: Hi! I'm your first AI teammate. Let's learn MARGIN.\n")

    # THINK: what do I need to do?
    print(f"   THINK: You sell something for ${price:.2f} that costs ${cost:.2f} to make.")

    # ACT: use a tool to do the work.
    result = margin_tool(price, cost)
    print("   ACT:   Using my margin_tool to do the math...")

    # CHECK + SPEAK: report the answer in plain language.
    print(f"\n   ➜ Profit per sale:  ${result['profit']:.2f}")
    print(f"   ➜ Margin:           {result['margin_pct']:.0f}%\n")

    if result["margin_pct"] >= 60:
        print("   🤖 That's a strong margin! For every sale, most of the money is profit.")
    elif result["margin_pct"] > 0:
        print("   🤖 You make money on each sale, but the margin is thin. Can you lower")
        print("      the cost, or charge a bit more for more value?")
    else:
        print("   🤖 Careful — you'd LOSE money on each sale. Price must beat cost!")

    print("\n   Your turn: change the --price and --cost and run me again. Experiment! 🧪")


def main() -> None:
    parser = argparse.ArgumentParser(description="Your first AI teammate: a margin coach.")
    # Defaults are the real numbers from venture #1's $29 Rain + Phone Rescue kit.
    parser.add_argument("--price", type=float, default=29.0, help="Selling price (default: 29)")
    parser.add_argument("--cost", type=float, default=7.0, help="Cost to make it (default: 7)")
    args = parser.parse_args()
    run(args.price, args.cost)


if __name__ == "__main__":
    main()
