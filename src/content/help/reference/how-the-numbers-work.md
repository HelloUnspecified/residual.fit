---
title: How calories, portions and re-sizing are worked out
description: The arithmetic behind Residual's numbers, why they can differ from a label or another app, how amounts and units work, and the rules the solver follows when it re-sizes a day.
lead: Every number in Residual comes from the grams of protein, carbs and fat in what you plan and eat. This page is the arithmetic, the units, and the rules the solver keeps to.
order: 1
updated: 13 November 2026
since: "1.0"
---

## Calories come from the macros

Most of this page is also in the app, at `More → Help → How are the numbers worked out?`.

Residual counts calories the same way for every food:

**calories = 4P + 4C + 9F**

That's 4 per gram of protein, 4 per gram of carbs and 9 per gram of fat. Your targets use the same formula, so a day's calories always agree with its macros. Under the rows on `More → Daily targets`, a line adds up what your macro targets come to in calories, so you can see whether they agree.

A drink with alcohol adds 7 calories per gram of alcohol, the part its protein, carbs and fat don't account for. Alcohol is counted but is never a target, and the solver holds a drink at the amount you planned.

## Why Residual reads higher than other apps

Residual counts every gram of carbohydrate at 4 calories, fiber included. USDA, Cronometer and MyFitnessPal use more exact factors and count fiber for less. So fibrous foods read higher here: spinach by about a quarter, broccoli by a fifth, a high-fiber cereal by a tenth. Meat and eggs read a few percent lower.

| Raw spinach, 100 g | Calories |
| --- | --- |
| What USDA says | 23 kcal |
| 4 × 2.9 + 4 × 3.6 + 9 × 0.4 | 30 kcal |

A day with 35 g of fiber lands roughly 70 to 140 calories above what another tracker shows for the same foods and grams. That's deliberate, and it's one of the FDA's own label methods. It keeps calories a plain function of your macros, so the day can be balanced on all four at once. It also errs the safe way for losing weight: a day that lands on target here is a little under by USDA's count.

Nothing is hidden. A matched food shows its source's number beside Residual's, such as "USDA 23 · macros 30", and the export carries both.

## Why a label's calories can differ

Labels round each line on its own. Calories over 50 round to the nearest 10; protein, carbs and fat round to the nearest gram. A bun with 4.6 g protein, 26.6 g carbs and 2.6 g fat holds about 148 kcal. It prints as 150, while its rounded grams add up to 155.

Makers may also use more exact factors, leave out insoluble fiber, or count sugar alcohols at less than 4. A keto bread or a protein bar can print far fewer calories than its carbs suggest. Residual keeps the grams and works out the calories itself, so every total adds up. A food read from its label keeps the printed calories as a reference, and the label sheet says when the two disagree by more than rounding explains.

## Fiber

Fiber comes from USDA and from a label's Dietary Fiber line, and it's added up for each meal and the day. Today shows it under the bars. A food whose source gave no fiber is counted as unknown, never as zero, which is what "2 unknown" means beside the day's fiber.

Fiber is shown, not balanced. It isn't a target, so it has no ring and no range.

## Amounts are weights

Every amount is kept as a weight, the way USDA does it. A cup of 2% milk is 244 g, because milk is a little heavier than water. Residual shows each food in the unit you choose, and the numbers never change when the unit does.

So you don't need a food scale. A scale is the most accurate, but measuring cups and spoons work too, and every target has a range, so close is good enough.

## Units

`More → Units` sets the units new foods start in:

| Kind | Choices |
| --- | --- |
| Food | Grams (g), Ounces (oz) |
| Drinks | Milliliters (mL), Fluid ounces (fl oz), Cups, Tablespoons (tbsp), Teaspoons (tsp) |

To measure one food differently, tap the unit beside its amount in a meal. Cups, spoons and milliliters are offered for a drink, or a food whose density is known; a cup of flour would be a guess, so it isn't. A drink whose label gives only milliliters is weighed at its kind's density, or as water when that isn't known.

**Servings** is offered for a food whose serving weight is known, such as a bar. It isn't one of the choices in Units. A food you size by the serving is planned and re-sized in whole servings. See [Keep a pantry, and size foods by the serving](/help/your-food/pantry/).

## Where a food's numbers come from

| Source | What it means |
| --- | --- |
| Matched · USDA | From USDA FoodData Central, the US government's food database. |
| Manually verified | Read from the package's own label by your iPhone, and checked by you. |
| Matched USDA · User override | A USDA food you corrected from your package. Your numbers win; the USDA match is kept. |
| AI estimate | A planner's guess. Match it to a real food so the day is sized on real numbers. |

Nothing is matched behind your back: you pick each match, and it's kept for next time. See [Match AI estimates to real foods](/help/your-food/match-foods/).

## How the day is balanced

When you close the residual, the solver re-sizes the meals you haven't eaten. It keeps to these rules:

- Targets land in the order they're listed on `More → Daily targets`, usually calories, then protein, carbs and fat. A later target is never allowed to push an earlier one out of its range.
- A target set to **Floats** is aimed for after the others, and missing it never marks the day off.
- Landing anywhere inside a range counts as on target.
- Each portion changes as little as it can: never below about half or above about double what was planned.
- New amounts snap to **Round portions to** on Daily targets, 5 g unless you change it. A food sized by the serving moves a whole serving at a time.
- Re-sizing is plain arithmetic, never AI. The same day gives the same portions, and re-sizing a day that hasn't changed changes nothing.
- A day already in range is left alone. If every target sits inside its range, nothing is re-sized.

When the meals ahead can't land the day inside those limits, Today says so instead of breaking them. See [When the day can't land](/help/closing-the-residual/when-the-day-cant-land/).

## Planned and eaten stay separate

The plan is what you mean to eat; the log is what you ate. Logging fills in the eaten side and never changes the plan, and nothing is logged for you.

## What AI does, and doesn't

AI drafts a day's meals. Claude, when you allow it, picks the foods and amounts; otherwise Apple's model picks the foods and the math sizes them. Meal names and reading a package label run on your iPhone with Apple's on-device model. Re-balancing is always the solver. See [Choose who plans](/help/planning/who-plans/).
