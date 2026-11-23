# Source copy (not part of the build)

These four files hold the original package, tier and cost-guide copy that the
per-service pages were written from. They were moved out of `src/` because they
contain the **old price sets** ($X,XXX placeholders, $499/$899/$1,082, the $500/mo
bundle), and every price on the site now comes from `src/data/prices.ts`.

Nothing imports them. Keep them as reference for Srii's package descriptions;
do not copy a price from here into the site.
