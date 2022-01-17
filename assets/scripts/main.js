// Terminating the Pre-Loader
window.onload = () => document.body.classList.add("loaded");
// Toggling Menu Visibility onclick of Menu Icon
document.querySelector("#menuIcon").onclick = () =>
  document.body.classList.toggle("menuPopUp");
// Function to Toggle Pop Up Description
function toggleDescription(identifier) {
  document.querySelector(".backToTop").click();
  document
    .querySelector(`.${identifier}.PaintingDescription`)
    .classList.toggle("DescriptionOpen");
  document.body.classList.toggle("EmptyBody");
}
