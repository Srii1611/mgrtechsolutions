import { HOURLY_LINE, LAUNCH, PRICES, money, perMonth } from '@/data/prices';
import { ICON } from '@/data/service-pages/icons';
import type { ServicePageData } from '@/data/service-pages/types';

/**
 * /services/ecommerce. Plain English for shop owners.
 *
 * OPEN for Srii before this is treated as final. E-commerce is DRAFTED COPY:
 *  - It is not listed on the live site, and no source material for it exists
 *    in the repo beyond PILLAR_ECOMMERCE (itself flagged as drafted).
 *  - The structure follows what US small-business store builders typically
 *    list (discovery, design, build, products, payments, shipping and tax,
 *    SEO basics, training). No wording copied.
 *  - Platform names, store features, timeline and price shape are all
 *    proposals. Every line carries a CONFIRM note or sits under this one.
 *  - Every price comes from src/data/prices.ts. Stores start at a quoted price and
 *    take about five weeks; Commerce care is required with every store.
 *  - No conversion or sales figures appear anywhere.
 */
export const ECOMMERCE_PAGE: ServicePageData = {
  slug: 'ecommerce',
  meta: {
    title: 'E-commerce',
    description:
      'Online stores for local shops in MetroWest Massachusetts: product catalog, secure checkout, shipping and tax set up, and every product built to be found on Google.',
  },

  hero: {
    breadcrumb: 'E-COMMERCE',
    headline: 'An online store',
    headlineAccent: 'that takes orders any hour.',
    lede: 'We build the whole store: your products, a safe checkout, and shipping and tax set up for how you sell. Each product can be found on its own in Google.',
    secondaryCta: 'Get a free store review',
    facts: [
      { title: 'Built for phones', text: 'Most shoppers browse and buy on a phone.' },
      { title: 'Payments go to you', text: 'Checkout is set up in your name.' },
      { title: 'Quoted to your catalog', text: 'Not a flat rate that ignores your products.' },
      { title: 'You own it', text: 'Store, accounts and content stay yours.' },
    ],
  },

  problem: {
    eyebrow: 'THE PROBLEM',
    heading: 'Most small stores lose sales in four places.',
    lede: 'Shoppers are quick to leave. Pick a problem to see the cause and the fix.',
    items: [
      {
        tag: 'Checkout',
        title: 'Checkout is slow or confusing',
        peek: 'Shoppers fill a cart, then leave.',
        body: 'Every extra step or slow page is a chance for someone to give up. A cart that is hard to use on a phone loses the sale.',
        points: [
          'Too many steps to pay',
          'Forms that are hard to fill on a phone',
          'Surprise costs at the last step',
          'Slow pages when the cart opens',
        ],
        read: { slug: 'mobile-first-website-design', label: 'Why your store has to work on a phone first' },
      },
      {
        tag: 'Found',
        title: 'Your products are not found',
        peek: 'Shoppers search for products, not for stores.',
        body: 'People search for a specific product. If each product has no page of its own, or the page has no clear details, Google has little to show.',
        points: [
          'Products only appear inside a long list',
          'Thin or copied product descriptions',
          'Missing photos or details',
          'No structured details for each product',
        ],
        read: { slug: 'schema-markup-local-businesses', label: 'Help Google find each of your products' },
      },
      {
        tag: 'Costs',
        title: 'Shipping and tax go wrong',
        peek: 'Wrong totals cost you money or trust.',
        body: 'Shipping and tax rules differ by item and place. If they are set wrong, you lose money or surprise your customers.',
        points: [
          'Flat shipping on heavy or fragile items',
          'Tax rules not set up',
          'No local pickup or delivery option',
          'No clear returns information',
        ],
        read: { slug: 'what-should-local-business-website-include', label: 'What a local business website needs' },
      },
      {
        tag: 'Stock',
        title: 'You cannot keep up with stock and orders',
        peek: 'You sell what you do not have.',
        body: 'When stock is not tracked, you can sell an item that is gone. Orders arrive in different places and take time to sort out.',
        points: [
          'Stock counted by hand',
          'Orders in several inboxes',
          'No clear order emails to the customer',
          'No simple list of what to pack today',
        ],
        read: { slug: 'how-to-test-website-speed', label: 'How to test how fast your site really is' },
      },
    ],
  },

  approach: {
    eyebrow: 'OUR APPROACH',
    heading: 'A storefront that sells',
    accent: 'while you sleep.',
    body: 'We build the whole store: products, secure checkout, shipping and tax, and product pages built to be found on their own.',
    checks: [
      'Your products set up and easy to browse',
      'Safe checkout, payments go to you',
      'Shipping, tax and stock set up',
      'Each product can be found on Google',
    ],
    scene: 'shop',
  },

  commitments: {
    heading: 'What that means in practice.',
    lede: 'Four commitments run through every store we build. Here is what each one looks like in the work you receive.',
    rows: [
      {
        tag: 'Built to scale',
        title: 'A catalog that grows with you',
        text: 'From a dozen products to a full inventory, the store is set up so adding products stays simple.',
        points: ['Products and categories organized clearly', 'Photos, variants and prices set up', 'Easy for you to add and edit products', 'Clear product pages for shoppers'],
      },
      {
        tag: 'Safe checkout',
        title: 'Payments go to you',
        text: 'Checkout is secure and set up in your name, so the money goes straight to your account.',
        points: ['Secure payment processing', 'Payment accounts in your name', 'Mobile checkout that is quick', 'Order emails to you and the customer'],
      },
      {
        tag: 'Set up right',
        title: 'Shipping, tax and stock configured',
        text: 'The rules are set for how you really sell, so totals are right and surprises are rare.',
        points: ['Shipping rules by item or area', 'Tax set up for where you sell', 'Local pickup or delivery, if you offer it', 'Stock levels tracked'],
      },
      {
        tag: 'Yours to keep',
        title: 'You own the store',
        text: 'The store, the accounts and the content belong to your business.',
        points: ['Store and domain in your name', 'Payment and shipping accounts in your name', 'Content, photos and products belong to you', 'You can move the store if you choose to'],
      },
    ],
  },

  included: {
    eyebrow: "WHAT'S INCLUDED",
    heading: 'Everything a small store needs to take orders.',
    lede: 'Eight areas of work in one place. Flip through them with the list, the arrows, or your keyboard. What you get is scoped to your catalog on the call.',
    noteLead: 'Scoped to your catalog.',
    note: 'A small shop and a large inventory need different amounts of work, so the quote follows the size of your catalog.',
    categories: [
      {
        title: 'Store design',
        desc: 'The look and layout of the store, made for your products.',
        icon: ICON.design,
        items: [
          [1, 'Store layout planned around your products'],
          [1, 'Your logo, colors and brand look'],
          [1, 'Home, category and product page designs'],
          [1, 'Designed for phones first'],
        ],
      },
      {
        title: 'Product catalog',
        desc: 'Your products set up so they are easy to browse and easy to manage.',
        icon: ICON.box,
        items: [
          [1, 'Products and categories created'],
          [1, 'Photos, descriptions and prices added'],
          [1, 'Sizes, colors and other options set up'],
          [1, 'Bulk upload for larger catalogs'], // CONFIRM
        ],
      },
      {
        title: 'Checkout and payments',
        desc: 'A safe, quick way to pay, with the money going to you.',
        icon: ICON.card,
        read: { slug: 'business-needs-https-ssl', label: 'What the little padlock means' },
        items: [
          [1, 'Secure checkout'],
          [1, 'Payment processing set up in your name'],
          [1, 'Mobile checkout that stays quick, cart included'],
          [1, 'Order confirmation emails'],
        ],
      },
      {
        title: 'Shipping and tax',
        desc: 'Rules set up for how and where you sell.',
        icon: ICON.cart,
        items: [
          [1, 'Shipping rules and rates configured'],
          [1, 'Tax configured for where you sell'],
          [1, 'Local pickup or delivery options, if you offer them'], // CONFIRM
          [1, 'Clear returns information'],
        ],
      },
      {
        title: 'Stock and orders',
        desc: 'Know what you have and what to pack today.',
        icon: ICON.cards,
        items: [
          [1, 'Stock levels tracked'],
          [1, 'Out-of-stock handling'],
          [1, 'A clear list of new orders'],
          [1, 'Order emails sent to you and the customer'],
        ],
      },
      {
        title: 'Found on Google',
        desc: 'Every product built so it can show up on its own.',
        icon: ICON.search,
        read: { slug: 'schema-markup-local-businesses', label: 'Help Google find each of your products' },
        items: [
          [1, 'Product pages written for search'],
          [1, 'Page titles and descriptions for every product'],
          [1, 'Structured details for each product (code that labels it for Google)'],
          [1, 'Google Business Profile link, for shops with a store front'],
        ],
      },
      {
        title: 'Speed and security',
        desc: 'A fast, safe store keeps shoppers and Google happy.',
        icon: ICON.lock,
        read: { slug: 'how-to-test-website-speed', label: 'How to test how fast your site really is' },
        items: [
          [1, 'Images compressed for fast loading'], // CONFIRM
          [1, 'SSL certificate (the padlock and https)'],
          [1, 'Hosting through the required Commerce care plan'],
          [1, 'Speed checked on a phone'],
        ],
      },
      {
        title: 'Launch and support',
        desc: 'We take the store live and stay close afterward.',
        icon: ICON.play,
        items: [
          [1, 'A working preview on a private link'],
          [1, 'Revisions before launch'],
          [1, 'Test orders before real ones'],
          [1, 'A walkthrough of how to manage the store'],
          [1, 'Support for fixes after launch'],
        ],
      },
    ],
  },

  how: {
    eyebrow: 'HOW IT WORKS',
    heading: 'Four steps, and most of the work is ours.',
    lede: 'You only spend time where your input matters. Each step shows what we do, what you do, and what you get at the end of it.',
    readLead: 'Want the full picture of a build?',
    read: { slug: 'what-to-expect-website-build-process', label: 'What actually happens during a professional website build' },
    steps: [
      {
        title: 'Discovery',
        text: 'We start with one conversation about what you sell, to whom, and how.',
        we: ['Learn your products and customers', 'Review your current site and selling channels', 'Plan the catalog structure', 'Choose how to ship, tax and pay'],
        you: ['One phone call about your business', 'Share your product list or spreadsheet', 'Send photos'],
        get: ['A clear plan for the store', 'A written quote'],
      },
      {
        title: 'Design and preview',
        text: 'You see a real, working version quickly, so feedback happens on something concrete.',
        we: ['Design the store pages', 'Set up the first products', 'Publish a private working preview'],
        you: ['Look the preview over', 'Tell us what to change'],
        get: ['A working preview link', 'Revisions before launch'],
      },
      {
        title: 'Build and test',
        text: 'We build the full store and test the whole path from product to payment.',
        we: ['Add the full catalog', 'Set up payments, shipping and tax', 'Test checkout and order emails', 'Make the store fast and secure'],
        you: ['Review the finished store as a customer would', 'Place a test order'],
        get: ['The finished store, ready to go live', 'Tested payments and emails'],
      },
      {
        title: 'Launch and support',
        text: 'We take the store live, show you how it works, and stay close afterward.',
        we: ['Connect your domain', 'Switch payments to live', 'Walk you through managing orders and products', 'Submit the store to Google'],
        you: ['Take your first orders'],
        get: ['A live store, in your name', 'A walkthrough of how to run it', 'Support for fixes after launch'],
      },
    ],
  },

  pricing: {
    eyebrow: 'PRICING',
    heading: 'Two store packages, and a care plan that is required.',
    lede: `A store with a dozen products and a store with a thousand are different jobs, so stores start at a price and are quoted to your catalog in writing. A store takes ${LAUNCH.custom}.`,
    service: 'commerce',
    facts: [
      {
        title: 'What helps decide the package',
        text: 'The package sets the starting price. These things move the final number:',
        kind: 'check',
        items: ['How many products and categories you have', 'How many options each product has', 'Shipping and tax complexity', 'Special features, such as bundles or subscriptions', 'Moving products from an old store'],
      },
      {
        title: "What's not included",
        text: 'We keep these separate so you always know what you are paying for.',
        kind: 'x',
        items: ['Payment processing fees billed by the processor', 'Product photography, unless we agree it', 'SEO, social media and ads. They are separate services with their own plans'],
      },
      {
        title: 'How payment works',
        text: 'No surprises. You see the price in writing before any work begins.',
        kind: 'check',
        items: [
          `Commerce care, ${perMonth(PRICES.commerce.care.monthly)}, is required with every store`,
          'No mystery subscriptions. Every monthly fee is shown here',
          `Work outside what we agreed is always quoted first, at ${HOURLY_LINE}`,
          'Changes after launch are priced clearly before work starts',
        ],
      },
    ],
    readLead: 'Want help comparing?',
    reads: [
      { slug: 'how-much-does-a-contractor-website-cost', label: 'what a website really costs' },
      { slug: 'real-cost-cheap-website', label: 'what a bargain website really costs' },
    ],
  },

  timeline: {
    eyebrow: 'TIMELINE',
    heading: 'From first call to first order.',
    lede: 'A store takes about five weeks. This is the shape of those weeks, drawn to scale. Your quote gives the real dates.',
    phases: [
      { key: 'discovery', bar: 'STEP 1', short: 'Discovery', weight: 1, mark: '1', days: 'Step 1', title: 'Discovery', text: 'A conversation about what you sell and how, and a plan for the catalog.', time: 'Your time: about 60 minutes' },
      { key: 'preview', bar: 'STEP 2', short: 'Preview', weight: 1, mark: '2', days: 'Step 2', title: 'Working preview', text: 'A real, working version of the store with the first products.', time: 'Your time: about 15 minutes' },
      { key: 'build', bar: 'STEP 3', short: 'Full build', weight: 3, mark: '3', days: 'Step 3', title: 'Full build', text: 'We add the catalog, set up payments, shipping and tax, and test the whole path.', time: 'Your time: send products and photos' },
      { key: 'review', bar: 'STEP 4', short: 'Review', weight: 1, mark: '4', days: 'Step 4', title: 'Review and refinements', text: 'You go through the store as a customer would and place a test order.', time: 'Your time: about 15 minutes' },
      { key: 'live', bar: 'STEP 5', short: 'Go live', weight: 1, mark: '5', days: 'Step 5', title: 'Go live', text: 'We connect your domain, switch payments to live and walk you through running the store.', time: 'Your time: take your first orders' },
    ],
    after: { days: 'After launch', title: 'Support', text: 'Support for fixes after launch, and help as the catalog grows.', time: 'Call when you need us' },
    callout: {
      lead: 'The catalog sets the pace.',
      text: 'Larger catalogs take longer. Delays usually come from late product lists, photos or account access, so sending those early is the best way to hold the schedule.', // CONFIRM
    },
  },

  success: {
    eyebrow: 'WHAT SUCCESS LOOKS LIKE',
    heading: 'You can check it yourself.',
    lede: 'You do not need a report. On launch day, go down this list and tick each item as you check it.',
    checklistTitle: 'Launch day checklist',
    doneText: 'All seven checked. That is a store ready to take orders.',
    checks: [
      { title: 'It works on a phone', text: 'Browse your store on your own phone and add something to the cart.' },
      { title: 'Checkout is quick', text: 'Place a test order from start to finish.' },
      { title: 'Payment reaches you', text: 'Confirm the test payment shows in your payment account.' },
      { title: 'Totals are right', text: 'Check shipping and tax on two different orders.' },
      { title: 'Emails arrive', text: 'Check the order emails you and the customer receive.' },
      { title: 'A product can be found', text: 'Search the name of one product plus your shop name on Google.' },
      { title: 'It is in your name', text: 'Ask us to show you the store, domain and payment accounts.' },
    ],
    path: [
      { when: 'At launch', title: 'A store that takes orders', text: 'A fast store with working checkout, shipping and tax.' },
      { when: 'First weeks', title: 'Google finds it', text: 'Product pages are discovered and indexed by Google.' },
      { when: 'Several months', title: 'Products rank', text: 'Product pages gain visibility over time as Google learns your store.' },
    ],
    nope: {
      title: "What we don't promise",
      items: ['A set number of orders or sales', 'A number-one ranking by a set date', 'Instant traffic. A new store needs time to be found'],
    },
  },

  compare: {
    eyebrow: 'HONEST COMPARISON',
    heading: 'Why not a store builder, or a marketplace?',
    lede: 'Each option is right for someone. This is how they compare for a small shop that wants to own its sales.',
    columns: [
      { name: 'Store builder', sub: 'Do it yourself on a platform' },
      { name: 'Freelancer', sub: 'A single independent contractor' },
      { name: 'Large agency', sub: 'A bigger team, more layers' },
      { name: 'Marketplace', sub: 'Sell on a big shopping site' },
    ],
    us: { name: 'MGRTECH', sub: 'Built for local businesses' },
    rows: [
      { label: 'Best for', cells: ['A small catalog and time to set it up', 'A set job with a set budget', 'Big catalogs and complex needs', 'A way to start selling quickly'], us: 'A local shop that wants a store it owns and that is set up for you' },
      { label: 'Your time', cells: ['A lot. You build and set it up', 'Depends on the person', 'More meetings and more people to brief', 'Listing and managing products'], us: 'Product list, photos and a few short reviews' },
      { label: 'Customers', cells: ['Yours', 'Yours', 'Yours', 'Shared with the marketplace'], us: 'Yours, with your own store and brand' },
      { label: 'Fees', cells: ['Platform fees and payment fees', 'Depends on the platform', 'Depends on the platform', 'Fees on each sale'], us: 'Provider fees billed directly to you, no hidden markup' }, // CONFIRM
      { label: 'Found on Google', cells: ['You do it yourself', 'Depends on the person', 'Usually offered, at extra cost', 'Mostly their search, not yours'], us: 'Product pages built to be found on their own' },
      { label: 'Cost', cells: ['Lowest upfront', 'Varies, and care is often extra', 'Highest', 'Low to start, fees on every sale'], us: `Store from ${money(PRICES.commerce.tiers[0].oneTime)}, plus ${perMonth(PRICES.commerce.care.monthly)} care` },
    ],
    note: 'If one of the others fits you better, we will tell you. More reading:',
    reads: [
      { slug: 'diy-website-builders-vs-done-for-you', label: 'DIY vs done-for-you' },
      { slug: 'hiring-a-web-agency-vs-productized-website', label: 'agency or productized website' },
    ],
  },

  fit: {
    eyebrow: "WHO IT'S FOR",
    heading: 'Is this a good fit?',
    lede: "We would rather tell you now than after you've paid. Here is who gets the most from this service, and who doesn't.",
    yesTitle: 'A good fit if',
    yes: [
      'You are a local shop, maker or small brand selling physical products',
      'You want a store you own, not a profile on a marketplace',
      'You want checkout and shipping set up properly for you',
      'You have a product list or can create one',
      'Your customers browse and buy on their phones',
      'You want each product to be found on Google',
    ],
    noTitle: 'Probably not the right fit if',
    no: [
      'You want the cheapest possible store',
      'You want to build and manage everything yourself',
      'You need a very large custom platform',
      'You cannot share products and photos in the timeline',
      'You need a guaranteed number of sales',
    ],
  },

  industries: {
    eyebrow: 'INDUSTRIES',
    heading: 'Every kind of shop sells a little differently.',
    lede: 'A boutique and a parts supplier do not sell the same way. Pick your kind of business to see what we build in.',
    note: 'Not on the list? Call and ask.',
    items: [
      {
        tab: 'Retail and e-commerce',
        title: 'Boutiques and local shops',
        text: 'Shops need to look as good online as they do in person. Photos and speed matter most.',
        points: ['Product photography given room to do the work', 'Fast, simple pages on a phone', 'Local pickup or delivery options, if you offer them', 'Easy to add new arrivals'], // CONFIRM
      },
      {
        tab: 'Auto and motorsports',
        title: 'Repair shops and parts suppliers',
        text: 'Customers need the right part. Clear fit details and filters help them choose.',
        points: ['Products organized by make and model', 'Clear fit and detail information', 'Photos from several angles', 'Stock levels tracked'], // CONFIRM
      },
      {
        tab: 'Trades and contractors',
        title: 'Supply and specialty products',
        text: 'Some trades sell materials or products alongside services. A store keeps that separate and simple.',
        points: ['A shop page next to your services', 'Pickup or delivery for local orders', 'Quote requests for larger orders', 'Clear product and price details'], // CONFIRM
      },
      {
        tab: 'Local services',
        title: 'Service businesses with products',
        text: 'Some service businesses also sell gift cards, kits or add-ons. A store makes that easy.',
        points: ['Gift cards and packages', 'Simple checkout for add-ons', 'Order emails to you and the customer', 'Linked to your service pages'], // CONFIRM
      },
    ],
  },

  guides: {
    eyebrow: 'GUIDES FROM OUR BLOG',
    heading: 'Read up before you decide.',
    lede: 'Short, plain-English guides on the questions people ask us most about selling online. No sign-up needed.',
    featured: {
      slug: 'mobile-first-website-design',
      kicker: 'Start here: phones',
      blurb: 'Why most shoppers browse and buy on a phone, and what that means for your store.',
    },
    groups: [
      { title: 'Speed and phones', slugs: ['mobile-first-website-design', 'how-to-test-website-speed', 'why-website-speed-matters', 'core-web-vitals-explained'] },
      { title: 'Being found', slugs: ['schema-markup-local-businesses', 'image-optimization-guide', 'what-is-schema-markup', 'on-page-seo-checklist'] },
      { title: 'Choosing who builds it', slugs: ['diy-website-builders-vs-done-for-you', 'hiring-a-web-agency-vs-productized-website', 'real-cost-cheap-website', 'what-to-expect-website-build-process'] },
    ],
  },

  faq: {
    eyebrow: 'QUESTIONS',
    heading: 'What else you may want to know.',
    lede: "Can't find your question? Call and ask. You'll get a straight answer from the person who would build it.",
    items: [
      { q: 'How much does an online store cost?', a: `Store starts from ${money(PRICES.commerce.tiers[0].oneTime)} and Store Pro from ${money(PRICES.commerce.tiers[1].oneTime)}. The final number follows your catalog (products, options, shipping and tax), so it is quoted in writing after one call. Commerce care, ${perMonth(PRICES.commerce.care.monthly)}, is required with every store.`, read: { slug: 'how-much-does-a-contractor-website-cost', label: 'what a website really costs' } },
      { q: 'Which platform do you use?', a: 'We choose the platform with you, based on how many products you have and how you sell. We explain the choice in plain English before you commit.' }, // CONFIRM
      { q: 'Do I own the store?', a: 'Yes. The store, the domain and the payment accounts are in your name, and the content and products are yours.' },
      { q: 'Who gets the money from sales?', a: 'You do. Payments go straight to your own payment account.' },
      { q: 'How long does it take?', a: `A store takes ${LAUNCH.custom}. We aim to show you a working preview early, and your quote gives the dates.` },
      { q: 'Can you move my products from another store?', a: 'Often, yes. We check what you have and tell you what can be moved before you start.' }, // CONFIRM
      { q: 'Will my products show on Google?', a: 'Each product page is set up so Google can understand it. Rankings build over time, and nobody can promise a position.' },
      { q: 'Do I have to write the product descriptions?', a: 'You send us what you know and we help turn it into clear descriptions. You review them before launch.' }, // CONFIRM
      { q: 'Can I add products myself later?', a: 'Yes. We show you how, and we are a call away if you get stuck.' },
      { q: 'Are there ongoing costs?', a: `Commerce care is ${perMonth(PRICES.commerce.care.monthly)} and is required with every store. Hosting is part of the care plans. Payment processing fees are billed by the processor, and we list them in writing before you start.` },
      { q: 'Do you only work with MetroWest businesses?', a: "MetroWest Massachusetts is home, and where most clients are. If you're outside the area and the fit is right, call and we'll talk." },
    ],
  },

  related: {
    eyebrow: 'WORKS WELL WITH',
    heading: 'Related services.',
    lede: 'A store is the base. These services help bring shoppers to it.',
    items: [
      { title: 'Website Design and Development', text: 'A fast website made for your business, next to or inside your store.', href: '/services/website-design' },
      { title: 'SEO', text: 'Be found in search over the long run, for your products and your shop.', href: '/services/seo' },
      { title: 'Google Ads and Meta Ads', text: 'Ads that put your products in front of shoppers this week.', href: '/services/google-ads' },
      { title: 'Social Media', text: 'Regular posts that show what is new in your shop.', href: '/services/social-media' },
    ],
  },

  close: {
    eyebrow: 'FREE STORE REVIEW',
    heading: 'Thinking about selling online?',
    accent: 'Tell us what you sell.',
    body: "We'll look at what you sell and tell you the 3 things that matter most for your store. It's free, it takes about 10 minutes, and there's no pressure.",
    emailCta: 'Email us about your store',
  },
};
