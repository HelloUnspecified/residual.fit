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

![Residual's Today screen. The number in the ring, 1,264 of 2,100 kcal, is amber. The sentence under the ring reads Calories over 175. Two meals ahead can absorb it. Lunch is logged at 799 kcal with a chip reading Off plan, plus 237 kcal. The button at the bottom reads Close the residual, Re-size the 2 meals ahead.](shot:03a-drift "Lunch ran 237 kcal over. The sentence under the ring says what that does to the day, and the button at the bottom becomes Close the residual.")

## Close the residual, step by step

1. Log what you actually ate. Change only the foods that differed; the plan stays beside it.
2. On Today, read the sentence under the ring. When the day won't land, it names what's off and by how much, and the button at the bottom becomes **Close the residual**, with how many meals it will re-size. It's amber, or red when the meals ahead can't fully recover.
3. Tap **Close the residual**. The review opens. At the top is where the day lands with these changes; below it, each meal ahead with every food it would re-size, from the planned amount to the new one.
4. Tap a food to keep it or set its amount. A slider shows the planned and suggested amounts. A button under it, such as **Keep 180 g** or **Use 165 g**, puts back the planned amount or takes the suggested one. The rest re-sizes around your choice.
5. Tap **Apply**. Nothing changes until you do. **Cancel** leaves the day as it was.

> [!NOTE] A day in range is left alone
>
> If every target already sits inside its range, Residual doesn't re-size anything behind you. When you keep or set an amount in the review and the day lands with it, what you applied is the plan from then on.

## How far it goes

Targets land in the order on `More → Daily targets`, and a target set to **Floats** comes last. Each portion stays between about half and double its plan, and new amounts snap to your portion rounding; a food sized by the serving moves a whole serving at a time. [How calories, portions and re-sizing are worked out](/help/reference/how-the-numbers-work/) has every rule the solver keeps to.

When the meals ahead can't land the day inside those limits, Today says so: “Dinner alone can't fully recover.” Close the residual still gets as close as it can. [When the day can't land](/help/closing-the-residual/when-the-day-cant-land/) covers the ways out.

## Add a food in the review

Under each meal in the review, **Add a food** tries a food in that meal to see where the day lands with it.

- **Choose a food** opens food search.
- **Suggest from my pantry** lists up to three in-stock pantry foods that land the day closest, closest first, leaving out anything on your [Foods to avoid](/help/your-food/foods-to-avoid/). If none helps, it says “Nothing in your pantry lands the day closer than it lands now.”

An added food is sized with the rest. Tap it to change its amount or skip it before you apply.

## Recalibrate

Recalibrate is for a day that already lands in range but could land closer. It's in the `+` menu at the bottom of Today when there are meals still ahead and a closer landing is possible.

It opens the same review, titled Recalibrate. Each food stays near the amount it has now, so the changes are small. Apply them and the new amounts become your plan.
