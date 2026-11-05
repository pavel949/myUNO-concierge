# Public catalog integration

The app GET /api/catalog?kind=services|properties aggregates public records from two separate systems. It never reads private bookings or modifies source systems.

## Required deployment environment variables
- MYUNO_SUPABASE_URL: Supabase project URL for **myuno**, not myUNO-final.
- MYUNO_SUPABASE_ANON_KEY: publishable/anon key, never a service-role key.
- MYUNO_FINAL_PUBLIC_URL: verified production or staging base URL for **myUNO-final**.

Configure these in Vercel project settings; do not commit secrets. API reads are read-only. If a source is unconfigured or fails, the UI shows a partial-data warning. No false availability or booking claims.

## Known limits
- The myUNO-final /api/search/units endpoint requires adultsCount; adapter sends 1. Response schema must be verified against deployed version.
- No automatic deduplication across systems until canonical ID mapping exists.
- No live availability claims, prices must be treated as source-provided and not final quotes.
- Production connectivity and data access have not been tested.
- Vite dev server does not implement Vercel functions; test via Vercel deployment or Vercel CLI.
