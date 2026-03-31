let openedModals = 0;

function updateBodyAttr() {
  if (typeof document === "undefined") return;

  if (openedModals > 0) {
    document.body.setAttribute("data-modal-open", "true");
  } else {
    document.body.removeAttribute("data-modal-open");
  }
}

export function openGlobalModal() {
  openedModals += 1;
  updateBodyAttr();
}

export function closeGlobalModal() {
  openedModals = Math.max(0, openedModals - 1);
  updateBodyAttr();
}