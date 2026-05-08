document.addEventListener("DOMContentLoaded", function () {
  var body = document.body;
  if (!body || !body.classList.contains("eval-version-page")) {
    return;
  }

  var previewContainers = Array.prototype.slice.call(
    document.querySelectorAll(".feed-content .thumb-container")
  );

  function resizePostPreviews() {
    previewContainers.forEach(function (container) {
      var frame = container.querySelector("iframe");
      if (!frame) {
        return;
      }

      var baseWidth = 1280;
      var baseHeight = 920;
      var scale = Math.min(0.75, container.clientWidth / baseWidth);

      frame.style.width = baseWidth + "px";
      frame.style.height = baseHeight + "px";
      frame.style.transform = "scale(" + scale + ")";
      frame.style.transformOrigin = "0 0";
      container.style.height = Math.ceil(baseHeight * scale) + "px";
    });
  }

  resizePostPreviews();
  window.addEventListener("resize", resizePostPreviews);

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

  var versionMatch = window.location.pathname.match(/\/v([1-4])\.html$/);
  var feedContent = document.querySelector(".feed-content");
  if (!versionMatch || !feedContent) {
    return;
  }

  var currentVersion = parseInt(versionMatch[1], 10);
  var nav = document.createElement("nav");
  nav.className = "version-progress";
  nav.setAttribute("aria-label", "Version navigation");

  var label = document.createElement("span");
  label.className = "version-progress__label";
  label.textContent = "Version " + currentVersion + " of 4";
  nav.appendChild(label);

  if (currentVersion > 1) {
    var previous = document.createElement("a");
    previous.className = "version-progress__link";
    previous.href = "v" + (currentVersion - 1) + ".html";
    previous.textContent = "Back: V" + (currentVersion - 1);
    nav.appendChild(previous);
  }

  var next = document.createElement("a");
  next.className = "version-progress__link version-progress__link--primary";
  var nextHref;
  var nextText;
  if (currentVersion < 4) {
    nextHref = "v" + (currentVersion + 1) + ".html";
    nextText = "Next: V" + (currentVersion + 1);
  } else {
    nextHref = "index.html";
    nextText = "Finish";
  }
  next.href = nextHref;
  next.textContent = nextText;
  nav.appendChild(next);

  feedContent.insertBefore(nav, feedContent.firstElementChild);

  var panelFrame = panel.querySelector(".evaluation-panel__frame");
  if (panelFrame) {
    var panelNav = document.createElement("div");
    panelNav.className = "evaluation-version-next";

    var panelNext = document.createElement("a");
    panelNext.className = "evaluation-version-next__link";
    panelNext.href = nextHref;
    panelNext.textContent = nextText;
    panelNav.appendChild(panelNext);

    panelFrame.insertAdjacentElement("beforebegin", panelNav);
  }
});
