const directions = {
  minimal: {
    title: "Quiet & precise",
    description:
      "Products first, with a clear catalog and restrained typography.",
  },
  editorial: {
    title: "Editorial",
    description:
      "An asymmetric story, expressive serif typography and generous breathing room.",
  },
  bold: {
    title: "Bold & expressive",
    description:
      "A strong graphic opening, a horizontal catalog and a contrasting visual rhythm.",
  },
};
let direction = "minimal",
  revised = false,
  hasHistory = false;
const $ = (id) => document.getElementById(id);
function show() {
  const file = `/${direction}${revised ? "-revision" : ""}.html`;
  $("storefront").src = file;
  $("storefront").title =
    `Fictional Terra Atelier storefront, ${directions[direction].title}, ${revised ? "revision" : "original"}`;
  $("open-preview").href = file;
  $("download").href = `/${direction}${revised ? "-revision" : ""}.zip`;
  $("direction-title").textContent = directions[direction].title;
  $("direction-description").textContent = directions[direction].description;
  $("state").textContent = revised
    ? "Recorded revision · v2 · story before products"
    : hasHistory
      ? "Undo restored v1 · v2 remains in history"
      : "Original saved example · v1";
  $("preview-status").textContent =
    `TERRA ATELIER · ${revised ? "RECORDED REVISION" : "ORIGINAL"}`;
  $("revise").disabled = revised;
  $("undo").disabled = !revised;
  $("history").replaceChildren(
    ...[
      "v1 · Original example",
      ...(hasHistory ? ["v2 · Recorded structural revision"] : []),
    ].map((text) => {
      const li = document.createElement("li");
      li.textContent = text;
      return li;
    }),
  );
  document
    .querySelectorAll("[data-direction]")
    .forEach((b) =>
      b.setAttribute("aria-pressed", String(b.dataset.direction === direction)),
    );
}
document.querySelectorAll("[data-direction]").forEach((b) =>
  b.addEventListener("click", () => {
    direction = b.dataset.direction;
    revised = false;
    hasHistory = false;
    show();
  }),
);
document.querySelectorAll("[data-device]").forEach((b) =>
  b.addEventListener("click", () => {
    $("frame-wrap").classList.toggle("phone", b.dataset.device === "phone");
    document
      .querySelectorAll("[data-device]")
      .forEach((c) => c.setAttribute("aria-pressed", String(c === b)));
  }),
);
$("revise").addEventListener("click", () => {
  revised = true;
  hasHistory = true;
  show();
});
$("undo").addEventListener("click", () => {
  revised = false;
  show();
});
