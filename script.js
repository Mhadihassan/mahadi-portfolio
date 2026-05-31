function refreshIcons() {
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

function revealItems($section) {
  const $items = $section.find(
    ".tag-row span, .stats-grid article, .service-card, .resume-card, .skill-group, .project-card, .contact-layout"
  );

  $items.removeClass("is-visible").addClass("motion-item");

  $items.each(function (index) {
    this.style.animationDelay = `${Math.min(index * 45, 240)}ms`;
  });

  window.requestAnimationFrame(() => {
    $items.addClass("is-visible");
  });
}

function showSection(sectionId) {
  const $target = $("#" + sectionId);
  const $current = $(".panel-section.active");

  if (!$target.length || $target.is($current)) {
    return;
  }

  $("[data-section]").removeClass("active");
  $(`[data-section="${sectionId}"]`).addClass("active");

  if (["experience", "education", "skills"].includes(sectionId)) {
    $(".resume-nav > .nav-link").addClass("active");
  }

  $current.stop(true, true).fadeOut(150, function () {
    $current.removeClass("active");
    $target
      .css({ display: "none", opacity: 0, transform: "translateY(10px)" })
      .addClass("active")
      .slideDown(220)
      .animate({ opacity: 1 }, { queue: false, duration: 260 });

    window.setTimeout(() => {
      $target.css("transform", "");
      revealItems($target);
      refreshIcons();
    }, 40);
  });

  $("html, body").stop(true).animate({ scrollTop: 0 }, 360);
}

$(function () {
  const initialSection = window.location.hash.replace("#", "");
  if (initialSection && $("#" + initialSection).length) {
    $(".panel-section").removeClass("active").hide();
    $("#" + initialSection).addClass("active").show();
    $("[data-section]").removeClass("active");
    $(`[data-section="${initialSection}"]`).addClass("active");

    if (["experience", "education", "skills"].includes(initialSection)) {
      $(".resume-nav > .nav-link").addClass("active");
    }
  }

  refreshIcons();
  revealItems($(".panel-section.active"));

  $(".resume-toggle").on("click", function (event) {
    event.stopPropagation();
    const $resumeNav = $(".resume-nav");
    const isOpen = !$resumeNav.hasClass("open");

    $resumeNav.toggleClass("open", isOpen);
    $(this).attr("aria-expanded", isOpen ? "true" : "false");
  });

  $("[data-section]").not(".resume-toggle").on("click", function () {
    const sectionId = $(this).data("section");
    showSection(sectionId);
    $(".resume-nav").removeClass("open");
    $(".resume-toggle").attr("aria-expanded", "false");

    if (history.replaceState) {
      history.replaceState(null, "", "#" + sectionId);
    }
  });

  $(document).on("click", function () {
    $(".resume-nav").removeClass("open");
    $(".resume-toggle").attr("aria-expanded", "false");
  });

  $(".service-card, .project-card, .stats-grid article").on("mouseenter", function () {
    $(this).find("svg").first().stop(true, true).fadeTo(120, 0.62).fadeTo(180, 1);
  });
});
