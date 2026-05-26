
const squareLinks = {
  booking: "PASTE_SQUARE_BOOKING_LINK_HERE",
  retainer: "PASTE_SQUARE_RETAINER_PAYMENT_LINK_HERE",
  weddings: "PASTE_SQUARE_WEDDING_INQUIRY_LINK_HERE",
  events: "PASTE_SQUARE_EVENTS_INQUIRY_LINK_HERE",
  portraits: "PASTE_SQUARE_PORTRAITS_INQUIRY_LINK_HERE",
  video: "PASTE_SQUARE_VIDEO_INQUIRY_LINK_HERE",
  mainSite: "https://kingvisualstudio.square.site"
};

document.querySelectorAll("[data-square]").forEach((button) => {
  const key = button.getAttribute("data-square");
  const link = squareLinks[key] || squareLinks.mainSite;
  button.setAttribute("href", link);
  button.setAttribute("target", "_blank");
  button.setAttribute("rel", "noopener noreferrer");
});

const menuBtn = document.querySelector(".menu-btn");
const mobileMenu = document.querySelector(".mobile-menu");
if(menuBtn && mobileMenu){
  menuBtn.addEventListener("click", () => mobileMenu.classList.toggle("open"));
  mobileMenu.querySelectorAll("a").forEach(a => a.addEventListener("click", () => mobileMenu.classList.remove("open")));
}

const reveals = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add("active");
      observer.unobserve(entry.target);
    }
  });
},{threshold:.16, rootMargin:"0px 0px -70px 0px"});
reveals.forEach(el => observer.observe(el));
