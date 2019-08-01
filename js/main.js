(function() {
  // Menu settings
  $("#menuToggle, .menu-close").on("click", function() {
    $("#menuToggle").toggleClass("active");
    $(".header_nav_smallDevise").toggleClass("active");
  });
  $(document).bind("touchmove", false);
  $(".main").mousewheel(function(event, delta) {
    this.scrollLeft -= delta * 150;

    event.preventDefault();
  });
})(jQuery);

function swipe() {
  // ----------------- scroll realization----------------------
  let down = false;
  let scrollLeft;
  let startScrollLeft;
  let startX;

  const list = document.getElementsByClassName("main")[0];

  let screenWidth = list.clientWidth;
  let cur;
  let next;
  let prev;

  list.addEventListener("mousedown", e => {
    down = true;
    document.getElementsByClassName("main")[0].classList.add("activeList");

    startScrollLeft = list.scrollLeft;
    scrollLeft = list.scrollLeft;
    startX = e.pageX - list.offsetLeft;

    cur = document.getElementsByClassName("currentPage")[0];
    prev = cur.previousElementSibling;
    next = cur.nextElementSibling;
  });

  list.addEventListener("mouseup", e => {
    down = false;
    document.getElementsByClassName("main")[0].classList.remove("activeList");

    const x = e.pageX - list.offsetLeft;
    let delta = x - startX;
    let deltaScroll = list.scrollLeft - startScrollLeft;
    if (delta > 100) {
      $(list).animate(
        { scrollLeft: $(list).scrollLeft() - screenWidth + deltaScroll },
        500
      );
      cur.classList.remove();
      prev.classList.add("currentPage");
      cur.classList.remove("currentPage");
    } else if (-100 > delta) {
      $(list).animate(
        { scrollLeft: $(list).scrollLeft() + screenWidth - deltaScroll },
        500
      );

      next.classList.add("currentPage");
      cur.classList.remove("currentPage");
    } else {
      list.scrollLeft = startScrollLeft;
    }
  });

  list.addEventListener("mousemove", e => {
    if (!down) {
      return;
    }
    e.preventDefault();
    const x = e.pageX - list.offsetLeft;
    let delta = x - startX;
    let deltaScroll = list.scrollLeft - startScrollLeft;

    const walk = (x - startX) * 2;
    list.scrollLeft = scrollLeft - walk;
  });

  list.addEventListener("mouseleave", () => {
    down = false;
  });
}
swipe(jQuery);
