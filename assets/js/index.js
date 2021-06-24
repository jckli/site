//menu
$("#close").click(function () {
  hideMenu();
});
$("#open").click(function () {
  $("#menu").css("display", "flex");
  $("#menu").addClass("animated slideInDown");
  setTimeout(function () {
    $("#menu").removeClass("animated slideInDown");
  }, 800);
});
function hideMenu() {
  $("#menu").addClass("animated slideOutUp");
  setTimeout(function () {
    $("#menu").css("display", "none");
    $("#menu").removeClass("animated slideOutUp");
  }, 800);
}
