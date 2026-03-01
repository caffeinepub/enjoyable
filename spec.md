# Enjoyable

## Current State
The app has a game library with search/category filters. When users click a game, the GamePage loads and tries to embed it via an iframe. All Poki games are stored with page URLs (`https://poki.com/en/g/game-name`) which Poki blocks from being embedded in iframes, so games don't actually play.

## Requested Changes (Diff)

### Add
- Replace Poki page URLs with directly playable embed URLs (using games from sites that allow embedding, such as itch.io games, HTML5 free games, or direct game CDNs that don't block iframes)
- Expand the game library with more truly embeddable games across all categories

### Modify
- Update `sampleGames.ts` to use actual working embed URLs for all games
- Update `GamePage.tsx` to handle the "open in new tab" fallback gracefully for any remaining restricted games
- Ensure the iframe `sandbox` and `allow` attributes are permissive enough for HTML5 games

### Remove
- Non-embeddable Poki page URLs that show a blank/blocked iframe

## Implementation Plan
1. Replace all game embedUrl values in `sampleGames.ts` with verified playable embed URLs from sources that allow embedding (e.g. games from `html5.gamedistribution.com`, `crazygames.com/embed/`, direct `.io` game URLs, or direct HTML5 game files)
2. Add more games using embed-friendly sources
3. Keep GamePage.tsx's fallback "open in new tab" behavior for any edge cases
