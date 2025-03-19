const body = document.querySelector("body");
const navbar = document.querySelector(".navbar");
const menu = document.querySelector(".menu-list");
const menuBtn = document.querySelector(".menu-btn");
const cancelBtn = document.querySelector(".cancel-btn");
menuBtn.onclick = ()=>{
    menu.classList.add("active");
    menuBtn.classList.add("hide");
    cancelBtn.classList.add("show");
    body.classList.add("disabledScroll");
}
cancelBtn.onclick = ()=>{
    menu.classList.remove("active");
    menuBtn.classList.remove("hide");
    cancelBtn.classList.remove("show");
    body.classList.remove("disabledScroll");
}

window.onscroll = ()=>{
    this.scrollY > 20 ? navbar.classList.add("sticky") : navbar.classList.remove("sticky");
}

var typed = new Typed(".auto-type", {
    strings : ["Computer Engineer", "Web Developer", "Gamer"],
    typeSpeed : 25,
    backSpeed : 25,
    loop : true
})

const cards = document.querySelectorAll(".card")

const observer = new IntersectionObserver (entries => {
    entries.forEach(entry => {
        entry.target.classList.toggle("show", entry.isIntersecting)
        //To disbale the outro of the cards
        // if (entry.isIntersecting){
        //     observer.unobserve(entry.target)
        // }
    })
}, {
    threshold: 0.5
})

cards.forEach(card => {
    observer.observe(card)
})

function readMore() {
    var moreText = document.getElementById("more");
    var btnText = document.getElementById("myBtn");
  
    if (moreText.style.display !== "none") {
      btnText.innerHTML = "Read more"; 
      moreText.style.display = "none";
    } else {
      btnText.innerHTML = "Read less"; 
      moreText.style.display = "inline";
    }
  }