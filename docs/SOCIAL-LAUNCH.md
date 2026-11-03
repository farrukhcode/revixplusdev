# Social Launch Plan

Two tracks. Track A launches RevixPlus's own channels in 30 days. Track B turns The Toys (a brand Farrukh owns) into a public growth lab that proves the agency's social and ecommerce playbook with real, monthly numbers.

## Track A: RevixPlus channels, first 30 days

### Channels and cadence

| Channel | Role | Cadence | Formats |
|---|---|---|---|
| LinkedIn (company page + Farrukh's profile) | Primary B2B channel, DK/UK/US buyers | 4 posts per week on the profile, 2 on the page | Text posts with one image or carousel, short screen recordings, case study carousels |
| Instagram | Portfolio and culture, PK and brand buyers | 3 posts per week + 3 stories per week | Reels (15 to 30s), carousels, glass-style UI snippets |
| X | Build-in-public, AI engineering audience | 1 post per day | Short threads, screenshots, replies in AI and Next.js conversations |

Profile basics before day 1: same wordmark and glass-style banner on all three, bio with the entity sentence ("Software, AI and growth agency. Web and mobile, AI integration, HIPAA-compliant AI agents, game development, growth marketing. Lahore, serving US, UK, DK, UAE, PK."), link to revixplus.com, booking link in the LinkedIn featured section.

### Post types

1. Proof: a project, a number, a before and after.
2. Teach: how something works, with a diagram or short code.
3. Opinion: a clear position on AI, agencies or web performance.
4. Behind the build: screenshots and clips from the agency site itself (the glass system, the auto-tour, the 3D hero).
5. Offer: one direct call to action per week, never more.

### 20 post ideas

| # | Post | Channel | Type |
|---|---|---|---|
| 1 | "We built our own site to scroll itself." 20s clip of the auto-tour pausing the instant the cursor moves. Link to the animation spec. | LinkedIn, X, IG Reel | Behind the build |
| 2 | How DiFacto reads supplier invoices in dozens of layouts: ingestion, extraction, validation against quotes, accuracy test sets. One diagram. | LinkedIn, X | Teach |
| 3 | "HIPAA compliant AI" is a sentence most vendors cannot back. The 7 checks (BAA, de-identification, zero retention, encryption, RBAC, audit logs, human in the loop). | LinkedIn | Opinion + Teach |
| 4 | Denial triage with an agent: CARC code in, root cause and draft appeal out, biller approves. 30s screen recording with fake data. | LinkedIn, X | Proof |
| 5 | One Node.js payment gateway serving Shopify, WooCommerce, Magento, Wix and BigCommerce: what idempotency and webhook signatures saved us from (Bankful). | LinkedIn, X | Teach |
| 6 | Hosting 7 production apps on one DigitalOcean droplet with Coolify, Traefik and Cloudflare Access. Monthly cost on screen. | X, LinkedIn | Proof |
| 7 | Core Web Vitals rebuild for a fintech marketing site: what changed, what moved (Bankful). | LinkedIn | Proof |
| 8 | Liquid Glass on the web: the CSS, the fallback ladder, and why Firefox lies about `@supports`. Code carousel. | X, IG carousel | Teach |
| 9 | Why we show "starting at" prices. Short opinion. | LinkedIn | Opinion |
| 10 | The RAG pipeline that answers from client data with sources: chunking, embeddings, vector search, grounded answers. Diagram. | LinkedIn, X | Teach |
| 11 | The Toys growth lab, month 0 scorecard: followers, reach, orders, ad spend. "We will post this every month." | LinkedIn, IG | Proof |
| 12 | Meeshan Luxe Home: a furniture store that ships nationwide, mobile first. 3 screens. | IG carousel, LinkedIn | Proof |
| 13 | HR and onboarding automation for a billing company with n8n: offer letter, documents, access, training checklist, all from one form. Flow screenshot. | LinkedIn | Teach + Proof |
| 14 | The daily biller worklist generated from clearinghouse data at 6am. What is in it and why SLA alerts go to WhatsApp. | LinkedIn | Teach |
| 15 | Indibe: a multivendor cosmetics marketplace in Nuxt. What a marketplace needs that a store does not. | LinkedIn, IG | Proof |
| 16 | A kids' game studio inside an agency: why we build playables and what YouTube Playables changed. | X, LinkedIn | Opinion |
| 17 | AIEO in one post: llms.txt, entity sentences, FAQ schema, and a screenshot of a brand cited inside an AI answer. | LinkedIn, X | Teach |
| 18 | "We don't rip and replace." Three ways to add AI to an existing platform without a rewrite. | LinkedIn | Opinion |
| 19 | The Vitamin Company and The Toys: what cash-on-delivery ecommerce in Pakistan taught us about trust signals. | IG, LinkedIn | Teach |
| 20 | Launch post: "RevixPlus is live." The story in 5 lines, link, one CTA (book a 20-minute call). | All | Offer |

### 30-day calendar

| Week | Focus | Posts |
|---|---|---|
| 1 | Set up profiles, publish the launch post (20), one behind-the-build (1), one teach (3) | 20, 1, 3, 8 |
| 2 | Proof week from the portfolio | 2, 5, 6, 12, 15 |
| 3 | Healthcare week | 4, 13, 14, 18, 10 |
| 4 | Growth and lab week | 11, 17, 19, 9, 16, 7 |

One direct offer per week: a comment on the week's strongest post pointing to the booking link.

### Testimonial outreach

Send in week 1 to past clients (Meeshan, The Vitamin Company, Sushi2500, Bankful, Revix MD). Keep it short:

```
Hi <name>, I'm launching RevixPlus, the agency behind the work we did on <project>.
Would you be open to two or three sentences I can quote on the site, with your name and role?
If it's easier, reply with what the result meant for you and I'll draft it for your approval.
Thanks either way.
```

Approved quotes go into `src/content/testimonials.ts` with `status: "approved"`.

## Track B: The Toys growth lab

The Toys (thetoys.pk, @thetoyspakistan) sells kids' toys, games and clothing nationwide with cash on delivery, WhatsApp support, free delivery over Rs. 2,999 and 7-day returns. Baseline on 3 November 2026: Instagram 514 followers (Meta Verified), Facebook 276 followers, strong creative system (bold 3D type, bright palette, product hero shots, age-segmented hooks, consistent logo and phone footer on every post).

The lab publishes a public scorecard every month on revixplus.com and LinkedIn. Transparent numbers are the proof the agency's social offer needs.

### Monthly scorecard format

| Metric | Month 0 | Month 1 | Month 2 | Month 3 |
|---|---|---|---|---|
| Instagram followers | 514 | | | |
| Facebook followers | 276 | | | |
| Reach (IG + FB, 28 days) | TODO | | | |
| Reels published | TODO | | | |
| Website sessions (Umami) | TODO | | | |
| WhatsApp conversations started | TODO | | | |
| Orders | TODO | | | |
| Ad spend (PKR) | TODO | | | |
| Cost per order | TODO | | | |
| What we changed this month | | | | |
| What we will change next month | | | | |

### 90-day playbook

Content pillars (rotate, one per post):

1. Play ideas: a toy in use, 15 to 30s, child's hands or parent's voice, no faces required.
2. Gift guides by age: "4 to 6 years", "newborn essentials", carousel of 5 products with prices.
3. Trust: unboxing, packaging, delivery proof, returns story, "if it would not go to our own kids, it does not go in a parcel".
4. Learning: one educational benefit per toy (motor skills, counting, pretend play), parents share these.
5. Offers: weekly deal, sale events (11.11, 12.12, Eid), bundle of the week.

Cadence: 5 posts per week (3 Reels, 2 carousels), daily stories (poll, "which one for your child", restock alerts), one live or Q&A every two weeks.

Reels: hook in the first second (product in motion), captions burned in, 9:16, under 30s, sound on and off both work, end card with price and "DM or WhatsApp to order".

UGC: ask every delivered customer by WhatsApp for a 10s clip or photo in exchange for a small discount on the next order. Repost with permission. Target 8 UGC pieces per month by month 3.

COD market ad angles (Meta ads, PKR budget, test weekly):

- "Pay when it arrives" with the delivery proof clip.
- Age-segmented gift guides to parents 25 to 40 in Lahore, Karachi, Islamabad, Rawalpindi, Faisalabad.
- Bundle offers over the free-delivery threshold (Rs. 2,999).
- Retarget site visitors and video viewers with the weekly deal.
- Exclude existing customers from prospecting; run a separate reorder campaign.

WhatsApp funnel: every post and ad ends with "WhatsApp to order". A saved-reply library (price, availability, delivery time, returns), order confirmation template, delivery update, and a 7-day post-delivery message asking for a review or UGC. Track conversations started and orders per week in the scorecard.

Site side (thetoys.pk): WhatsApp click-to-chat on every product, age filters in the main nav, trust strip under the hero (COD, nationwide delivery, 7-day returns, free delivery over Rs. 2,999), reviews block once UGC exists, Umami events for WhatsApp clicks and checkout steps.

Month targets (to be replaced with real numbers after month 1): double reach month over month, 1,500 Instagram followers by day 90, cost per order under the average order margin.
