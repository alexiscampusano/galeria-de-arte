$(document).ready(function () {
  $("#main-content").load("home.html");

  $(document).on("click", ".nav-menu__link", function (e) {
    e.preventDefault();
    let page = $(this).data("page");
    $("#main-content").load(page + ".html");

    $(".nav-menu__link").removeClass("active");
    $(this).addClass("active");
  });

  $(document).on("click", "#galleryLink", function (e) {
    e.preventDefault();
    $("#main-content").load("gallery.html");

    $(".nav-menu__link").removeClass("active");
    $("#gallery").addClass("active");
  });
});
