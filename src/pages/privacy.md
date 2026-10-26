---
layout: ../layouts/Doc.astro
title: Privacy
metaTitle: Privacy policy
description: What Residual stores, what leaves your phone, who receives it and why, and how to delete it.
lead: Residual keeps your food and your targets on your iPhone and in your own iCloud. There is no account, no sign-in and no tracking. This page lists everything that leaves your phone, who receives it, and how to delete it.
updated: 26 October 2026
---

## Who we are

Residual is made and published by Clark Sell, the developer ("we" on this page). Questions about this policy go to [support@residual.fit](mailto:support@residual.fit).

## What we never do

- No account and no sign-in.
- No analytics SDK, no advertising identifier, and no tracking across apps or websites.
- We never sell your data or share it for advertising.

Some data does leave your phone so the app can work: requests to Claude, food search, the list of guide videos, and the newsletter if you sign up. Each is described below, with who receives it.

## What the app stores, and where

Your targets, days, meals, foods, pantry, favorites, saved foods and food library are stored on your iPhone (with Apple's SwiftData). When iCloud is on, they sync to your private iCloud database (Apple's CloudKit) so your other devices see them. Only you and your devices can read that database; we cannot.

## What never leaves your iPhone

- **Body measurements.** The age, sex, height, weight and body fat you enter in the target calculator.
- **Nutrition-label photos.** The camera scans barcodes and photographs nutrition labels. A label photo is read on the phone, with Apple Intelligence where the iPhone has it, and is never uploaded.
- **Meal names written for you.** Apple Intelligence names meals on the phone.
- **Plans written by Apple Intelligence.** When you don't use Claude, or Claude can't be reached, Apple Intelligence plans the day on the phone, and nothing is sent. On an iPhone without Apple Intelligence, plans are built on the phone from your own foods and Residual's food library.

## Planning with Claude

Residual can ask Claude, an AI model made by Anthropic, to draft a day of meals, and to suggest a food to add when your day can't land in range with the foods you have. **The app asks for your permission first**: a one-time question before your first Claude request. If you don't allow it, nothing is sent to Anthropic, and Apple Intelligence plans on your iPhone instead (or, without it, plans are built from your own foods). The same happens whenever Claude can't be reached. You can turn Claude off any time in More → AI planning, which also says what Apple Intelligence does.

When you plan a day with Claude, the app sends:

- **Your targets.** Your daily targets, their ranges, and which matter most to you.
- **The day.** The day being planned. For "the rest of today", also the time of day and what you've already eaten or planned that day (meal and food names, and amounts).
- **Your foods to avoid.** The foods you've told Residual to avoid, including which of them are allergies, so the plan leaves them out.
- **Your pantry.** Up to 50 pantry foods: name, brand, nutrition per 100 g and usual serving.
- **Your recipes.** Up to 20 dishes you make: their names, nutrition per 100 g and one serving.
- **Your saved meals.** Up to 10: their names, notes, foods and amounts.
- **Recent meals.** The names of your meals and foods from the last 7 days.
- **Your instructions.** Anything you type for the plan, and, when you refine a plan, the current plan.

When you ask Claude to suggest a food to add, the app sends:

- **Where your day lands.** Each target with its range, where the day lands now, and how far short or over it is.
- **The meals ahead.** The meals you haven't eaten yet, with their foods and amounts.
- **Your foods.** Your pantry foods and your foods to avoid, as above.
- **Foods you skipped.** Any suggestions you've already turned down, so they aren't offered again.

**What you type is limited.** Your instructions for a plan are limited in length and are treated only as food preferences. Before anything is sent, the app strips line breaks and markup from them and from food and meal names.

**How it's sent.** Through Apple's Foundation Models framework with App Attest. App Attest proves the request comes from a genuine copy of Residual and gives Anthropic a key for your installation of the app. The request also carries the app version and iOS version, and Anthropic sees your IP address, as any server does. No name, email or account identifier goes with it.

**What it's used for.** Only to write your plan or suggest a food.

