---
title: Close the residual (and Recalibrate)
description: How Close the residual re-sizes the meals ahead when the day drifts, what you can change in the review before you apply it, and when to use Recalibrate.
lead: When what you ate doesn’t match the plan, Close the residual re-sizes the meals you haven’t eaten so the day lands back inside your ranges. It keeps the same foods, changes their amounts, and shows you every change before anything is saved.
order: 1
updated: 13 November 2026
since: "1.0"
---

## What it does

The gap between where the day was planned to land and where it will land now is the residual. Close the residual closes it with the meals still ahead. Meals you've logged stay as logged: what you ate is what you ate. Only the meals you haven't eaten change, and only their amounts.

The math is deterministic. The same day gives the same answer every time, and there is no AI in this step. Claude or Apple Intelligence may have written your plan, but the re-size is the solver alone.

![Residual's Today screen. Lunch is marked Off plan, 237 kcal over. The sentence under the ring reads Calories over 193. Two meals ahead can absorb it. The button at the bottom reads Close the residual, Re-size the 2 meals ahead.](shot:03a-drift "Lunch ran 237 kcal over. The sentence under the ring says by how much, and the button at the bottom becomes Close the residual.")

## Close the residual, step by step

1. Log what you actually ate. Change only the foods that differed; the plan stays beside it.
2. On Today, read the sentence under the ring. When the day won't land, it names what's off and by how much, and the button at the bottom becomes **Close the residual**, with how many meals it will re-size. It's amber, or red when the meals ahead can't fully recover.
3. Tap **Close the residual**. The review opens. At the top is where the day lands with these changes; below it, each meal ahead with every food it would re-size, from the planned amount to the new one.
4. Tap a food to keep it or set its amount. A slider shows the planned and suggested amounts. A button under it, such as **Keep 180 g** or **Use 165 g**, puts back the planned amount or takes the suggested one. The rest re-sizes around your choice.
5. Tap **Apply**. Nothing changes until you do. **Cancel** leaves the day as it was.

> [!NOTE] A day in range is left alone
>
> If every target already sits inside its range, Residual doesn't re-size anything behind you. When you keep or set an amount in the review and the day lands with it, what you applied is the plan from then on.

## The order targets land in

The meals ahead can't always land every target at once. Residual works through your targets in the order you set on `More → Daily targets`, top to bottom, and won't give up an earlier one to land a later one. The usual order is calories, protein, carbs, then fat.

A target set to **Floats** comes after the others. Residual gets it as close as it can, and missing it never marks your day off. How to set the order and which targets float is in [Set your daily targets](/help/targets/daily-targets/).

## The limits on every portion

A portion stays between about half and double what was planned. Going further would leave you a token portion or a meal you wouldn't eat, so the solver stops at the limit and says where the day will land instead.

New amounts snap to the grid set under **Round portions to** on Daily targets, 5 g unless you change it. A food sized by the serving moves a whole serving at a time.

## Add a food in the review

New in Residual 1.1.0. Under each meal in the review, **Add a food** tries a food in that meal to see where the day lands with it. **Choose a food** lets you pick one. **Suggest from my pantry** lists the pantry foods that land the day closest, closest first. An added food is sized with the rest, and you can skip it before you apply.

When the amounts alone can't close the day, the review may suggest a food from your own for a meal ahead. If that still isn't enough and you allow Claude, **Ask Claude for something to add** asks Claude for one. Claude picks the food; Residual sizes it.

## When the day can't land

> [!OFF] “Dinner alone can’t fully recover”
>
> The meals ahead can't absorb what's been eaten without going past half or double their plan. Close the residual still gets as close as it can, and the sentence under the ring says where the day will end up.
>
> To do better, tap the `+` at the bottom of Today, then **Suggest a fix**. It finds the best few changes from the foods you already have.

## Recalibrate

Recalibrate is for a day that already lands in range but could land closer. It's in the `+` menu at the bottom of Today when there are meals still ahead and a closer landing is possible.

It opens the same review, titled Recalibrate. Each food stays near the amount it has now, so the changes are small. Apply them and the new amounts become your plan.
