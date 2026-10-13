# EarnedLine hero film

Original typographic product film for the Evidence in Motion homepage direction. All agreement, usage, invoice, credit and reviewer records are fictional. This is an illustrative concept preview.

## Develop

Run `npm ci`, then `npm run dev -- --no-open`. Studio registers EarnedLineHero and EarnedLineMobileHero (18 seconds each), EarnedLinePoster and EarnedLineMobile.

## Export

Run `npm run render:hero`, `npm run render:mobile`, `npm run poster:desktop` and `npm run poster:mobile`. Chrome for Testing is selected because the current macOS headless-shell package failed to locate ICU resources in its GPU process. The official renderer downloads Chrome automatically. No system browser or private data is required.

## Web playback

Use the MP4 with `muted`, `playsInline`, a visible pause/replay control and the desktop poster. Use the reflowed portrait MP4 at widths up to 600px, with its mobile poster. When `prefers-reduced-motion: reduce` is set, render a poster and omit autoplay. Video is silent. MP4 metadata places `moov` before `mdat` for progressive playback.

## Film logic

Executed Acme Analytics agreement CT-22 / clause C-22 (signed 12 Aug 2026, effective 01 Sep 2026) → 10,000 included events and $0.04 per additional event → 12,000 metered events (USG-SEP22) → invoice I-88 contains a $2,000 base subscription only → $80 candidate discrepancy, NOT VERIFIED → $40 credit CR-40 with applicability pending → held finance review. No invoice, customer message or external correction is sent. Historical billability is unassessed.

## Fonts and rights

Manrope and IBM Plex Sans are bundled under their included SIL Open Font Licenses. EarnedLine logo uses the selected original Line Signature vector. All other film visuals are authored in JSX with synthetic content; no competitor UI or logo is reproduced. Remotion project dependencies are isolated from the website bundle. Check Remotion’s applicable license before adopting the renderer commercially.

## Summit of Sources opening film

The separate 18-second opening composition is EarnedLineIntro (1920 × 1080, 30fps), with EarnedLineIntroMobile (900 × 1200). Render using npm run render:intro or npm run render:intro-mobile. IntroComposition.tsx holds the native interface layers and camera transforms; public/intro/alpine.png is the generated landscape background. The website mounts IntroVideo above the original hero, with pause, replay, skip, transcript and reduced-motion poster. The approved SVG wordmark is used directly.