**What Anthropic does with it.** Anthropic processes these requests under its commercial terms, which say it does not train its models on this data. How long Anthropic keeps a request is set by [Anthropic's privacy policy](https://www.anthropic.com/legal/privacy).

## Food search and barcode scans

When you search for a food or scan a barcode, the search text or barcode number is sent to [USDA FoodData Central](https://fdc.nal.usda.gov), a public database run by the US government. The app also asks USDA in a few other cases, sending only a food's name or USDA food number:

- **Matching a plan's foods.** When you match a plan's foods to real ones (Match all), the names of those foods are searched.
- **Filling in details.** For a food you picked from USDA, the app may look up its USDA food number to get its barcode (for pantry foods) or its weight per cup (for drinks).
- **Checking a shared food or meal.** When someone shares foods with you, the app checks each USDA match against USDA before you add it.

Nothing else is sent with these requests.

## Guide videos

Each time the app opens, it downloads the list of guide videos from this website. The request carries nothing about you or your food. Like any website request, Cloudflare sees your IP address (see [This website](#this-website)).

## The newsletter, only if you sign up

You can sign up for the Residual newsletter in the app (More → Newsletter & updates) or at the bottom of this website. Your email address is sent to this website (hosted on Cloudflare) and on to Loops (loops.so), our mailing-list provider, along with where you signed up. Loops then emails you a link to confirm, and you're subscribed only once you click it, so nobody can sign up an address that isn't theirs. We use your address only to send the Residual newsletter and product updates. It is never linked to anything you log. Every email has an unsubscribe link, and you can ask us to delete your address at any time.

To stop abuse, the sign-up counts attempts from each IP address for a minute and turns away more than a few. That count isn't stored with your email address and isn't kept.

## Writing to support

When you write to us from the app, the email starts with your app version, iOS version and iPhone model filled in, so we can help. You can edit them before you send. We use your message and email address only to answer you.

## Sharing a food or a meal

When you share a food or meal with someone, the shared copy travels inside the file or link: food names, amounts, nutrition, and your daily calorie target so the person receiving it can scale it. In a link it sits after the `#`, which browsers never send to a server. Nothing is stored on this site.

## Subscriptions

Residual Plus, the subscription that includes everything in the app, is bought, managed and cancelled through Apple. Apple handles the payment. We only see whether your subscription is active; we never see your payment details. When a subscription or free trial ends, the app locks until you subscribe again, but the lock screen still lets you export your data (More → Export to a spreadsheet) and restore purchases.

## This website

This website is hosted on Cloudflare, which sees visitors' IP addresses like any web host and may keep ordinary server logs. Every page, including its typeface, is served from this domain; nothing is loaded from other sites, and there are no analytics or tracking scripts.

## Who receives data, and how it's protected

- **Apple**: iCloud sync (your private iCloud database), the Foundation Models framework and App Attest that carry plan requests, and subscriptions through the App Store.
- **Anthropic**: plan requests and food suggestions, only when you've allowed Claude (More → AI planning).
- **USDA FoodData Central**: food search text, barcode numbers, the names of foods being matched, and USDA food numbers.
- **Loops**: your email address and where you signed up, only if you sign up for the newsletter.
- **Cloudflare**: hosts this website, the newsletter sign-up and the list of guide videos.

We only use providers whose terms protect your data at least as well as this policy does. Each receives only what it needs for the purpose described above.

## How long we keep it, and how to delete it

- **App data** stays on your iPhone and in your iCloud until you delete it. Delete individual items in the app. Delete the app to remove its data from the phone. To remove the iCloud copy, open Settings → your name → iCloud → Manage Storage (or Apps Using iCloud) → Residual.
- **Your newsletter address** is kept until you unsubscribe or ask us to delete it.
- **Support emails** are kept as long as we need them to answer you, and deleted when you ask.
- **Plan requests and food suggestions** are kept by Anthropic as its privacy policy describes. We don't keep a copy.

## Withdrawing consent and asking us to delete

- **Stop sending requests to Anthropic**: turn off Claude in More → AI planning. Nothing more is sent. For data already sent, see [Anthropic's privacy policy](https://www.anthropic.com/legal/privacy).
- **Stop the newsletter**: use the unsubscribe link in any email.
- **Delete anything we hold**: email [support@residual.fit](mailto:support@residual.fit) and we'll delete it.

## Children

Residual is not directed to children under 13, and we don't knowingly collect data from them.

## A note on health

Residual's numbers are estimates for planning. They are not medical advice; the [health disclaimer](/health-disclaimer/) says what that means.

## Changes to this policy

When this policy changes, we update this page and the date below. Material changes are also noted in the app's release notes.

## Contact

Write to [support@residual.fit](mailto:support@residual.fit).
