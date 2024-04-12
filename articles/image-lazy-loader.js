document.addEventListener("DOMContentLoaded", function () {
  let images = document.querySelectorAll("img[data-src]");
  function loadImagesLazily(e) {
    for (let i = 0; i < images.length; i++) {
      let rect = images[i].getBoundingClientRect();
      if (
        images[i].hasAttribute("data-src") &&
        rect.bottom > -window.innerHeight &&
        rect.top < window.innerHeight * 2 &&
        rect.right > 0 &&
        rect.left < window.innerWidth
      ) {
        images[i].setAttribute("src", images[i].getAttribute("data-src"));
        images[i].removeAttribute("data-src");
      }
    }
  }

  window.addEventListener("scroll", loadImagesLazily);
  window.addEventListener("resize", loadImagesLazily);
  loadImagesLazily();
});
