document.addEventListener("DOMContentLoaded", function () {
  var body = document.body;
  if (!body || !body.classList.contains("eval-version-page")) {
    return;
  }

  var panel = document.querySelector(".evaluation-panel");
  var openButton = document.querySelector(".evaluation-mobile-open");
  var closeButton = document.querySelector(".evaluation-mobile-close");

  if (!panel || !openButton || !closeButton) {
    return;
  }

  function setOpen(isOpen) {
    body.classList.toggle("eval-form-open", isOpen);
    openButton.setAttribute("aria-expanded", isOpen ? "true" : "false");
  }

  openButton.addEventListener("click", function () {
    setOpen(true);
  });

  closeButton.addEventListener("click", function () {
    setOpen(false);
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      setOpen(false);
    }
  });
});
