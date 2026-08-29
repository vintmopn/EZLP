# EZLP V3

Supabase live-data deployment build.

Required Vercel environment variables:
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY (Supabase publishable key)

The storefront reads only PUBLISHED products through Supabase RLS. Internal product source/cost tables are not queried by the customer storefront.
