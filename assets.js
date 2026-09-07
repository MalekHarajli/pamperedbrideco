/* =========================================================================
   THE PAMPERED BRIDE — FILM MANIFEST
   --------------------------------------------------------------------------
   `frames` is the ordered black-and-white film the scroll scrubs through.
   Each frame has:
     local  — a file in /assets/frames (preferred; once these exist the site
              serves the film from YOUR OWN repo — fast, cached, and it can
              never disappear again)
     remote — the Higgsfield copy (only used as a fallback until the local
              files are uploaded)
   The engine tries `local` first, then `remote`. Local and remote use the
   SAME filename, so you can download each image and drop it straight into
   /assets/frames with no renaming.
   ========================================================================= */
(function () {
  var CDN = "https://d8j0ntlcm91z4.cloudfront.net/user_3IqF4YUzP7IHxQ5euyzWbqkBwsD/";
  var files = [
    "hf_20260904_011257_55238f21-5d23-4a0c-b9bf-a4cab28cb09d_min.webp", /* 01 robe */
    "hf_20260904_011712_b4cdfcc9-e9d7-44bc-b09c-8bc616c68241_min.webp", /* 02 buttoning */
    "hf_20260904_012100_f3f1378c-2bd9-4c34-ac08-5e5e2fb85580_min.webp", /* 03 train */
    "hf_20260904_012144_2b52de13-9ced-4cf7-935b-322a9e818f89_min.webp", /* 04 veil */
    "hf_20260904_012247_2d7c94e2-3e52-4d48-abbc-239d426070c4_min.webp", /* 05 touch-up */
    "hf_20260904_012317_d7be6e81-e11e-4ee6-8cf4-e7b2424f963e_min.webp", /* 06 water */
    "hf_20260904_012548_5efddd13-d532-4e83-a1ca-c7cdb90e84e5_min.webp", /* 07 necklace */
    "hf_20260904_012619_643705e3-af0b-4b0a-a876-ffd0b4334d72_min.webp", /* 08 calm */
    "hf_20260904_012645_230cecb0-ff91-4a9d-9ac4-e7c62f506101_min.webp", /* 09 carry train */
    "hf_20260904_012846_d4c8576b-a97f-4fd1-8f32-df4d276a1e03_min.webp", /* 10 hem */
    "hf_20260904_013052_42a8758c-94b4-4491-ad65-735909e87f2b_min.webp", /* 11 bouquet */
    "hf_20260904_013342_9f3dcdfc-4b3e-4f49-b781-f7bb1aaeaa44_min.webp"  /* 12 reception */
  ];
  window.TPB_ASSETS = {
    frames: files.map(function (name) {
      return { local: "assets/frames/" + name, remote: CDN + name };
    })
  };
})();
