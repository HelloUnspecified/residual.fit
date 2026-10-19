---
layout: ../layouts/Doc.astro
title: Privacy
description: What Residual stores, what leaves your phone, who receives it and why, and how to delete it.
lead: Residual keeps your food and your targets on your iPhone and in your own iCloud. There is no account, no sign-in and no tracking. This page lists everything that leaves your phone, who receives it, and how to delete it.
updated: 18 October 2026
---

## Who we are

Residual is made and published by Clark Sell, the developer ("we" on this page). Questions about this policy go to [support@residual.fit](mailto:support@residual.fit).

## What we never do

- No account and no sign-in.
- No analytics SDK, no advertising identifier, and no tracking across apps or websites.
- We never sell your data or share it for advertising.

Some data does leave your phone so the app can work: the plan request, food search, and the newsletter if you sign up. Each is described below, with who receives it.

## What the app stores, and where

Your targets, days, meals, foods, pantry, favorites, saved foods and food library are stored on your iPhone (with Apple's SwiftData). When iCloud is on, they sync to your private iCloud database (Apple's CloudKit) so your other devices see them. Only you and your devices can read that database; we cannot.

## What never leaves your iPhone

- **Body measurements.** The age, sex, height, weight and body fat you enter in the target calculator.
- **Nutrition-label photos.** The camera scans barcodes and photographs nutrition labels. A label photo is read on the phone by Apple's on-device model and is never uploaded.
- **Meal names written for you.** Apple's on-device model names meals on the phone.

## Planning a day with Claude

Residual can ask Claude, an AI model made by Anthropic, to draft a day of meals. **The app asks for your permission first**: a one-time question before your first Claude plan. If you don't allow it, nothing is sent to Anthropic, and plans are made on the device or from built-in foods instead. You can turn it off any time in More → Planning with Claude.

When you plan with Claude, the app sends:

- **Your targets.** Your daily targets and their ranges.
- **The day.** The day being planned. For "the rest of today", also the time of day and what you've already eaten or planned that day (meal and food names, and amounts).
- **Your pantry.** Up to 50 pantry foods: name, brand, nutrition per 100 g and usual serving.
- **Your saved meals.** Up to 10: their names, notes, foods and amounts.
- **Recent meals.** The names of your meals and foods from the last 7 days.
- **Your instructions.** Anything you type for the plan, and, when you refine a plan, the current plan.

**What you type is limited.** Your instructions for a plan are limited in length and are treated only as food preferences. Before anything is sent, the app strips line breaks and markup from them and from food and meal names.

**How it's sent.** Through Apple's Foundation Models framework with App Attest. App Attest proves the request comes from a genuine copy of Residual and gives Anthropic a key for your installation of the app. The request also carries the app version and iOS version, and Anthropic sees your IP address, as any server does. No name, email or account identifier goes with it.

**What it's used for.** Only to write your plan.

**What Anthropic does with it.** Anthropic processes these requests under its commercial terms, which say it does not train its models on this data. How long Anthropic keeps a request is set by [Anthropic's privacy policy](https://www.anthropic.com/legal/privacy).

## Food search and barcode scans

When you search for a food or scan a barcode, the search text or barcode number is sent to [USDA FoodData Central](https://fdc.nal.usda.gov), a public database run by the US government. Nothing else is sent with it.

## The newsletter, only if you sign up

If you sign up in More → Newsletter & product updates, your email address and the app's version are sent to this website (hosted on Cloudflare) and on to Loops (loops.so), our mailing-list provider. We use them only to send Residual news and product updates. Your email address is never linked to anything you log. Every email has an unsubscribe link, and you can ask us to delete your address at any time.

## Writing to support

When you write to us from the app, the email starts with your app version, iOS version and iPhone model filled in, so we can help. You can edit them before you send. We use your message and email address only to answer you.

## Sharing a food or a meal

When you share a food or meal with someone, the shared copy travels inside the file or link: food names, amounts, nutrition, and your daily calorie target so the person receiving it can scale it. In a link it sits after the `#`, which browsers never send to a server. Nothing is stored on this site.

## Subscriptions

Residual Plus, the subscription that includes everything in the app, is bought, managed and cancelled through Apple. Apple handles the payment. We only see whether your subscription is active; we never see your payment details. When a subscription or free trial ends, the app locks until you subscribe again, but the lock screen still lets you export your data (More → Export to a spreadsheet) and restore purchases.

## This website

This website is hosted on Cloudflare, which sees visitors' IP addresses like any web host and may keep ordinary server logs. Its pages load their typeface from Fontshare, a font service that sees your IP address and browser. The share page and the app load nothing from Fontshare.

## Who receives data, and how it's protected

- **Apple**: iCloud sync (your private iCloud database), the Foundation Models framework and App Attest that carry plan requests, and subscriptions through the App Store.
- **Anthropic**: plan requests, only when you've allowed Planning with Claude.
- **USDA FoodData Central**: food search text and barcode numbers.
- **Loops**: your email address and app version, only if you sign up for the newsletter.
- **Cloudflare**: hosts this website and the newsletter sign-up.
- **Fontshare**: serves this website's typeface.

We only use providers whose terms protect your data at least as well as this policy does. Each receives only what it needs for the purpose described above.

## How long we keep it, and how to delete it

- **App data** stays on your iPhone and in your iCloud until you delete it. Delete individual items in the app. Delete the app to remove its data from the phone. To remove the iCloud copy, open Settings → your name → iCloud → Manage Storage (or Apps Using iCloud) → Residual.
- **Your newsletter address** is kept until you unsubscribe or ask us to delete it.
- **Support emails** are kept as long as we need them to answer you, and deleted when you ask.
- **Plan requests** are kept by Anthropic as its privacy policy describes. We don't keep a copy.

## Withdrawing consent and asking us to delete

- **Stop sending plans to Anthropic**: turn off More → Planning with Claude. Nothing more is sent. For data already sent, see [Anthropic's privacy policy](https://www.anthropic.com/legal/privacy).
- **Stop the newsletter**: use the unsubscribe link in any email.
- **Delete anything we hold**: email [support@residual.fit](mailto:support@residual.fit) and we'll delete it.

## Children

Residual is not directed to children under 13, and we don't knowingly collect data from them.

## A note on health

Residual's numbers are estimates for planning. They are not medical advice.

## Changes to this policy

When this policy changes, we update this page and the date below. Material changes are also noted in the app's release notes.

## Contact

Write to [support@residual.fit](mailto:support@residual.fit).
