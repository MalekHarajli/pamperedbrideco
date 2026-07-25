/* =========================================================================
   THE PAMPERED BRIDE — FILM MANIFEST
   --------------------------------------------------------------------------
   `frames` is the ordered black-and-white film the scroll scrubs through —
   the bridal ATTENDANT pampering the bride across her day: helping her dress
   → the veil → touch-ups, water & calm → the walk → tending at the reception.
   Each frame has:
     local  — a file you can drop into /assets/frames (preferred if present)
     remote — the Higgsfield-hosted original (used as a fallback)
   The engine (script.js) preloads them progressively, tries `local` first,
   and crossfades between adjacent frames as you scroll. Run ./fetch-assets.sh
   to pull every `remote` into /assets/frames and go fully offline.

   Remote uses Higgsfield's optimized WebP (small + fast on cellular). For
   maximum crispness, swap `_min.webp` → `.png` below (heavier).

   To swap the film: replace these frames (any count, in order) — the scrubber
   adapts automatically. All frames generated with Higgsfield (Soul 2.0), one
   cohesive warm-greyscale grade; attendant & bride shown soft-focus / partial
   / from behind so it stays luxurious and artifact-free.
   ========================================================================= */
(function () {
  var CDN = "https://d8j0ntlcm91z4.cloudfront.net/user_3EjxpShJFpJhZ4euO6tpPFuRZ7f/";
  var seq = [
    ["01", "hf_20260616_204641_b90065fe-e0cc-42f6-9e9e-ea376c5085c0"], /* helping her into the robe */
    ["02", "hf_20260616_204643_5232024e-24a1-44f4-a908-db9aa815acc3"], /* buttoning the gown */
    ["03", "hf_20260616_204645_9c9164c3-771c-4f58-988e-2c6742fcd36e"], /* smoothing the train */
    ["04", "hf_20260616_204646_0faa6fe2-4626-4bc1-9856-2526960e324b"], /* placing the veil */
    ["05", "hf_20260616_204721_9d7db8a2-c04a-49fb-bfaf-61ebd3fdcfe7"], /* makeup touch-up */
    ["06", "hf_20260616_204723_e2e6f12a-7395-448c-bdba-f046d2167684"], /* offering water */
    ["07", "hf_20260616_204725_1d23e7f9-c58c-4a0b-a32c-6237d3651848"], /* clasping the necklace */
    ["08", "hf_20260616_204726_e0f6c1bf-bee5-433e-bc79-e640834c4319"], /* a calm, steadying moment */
    ["09", "hf_20260616_204758_11391345-3630-4a92-b329-30348e4d9a71"], /* carrying the train as she walks */
    ["10", "hf_20260616_204759_eb684a2e-2512-48e2-ba33-f0e0143ca106"], /* adjusting the hem */
    ["11", "hf_20260616_204801_c9d526be-b7aa-4335-99ee-d44fa1df88d4"], /* handing her the bouquet */
    ["12", "hf_20260616_204803_44a7604a-ca36-4b74-918d-298c9e5c9d55"]  /* tending at the reception */
  ];
  window.TPB_ASSETS = {
    frames: seq.map(function (f) {
      return { local: "assets/frames/" + f[0] + ".webp", remote: CDN + f[1] + "_min.webp" };
    })
  };
})();
