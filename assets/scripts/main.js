// Terminating the Pre-Loader
window.onload = () => document.body.classList.add("loaded");
// Toggling Menu Visibility onclick of Menu Icon
document.querySelector("#menuIcon").onclick = () => document.body.classList.toggle("menuPopUp");