(function() {
  // Menu settings
  $("#menuToggle, .menu-close").on("click", function() {
    $("#menuToggle").toggleClass("active");
    $("body").toggleClass("body-push-toleft");
    $("#theMenu").toggleClass("menu-open");
  });
})(jQuery);

// $(document).ready(function(){
//     $('.go_to').click( function(){ // ловим клик по ссылке с классом go_to
// 	var scroll_el = $(this).attr('href'); // возьмем содержимое атрибута href, должен быть селектором, т.е. например начинаться с # или .
//         if ($(scroll_el).length != 0) { // проверим существование элемента чтобы избежать ошибки
// 	    $('html, body').animate({ scrollTop: $(scroll_el).offset().top }, 500); // анимируем скроолинг к элементу scroll_el
//         }
// 	    return false; // выключаем стандартное действие
//     });
// });
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
