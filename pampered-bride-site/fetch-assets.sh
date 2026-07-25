#!/usr/bin/env bash
# Download the Higgsfield black-and-white film frames into /assets/frames so
# the scroll-scrub site runs fully offline & fast. (It works without this —
# script.js falls back to the same CDN URLs at runtime.)  Usage: ./fetch-assets.sh
# Uses the optimized WebP frames. For maximum crispness, change _min.webp -> .png
# here and .webp -> .png in assets.js (heavier files).
set -euo pipefail
cd "$(dirname "$0")"
mkdir -p assets/frames
B="https://d8j0ntlcm91z4.cloudfront.net/user_3EjxpShJFpJhZ4euO6tpPFuRZ7f"
dl(){ echo "→ frames/$1.webp"; curl -fSL "$2" -o "assets/frames/$1.webp"; }
dl 01 "$B/hf_20260616_204641_b90065fe-e0cc-42f6-9e9e-ea376c5085c0_min.webp"
dl 02 "$B/hf_20260616_204643_5232024e-24a1-44f4-a908-db9aa815acc3_min.webp"
dl 03 "$B/hf_20260616_204645_9c9164c3-771c-4f58-988e-2c6742fcd36e_min.webp"
dl 04 "$B/hf_20260616_204646_0faa6fe2-4626-4bc1-9856-2526960e324b_min.webp"
dl 05 "$B/hf_20260616_204721_9d7db8a2-c04a-49fb-bfaf-61ebd3fdcfe7_min.webp"
dl 06 "$B/hf_20260616_204723_e2e6f12a-7395-448c-bdba-f046d2167684_min.webp"
dl 07 "$B/hf_20260616_204725_1d23e7f9-c58c-4a0b-a32c-6237d3651848_min.webp"
dl 08 "$B/hf_20260616_204726_e0f6c1bf-bee5-433e-bc79-e640834c4319_min.webp"
dl 09 "$B/hf_20260616_204758_11391345-3630-4a92-b329-30348e4d9a71_min.webp"
dl 10 "$B/hf_20260616_204759_eb684a2e-2512-48e2-ba33-f0e0143ca106_min.webp"
dl 11 "$B/hf_20260616_204801_c9d526be-b7aa-4335-99ee-d44fa1df88d4_min.webp"
dl 12 "$B/hf_20260616_204803_44a7604a-ca36-4b74-918d-298c9e5c9d55_min.webp"
echo "Done. Local frames now take priority over the CDN automatically."
