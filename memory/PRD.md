# Duodecimal — Enterprise Website PRD

## Original Problem Statement
"Build a landing page: I want to build a enterprise website for an software development like uniisys, for my company duodecimal."

## User Choices
- Full enterprise site: Hero, Services, Industries, About, Case Studies, Testimonials, Contact form
- Services: Custom software, web & mobile apps, cloud, AI/ML, UI/UX, consulting
- Contact form: save to database + admin view
- Design: light, clean corporate (executed as Swiss/high-contrast "base-12" architectural aesthetic per design_guidelines.json)

## Architecture
- Frontend: React 19 + Tailwind + framer-motion (kinetic masked hero reveal, scroll reveals, parallax) + lenis (momentum scrolling) + react-fast-marquee + sonner toasts
- Backend: FastAPI + motor (MongoDB), JWT admin auth (bcrypt, brute-force lockout), enquiries CRUD
- Routes: `/` (landing), `/admin/login`, `/admin` (enquiries dashboard)
- API: POST /api/enquiries (public), GET /api/enquiries (admin), POST /api/auth/login, GET /api/auth/me, POST /api/auth/logout

## User Personas
- Enterprise buyer (CTO/VP Eng) evaluating a software consultancy
- Duodecimal admin reviewing inbound enquiries

## Implemented (2026-08-08)
- Kinetic hero with masked line-by-line reveal, parallax architectural image, floating uptime stat, stats band
- Slow editorial marquee of capabilities
- Services bento grid (12-col, 6 disciplines, hover-invert cards)
- Industries accordion (6 domains)
- Numbered manifesto About section (01 Precision / 02 Partnership / 03 Proof)
- Case studies (dark section, 3 client stories with metrics)
- Testimonials (3 client quotes with portraits)
- Contact form saving enquiries to MongoDB with success/error toasts
- Admin login (JWT) + enquiries dashboard with count, refresh, sign out
- Admin seeding from env, credentials in /app/memory/test_credentials.md

## Verified
- curl: enquiry create, login, protected list, 401 unauthorized
- e2e screenshot: form submit -> toast -> admin login -> enquiry visible in table

## Updates (2026-08-08)
- Palette aligned to real brand at duodecimal.in: royal blue #2E4BFF accent (logo periwinkle #6B85FF noted), black/white base
- Typography switched to brand fonts: Oswald (headings) + Poppins (body), heading tracking relaxed for Oswald's condensed cut
- Real DU0DEC1MAL logo artwork (from duodecimal.in) saved to frontend/public/logo.png and used in nav, footer, admin login and admin dashboard, replacing the "12" placeholder
- Individual industry pages at /industries/:slug (6 pages: fintech-banking, healthcare-life-sciences, retail-ecommerce, logistics-supply-chain, manufacturing-iot, saas-platforms) with hero, stats band, numbered challenges, offerings grid, products section and CTA; shared data in src/data/industries.js; homepage accordion links to each page; nav handles cross-page hash navigation
- Products per industry page (DD Pay, DD Risk, DD Ledger, DD Care, DD Bridge, DD Commerce, DD Stock, DD Fleet, DD Route, DD Twin, DD Sense, DD Meter, DD Tenant — placeholder names/details for user to replace)
- Blog: /blog list + /blog/:slug article pages; posts stored in MongoDB; 3 sample articles seeded; public GET /api/posts, /api/posts/{slug}; admin POST/DELETE
- Happenings section on homepage (company news/LinkedIn-linked updates); happenings stored in MongoDB; 3 samples seeded; public GET /api/happenings; admin POST/DELETE
- Admin dashboard now has tabs: Enquiries | Blog articles | Happenings, with publish + delete forms for blog and happenings

## Backlog
- P0: none
- P1: Email notification on new enquiry (Resend), case study detail pages, careers page
- P2: Blog/insights, multi-language, analytics, CMS-editable content
