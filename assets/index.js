const body = document.querySelector("body");
const navbar = document.querySelector(".navbar");
const menu = document.querySelector(".menu-list");
const menuBtn = document.querySelector(".menu-btn");
const iconBtn = document.querySelector(".ham");

menuBtn.onclick = ()=>{
    if(iconBtn.classList.contains('active')){
        menu.classList.add("active");
        body.classList.add("disabledScroll");

        var count = $('.list_item').length;
        $('.menu-list').slideDown( (count*.6)*100 );
        $('.list_item').each(function(i){
            var thisLI = $(this).get(0);
            timeOut = 100*i;
            setTimeout(function(){
                thisLI.classList.add("active");
            },100*i);
        });
    }else{
        menu.classList.remove("active");
        body.classList.remove("disabledScroll");

        $('.list_item').each(function(i){
            var thisLI = $(this).get(0);
            thisLI.classList.remove("active");
        });
    }
    
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

let clickedReadMore = false;

function readMore(button) {
    const card = button.parentElement;
    const moreText = card.querySelector('.more');
    const btnText = card.querySelector('.card__button');

    clickedReadMore = true;

    btnText.style.display = "none"; 
    moreText.classList.add("show");
}

function readLess(card) {
    const moreText = card.querySelector('.more');
    const btnText = card.querySelector('.card__button');

    clickedReadMore = false;

    moreText.classList.remove("show");
    btnText.style.display = "block";
}

function readMouseOver(card) {
    const moreText = card.querySelector('.more');
    const btnText = card.querySelector('.card__button');

    if (!clickedReadMore) {
        btnText.style.display = "block";
    } else {
        moreText.classList.add("show");
    }
}

