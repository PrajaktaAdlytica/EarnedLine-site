# EarnedLine — Hostinger deployment

This branch contains the prebuilt static website, all 27 prerendered routes, brand assets, fonts, favicons, and intro media. Hostinger does not need Node.js or a build command. Editable source remains on `main`.

Source commit: `8500af4752c580a795cb66b3f946dadf26cc9c05`.

## Connect

1. Create a Custom PHP/HTML website on your Hostinger hosting plan and select the intended EarnedLine domain.
2. Open its Dashboard → Advanced → Git and connect GitHub.
3. Select `PrajaktaAdlytica/EarnedLine-site` and branch `hostinger-deploy`.
4. Deploy the branch root into `public_html`. If the legacy Git form says an empty directory field means public_html, leave it empty. Do not select `dist`.
5. Ensure the destination is empty before the first Git deployment; back up any existing website before removing placeholder files.
6. Deploy, then enable automatic deployment if offered. No install or build command is required.
7. Confirm HTTPS, homepage intro/hero transition, nested route refreshes, images/fonts, mobile navigation, and an unknown URL returning the custom 404.

`.htaccess` handles clean prerendered URLs, the custom 404 response, MIME types, and hashed-asset caching. Do not add a catch-all rewrite to the homepage.

## Domain and launch status

The custom domain was not provided at packaging time. Old preview-host canonical and Open Graph URL tags and the preview-host sitemap were removed to avoid advertising the wrong domain. The existing `noindex, nofollow` and robots block are intentionally retained. Once the domain is confirmed, regenerate canonical/social URLs and sitemap for it, then remove indexing blocks only when ready to launch.

Forms currently save local drafts; they do not send email or create CRM records. Sign-in and product examples are prototypes using fictional data.

## Updates

Make changes on `main`, run `npm ci` and `npm run build`, replace this branch's website files with the contents of `dist`, preserve this `.htaccess`, and apply the domain metadata adjustments described above. Commit and push to `hostinger-deploy`, then deploy in Hostinger (or use its automatic deployment option). Pushing source to `main` alone does not rebuild this static branch.

Keep the Vercel deployment available until the Hostinger version has been verified. Domain DNS and email records are managed separately; this branch does not change them.
