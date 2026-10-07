# Deploying the Smart Bus Stop Feature Explorer

This is a fully static website. It requires **no build command, server, database, API key, or dependency installation**.

## Upload to any static host

1. Upload the **contents** of this folder, preserving `assets/` and `assets/final-feature-images/`.
2. Use `index.html` as the entry point.

## Included behavior

- Clean opening state: main daytime bus-stop image, Explore the bus stop controls, and the nine existing feature buttons.
- **Day / Night:** swaps to the supplied Adaptive Lighting image, reveals the supplied lighting label, and emphasizes the relevant feature buttons.
- **Normal / Rain:** uses the existing Rain Canopy and Rainwater Harvesting images with a subtle CSS-only rain overlay and the required explanation.
- **Normal / Crowded:** uses the existing Retractable Bench image and the required crowd explanation.
- Every original feature button remains usable and reveals its matching final supplied image.
- **Close feature** and `Escape` hide the selected feature detail.

No generated, redrawn, cropped, or modified images are included. All final feature image files are direct copies of the supplied assets.
