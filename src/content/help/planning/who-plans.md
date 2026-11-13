---
title: "Choose who plans: Claude, Apple Intelligence or your own foods"
description: Turn planning with Claude on or off, see what each request sends, what each plan’s label means, and the plan requests Residual keeps on your iPhone.
lead: Three planners can write a day in Residual. Claude, from Anthropic, writes it if you allow it. Otherwise Apple Intelligence plans on your iPhone, or Residual builds the day from your own foods. Every plan says which one wrote it, and the solver sizes the portions either way.
order: 2
updated: 13 November 2026
since: "1.0"
---

## The first time you plan

Before anything is sent to Anthropic, Residual asks once: "Plan with Claude?". The prompt says what a request sends: your targets, the day's meals, the foods you've logged and saved, the foods you avoid, including allergies, and anything you type. It doesn't send your name, email or an account, and Anthropic doesn't train on it.

- **Use Claude** lets Claude write your plans, and suggest a food when the day can't land.
- **Plan on iPhone** keeps planning on your iPhone. Nothing goes to Anthropic.

The same question comes before the first food suggestion from Claude, if you haven't answered it yet. The [privacy policy](/privacy/) lists what each request sends.

## Change it later

Open `More → AI planning`. The row in More shows who plans right now: Claude, Apple Intelligence, or Your foods.

| Part of the page | What it does |
| --- | --- |
| Plan with Claude | The switch. Off, nothing is sent to Anthropic. |
| Apple Intelligence | What Apple Intelligence does on this iPhone: plans when Claude is off or can't be reached, names your meals, and reads the name and brand off package labels. |
| Every plan | Whoever writes a plan, Residual's solver sizes the portions to land your targets, and the plan says who wrote it. |
| Recent plan requests | The plan requests kept on this iPhone. See below. |

If Apple Intelligence isn't on, the page says so: plans are then built from your pantry and Residual's food library. To use it, turn on Apple Intelligence in the iPhone's Settings, on an iPhone that supports it.

## Who wrote this plan

The top of every proposed plan names the planner:

| Label | Who planned |
| --- | --- |
| Planned by Claude | Claude, from Anthropic. |
| Planned by Apple Intelligence on this iPhone | Apple's model, on your iPhone. Nothing left it. |
| Built from your pantry and library | Residual, from your pantry and the food library, with no AI. Expect rougher portions. |
| Built from your pantry | The same, with **Only plan from my pantry** on. |

While it works, Today says "Asking Claude…", "Planning on this iPhone…" or "Building from your pantry…".

When Claude is on and a plan wasn't written by Claude, the plan says why. It's one of these: you've reached today's Claude limit, you're offline, Claude couldn't be reached, or Claude's answer couldn't be used. [A plan isn't by Claude](/help/troubleshooting/planning-problems/) covers each message and what to do.

> [!NOTE] Claude has a daily limit
>
> Claude plans have a daily limit, and so do refinements and food suggestions. Past the plan limit, Apple Intelligence or your own foods write the day, and the plan says "You've reached today's Claude limit". Past the other, a refinement leaves the plan as it was; you can still edit any meal after you accept it. Claude is back tomorrow.

## What AI does, and what it doesn't

The planner picks the meals and foods. Claude also picks the amounts; with Apple Intelligence or your own foods, the math sizes them. Either way, Residual holds every plan to sensible limits and the solver sizes each portion to land your targets.

When the meals ahead can't close the day, Close the residual can ask Claude for a food to add. Claude picks the food; Residual sizes it. See [Close the residual](/help/closing-the-residual/close-the-residual/).

Re-sizing the day is never AI. It's plain arithmetic: the same day in gives the same portions out.

## Plan requests kept on your iPhone

Residual keeps the last 12 plan requests it sent and the answers it got, on your iPhone. They're there so that if a plan was poor, you can show us what happened. Nothing is sent unless you share it, and they stay out of your backups.

- **Share recent plan requests** opens the share sheet, so you can send them to support.
- **Delete recent plan requests** asks "Delete the plan requests kept on this iPhone?". Tap **Delete** to remove them.

Before your first plan, the section reads "No plans yet."

Writing a plan is in [Plan a day with AI](/help/planning/plan-a-day/). To build a day without any planner, see [Add meals, foods and notes yourself](/help/planning/build-a-day/).
