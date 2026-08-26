---
title: "Is Your Website Fast Enough? A Plain-English Guide to Testing Speed and Understanding the Numbers"
category: "Website Performance"
categorySlug: "website-performance"
---
You've heard that website speed matters — that slow sites lose customers and rank worse on Google. But when you actually try to test your site, you get hit with a wall of jargon: LCP, CLS, TTFB, lab data, field data. This guide cuts through it. You'll learn which free tools to use, which three or four numbers actually matter for a local business site, and what to do about what you find — no developer vocabulary required.

## Why Speed Deserves an Hour of Your Time

Two reasons, both tied to revenue:

**Customers leave slow sites.** A large share of mobile visitors abandon a page that takes more than about three seconds to load. For a local business, your typical visitor is on a phone, often in a hurry or mid-emergency — a leaking pipe, a dead furnace. They will not wait. They hit back and call the next company on the list.

**Google uses speed as a ranking factor.** It's not the biggest factor, but when two local businesses are otherwise comparable, the faster, better-behaved site has an edge. Since most of your competitors have never checked their speed, even modest improvements can set you apart locally.

## The Free Tools to Use (and Which to Start With)

All of these are free. Start with the first; add the others if you want more detail.

### 1. PageSpeed Insights (pagespeed.web.dev)
Google's own tool, and the one to start with. Paste in your web address, hit Analyze, and it tests both mobile and desktop versions of your page. It gives you a score from 0 to 100 plus the underlying metrics. Test your homepage and your most important service page — different pages can perform very differently.

### 2. GTmetrix (gtmetrix.com)
Gives a similar report with a helpful visual: a timeline showing exactly what loaded and when. Useful for spotting the one giant image or third-party script that's dragging everything down.

### 3. WebPageTest (webpagetest.org)
The most detailed option. It lets you simulate a real phone on a real mobile connection and even shows a filmstrip of your page loading. More than most owners need, but great for a second opinion.

**One important habit:** always pay attention to the **mobile** results, not desktop. Desktop scores almost always look fine; mobile is where your customers are and where problems hide.

## The Numbers That Actually Matter

Reports throw a dozen metrics at you. For a local business site, focus on these:

### The overall score (0–100)
A rough summary grade. Don't obsess over it, but use it as a guide:

- **90–100:** Great. Maintain it.
- **50–89:** Decent but leaving customers and rankings on the table.
- **Below 50:** Actively hurting you. Prioritize fixes.

### Largest Contentful Paint (LCP)
Plain English: *how long until the main content of the page appears.* This is the single most important speed number. Under 2.5 seconds is good; over 4 seconds is poor. If your LCP is bad, visitors are staring at a blank or half-built page.

### Interaction to Next Paint (INP)
Plain English: *how fast the page reacts when someone taps something.* If a customer taps your phone number or menu and nothing happens for a moment, that's poor INP. Under 200 milliseconds is good.

### Cumulative Layout Shift (CLS)
Plain English: *does the page jump around while loading?* You know the frustration of going to tap a button and having it leap away because an ad or image loaded above it. That's CLS. Under 0.1 is good. Layout jumps cause mis-taps and instant exits.

### Time to First Byte (TTFB)
Plain English: *how fast your web hosting responds.* Before anything can display, your server has to answer. Under about 0.8 seconds is good. A slow TTFB usually means cheap, overloaded hosting — and no amount of page tuning fully fixes a slow server.

### Total page size and requests
Often buried in the report details: how many megabytes your page is and how many separate files it loads. A lean local business page is typically under 2 MB. If your homepage is 8 MB, the cause is almost always huge, unoptimized photos.

## Lab Data vs. Real-User Data (One Distinction Worth Knowing)

PageSpeed Insights may show you two kinds of results:

- **Field data ("real user" data):** measurements from actual visitors' phones over the past 28 days. This is what Google uses for ranking. If your site is small, this section may say there's not enough data — that's normal.
- **Lab data:** a one-time simulated test. It can fluctuate run to run, so don't panic over a few points of difference between tests. Run the test two or three times and look at the typical result.

If field data exists and says "passed," you're in good shape regardless of what the lab score says on a given day.

## The Most Common Speed Problems on Local Business Sites

When a local service site is slow, the culprit is almost always one of these — and most are fixable without a rebuild:

1. **Oversized photos.** A photo straight from a phone can be 5+ MB. Five of those on a homepage is a guaranteed slow load. The fix: resize and compress images before uploading (free tools like Squoosh or your website platform's built-in optimization handle this). This single fix solves the majority of slow local sites.
2. **Cheap shared hosting.** A $3/month hosting plan often means a slow TTFB. Moving to a reputable mid-tier host is one of the best speed-per-dollar upgrades available.
3. **Too many plugins or apps.** Especially on WordPress or DIY builders — every slider, popup, chat widget, and tracking script adds weight. Deactivate anything you don't actively use.
4. **Third-party scripts.** Review widgets, social feeds, map embeds, and ad trackers all load from other companies' servers. Keep the ones that earn their keep; cut the rest.
5. **No caching or CDN.** Caching stores a ready-to-serve copy of your pages; a CDN serves them from locations near your visitors. Most modern platforms and hosts offer both, often with a simple toggle or plugin.

## A Simple Testing Routine

Speed isn't a one-time project — sites slow down over time as content and plugins accumulate. A lightweight routine:

- **Quarterly:** Run PageSpeed Insights on your homepage and top service page. Screenshot or note the scores so you can spot drift.
- **After any big change:** Redesign, new photo gallery, new widget — retest before calling it done.
- **The eyeball test:** Once a month, load your site on your own phone over cellular data (not Wi-Fi). If it feels slow to you, it feels worse to a stressed customer.

## What to Hand to a Developer (If You Need One)

If your scores are poor and the fixes are beyond you, a good developer or agency can usually make a big difference in a few hours of work. Send them: your PageSpeed Insights results, your platform (WordPress, Wix, etc.), and your hosting company. Ask specifically for image optimization, caching setup, and a plugin/script audit — those three cover most of what's fixable.

## Quick Checklist

- [ ] I've run PageSpeed Insights on my homepage and my top service page
- [ ] I looked at the mobile results, not just desktop
- [ ] I know my LCP (main content load time) and whether it's under 2.5 seconds
- [ ] I checked for layout jumps (CLS) and tap responsiveness (INP)
- [ ] I know my TTFB — and whether my hosting is the bottleneck
- [ ] I've compressed oversized photos (the #1 fix for most local sites)
- [ ] I've removed unused plugins, widgets, and third-party scripts
- [ ] I've set a quarterly retest reminder and do a monthly phone-over-cellular eyeball test
