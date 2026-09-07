/* =========================================================================
   THE PAMPERED BRIDE — FILM MANIFEST
   --------------------------------------------------------------------------
   `frames` is the ordered black-and-white film the scroll scrubs through —
   the bridal attendant pampering the bride across her day. Each frame has:
     local  — a file in /assets/frames (preferred; upload these to own them
              forever so the film never depends on a third party again)
     remote — the Higgsfield CDN copy (fallback until the local files exist)
   The engine tries `local` first, then `remote`.
   ========================================================================= */
(function () {
  var CDN = "https://d8j0ntlcm91z4.cloudfront.net/user_3IqF4YUzP7IHxQ5euyzWbqkBwsD/";
  var seq = [
    ["01", "hf_20260904_011257_55238f21-5d23-4a0c-b9bf-a4cab28cb09d"], /* helping her into the robe */
    ["02", "hf_20260904_011712_b4cdfcc9-e9d7-44bc-b09c-8bc616c68241"], /* buttoning the gown */
    ["03", "hf_20260904_012100_f3f1378c-2bd9-4c34-ac08-5e5e2fb85580"], /* smoothing the train */
    ["04", "hf_20260904_012144_2b52de13-9ced-4cf7-935b-322a9e818f89"], /* placing the veil */
    ["05", "hf_20260904_012247_2d7c94e2-3e52-4d48-abbc-239d426070c4"], /* makeup touch-up */
    ["06", "hf_20260904_012317_d7be6e81-e11e-4ee6-8cf4-e7b2424f963e"], /* offering water */
    ["07", "hf_20260904_012548_5efddd13-d532-4e83-a1ca-c7cdb90e84e5"], /* clasping the necklace */
    ["08", "hf_20260904_012619_643705e3-af0b-4b0a-a876-ffd0b4334d72"], /* a calm, steadying moment */
    ["09", "hf_20260904_012645_230cecb0-ff91-4a9d-9ac4-e7c62f506101"], /* carrying the train */
    ["10", "hf_20260904_012846_d4c8576b-a97f-4fd1-8f32-df4d276a1e03"], /* adjusting the hem */
    ["11", "hf_20260904_013052_42a8758c-94b4-4491-ad65-735909e87f2b"], /* handing the bouquet */
    ["12", "hf_20260904_013342_9f3dcdfc-4b3e-4f49-b781-f7bb1aaeaa44"]  /* tending at the reception */
  ];
  window.TPB_ASSETS = {
    frames: seq.map(function (f) {
      return { local: "assets/frames/" + f[0] + ".webp", remote: CDN + f[1] + "_min.webp" };
    })
  };
})();
