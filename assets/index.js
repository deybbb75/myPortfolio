const body = document.querySelector("body");
const navbar = document.querySelector(".navbar");
const menu = document.querySelector(".menu-list");
const menuBtn = document.querySelector(".menu-btn");
const iconBtn = document.querySelector(".ham");

window.addEventListener('load', function() {
	setTimeout(function() {
	  const preloader = document.getElementById('preloader');
	  preloader.style.opacity = '0'; // fade out
	  setTimeout(function() {
		preloader.style.display = 'none'; // hide after fade out
	  }, 500); // match fade time (0.5s)
	}, 1000); // wait minimum 2 seconds
  });

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

$('.list_item').each(function(i){
	var thisLI = $(this).get(0);
	thisLI.onclick = ()=>{
		menu.classList.remove("active");
        body.classList.remove("disabledScroll");
		iconBtn.classList.remove("active");
	}
});


window.onscroll = ()=>{
    this.scrollY > 20 ? navbar.classList.add("sticky") : navbar.classList.remove("sticky");
}

var typed = new Typed(".auto-type", {
    strings : ["Computer Engineer", "Web Developer", "Programmer"],
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

class Pixel {
	constructor(canvas, context, x, y, color, speed, delay) {
		this.width = canvas.width;
		this.height = canvas.height;
		this.ctx = context;
		this.x = x;
		this.y = y;
		this.color = color;
		this.speed = this.getRandomValue(0.1, 0.9) * speed;
		this.size = 0;
		this.sizeStep = Math.random() * 0.4;
		this.minSize = 0.5;
		this.maxSizeInteger = 2;
		this.maxSize = this.getRandomValue(this.minSize, this.maxSizeInteger);
		this.delay = delay;
		this.counter = 0;
		this.counterStep = Math.random() * 4 + (this.width + this.height) * 0.01;
		this.isIdle = false;
		this.isReverse = false;
		this.isShimmer = false;
	}

	getRandomValue(min, max) {
		return Math.random() * (max - min) + min;
	}

	draw() {
		const centerOffset = this.maxSizeInteger * 0.5 - this.size * 0.5;

		this.ctx.fillStyle = this.color;
		this.ctx.fillRect(
		this.x + centerOffset,
		this.y + centerOffset,
		this.size,
		this.size
		);
	}

	appear() {
		this.isIdle = false;

		if (this.counter <= this.delay) {
		this.counter += this.counterStep;
		return;
		}

		if (this.size >= this.maxSize) {
		this.isShimmer = true;
		}

		if (this.isShimmer) {
		this.shimmer();
		} else {
		this.size += this.sizeStep;
		}

		this.draw();
	}

	disappear() {
		this.isShimmer = false;
		this.counter = 0;

		if (this.size <= 0) {
		this.isIdle = true;
		return;
		} else {
		this.size -= 0.1;
		}

		this.draw();
	}

	shimmer() {
		if (this.size >= this.maxSize) {
		this.isReverse = true;
		} else if (this.size <= this.minSize) {
		this.isReverse = false;
		}

		if (this.isReverse) {
		this.size -= this.speed;
		} else {
		this.size += this.speed;
		}
	}
}
  
class PixelCanvas extends HTMLElement {
	static register(tag = "pixel-canvas") {
		if ("customElements" in window) {
		customElements.define(tag, this);
		}
	}

	static css = `
		:host {
		display: grid;
		inline-size: 100%;
		block-size: 100%;
		overflow: hidden;
		}
	`;

	get colors() {
		return this.dataset.colors?.split(",") || ["#f8fafc", "#f1f5f9", "#cbd5e1"];
	}

	get gap() {
		const value = this.dataset.gap || 5;
		const min = 4;
		const max = 50;

		if (value <= min) {
		return min;
		} else if (value >= max) {
		return max;
		} else {
		return parseInt(value);
		}
	}

	get speed() {
		const value = this.dataset.speed || 35;
		const min = 0;
		const max = 100;
		const throttle = 0.001;

		if (value <= min || this.reducedMotion) {
		return min;
		} else if (value >= max) {
		return max * throttle;
		} else {
		return parseInt(value) * throttle;
		}
	}

	get noFocus() {
		return this.hasAttribute("data-no-focus");
	}

	connectedCallback() {
		const canvas = document.createElement("canvas");
		const sheet = new CSSStyleSheet();

		this._parent = this.parentNode;
		this.shadowroot = this.attachShadow({ mode: "open" });

		sheet.replaceSync(PixelCanvas.css);

		this.shadowroot.adoptedStyleSheets = [sheet];
		this.shadowroot.append(canvas);
		this.canvas = this.shadowroot.querySelector("canvas");
		this.ctx = this.canvas.getContext("2d");
		this.timeInterval = 1000 / 60;
		this.timePrevious = performance.now();
		this.reducedMotion = window.matchMedia(
		"(prefers-reduced-motion: reduce)"
		).matches;

		this.init();
		this.resizeObserver = new ResizeObserver(() => this.init());
		this.resizeObserver.observe(this);

		this._parent.addEventListener("mouseenter", this);
		this._parent.addEventListener("mouseleave", this);

		if (!this.noFocus) {
		this._parent.addEventListener("focusin", this);
		this._parent.addEventListener("focusout", this);
		}
	}

	disconnectedCallback() {
		this.resizeObserver.disconnect();
		this._parent.removeEventListener("mouseenter", this);
		this._parent.removeEventListener("mouseleave", this);

		if (!this.noFocus) {
		this._parent.removeEventListener("focusin", this);
		this._parent.removeEventListener("focusout", this);
		}

		delete this._parent;
	}

	handleEvent(event) {
		this[`on${event.type}`](event);
	}

	onmouseenter() {
		this.handleAnimation("appear");
	}

	onmouseleave() {
		this.handleAnimation("disappear");
	}

	onfocusin(e) {
		if (e.currentTarget.contains(e.relatedTarget)) return;
		this.handleAnimation("appear");
	}

	onfocusout(e) {
		if (e.currentTarget.contains(e.relatedTarget)) return;
		this.handleAnimation("disappear");
	}

	handleAnimation(name) {
		cancelAnimationFrame(this.animation);
		this.animation = this.animate(name);
	}

	init() {
		const rect = this.getBoundingClientRect();
		const width = Math.floor(rect.width);
		const height = Math.floor(rect.height);

		this.pixels = [];
		this.canvas.width = width;
		this.canvas.height = height;
		this.canvas.style.width = `${width}px`;
		this.canvas.style.height = `${height}px`;
		this.createPixels();
	}

	getDistanceToCanvasCenter(x, y) {
		const dx = x - this.canvas.width / 2;
		const dy = y - this.canvas.height / 2;
		const distance = Math.sqrt(dx * dx + dy * dy);

		return distance;
	}

	createPixels() {
		for (let x = 0; x < this.canvas.width; x += this.gap) {
		for (let y = 0; y < this.canvas.height; y += this.gap) {
			const color = this.colors[
			Math.floor(Math.random() * this.colors.length)
			];
			const delay = this.reducedMotion
			? 0
			: this.getDistanceToCanvasCenter(x, y);

			this.pixels.push(
			new Pixel(this.canvas, this.ctx, x, y, color, this.speed, delay)
			);
		}
		}
	}

	animate(fnName) {
		this.animation = requestAnimationFrame(() => this.animate(fnName));

		const timeNow = performance.now();
		const timePassed = timeNow - this.timePrevious;

		if (timePassed < this.timeInterval) return;

		this.timePrevious = timeNow - (timePassed % this.timeInterval);

		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

		for (let i = 0; i < this.pixels.length; i++) {
		this.pixels[i][fnName]();
		}

		if (this.pixels.every((pixel) => pixel.isIdle)) {
		cancelAnimationFrame(this.animation);
		}
	}
}
  
PixelCanvas.register();

// Load All the Certificates
const sliderContainer = document.querySelector(".swiper-wrapper");
for (let i = 1; i <= 15; i++) {
	const slide = document.createElement('div');
    slide.className = 'swiper-slide tranding-slide';
    slide.innerHTML = `
      <div class="tranding-slide-img">
        <img src="assets/img/certs/cert${i}.jpg" alt="Tranding">
      </div>
    `;
    sliderContainer.appendChild(slide);
};

var TrandingSlider = new Swiper('.tranding-slider', {
	effect: 'coverflow',
	grabCursor: true,
	centeredSlides: true,
	loop: true,
	slidesPerView: 'auto',
	coverflowEffect: {
		rotate: 0,
		stretch: 0,
		depth: 100,
		modifier: 2.5,
	},
	pagination: {
	  el: '.swiper-pagination',
	  type: 'progressbar',
	},
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	}
});

emailjs.init("MvvcWmyoAtu7ix17t");

// Get the current date and time
const now = new Date();

// Format the date and time as DD-MM-YYYY hh:mm AM/PM
// Format the date and time directly using `toLocaleString`
const formattedDateTime = now.toLocaleString('en-US', {
	month: '2-digit',
	day: '2-digit',
	year: 'numeric',
	hour: '2-digit',
	minute: '2-digit',
	hour12: true
  }).replace(',', ''); 

document.getElementById("contact-form").addEventListener("submit", function(event) {
	event.preventDefault();
	
	var params = {
		name: document.getElementById("user_name").value,
        email: document.getElementById("user_email").value,
        title: document.getElementById("title").value,
        message: document.getElementById("message").value,
		time: formattedDateTime,
	};

	emailjs.send("service_x6sqfvk", "template_07cpwhm", params)
	.then(function(response) {
		console.log("Success:", response);
		Swal.fire({
			title: "Email Sent!",
			text: "Email sent successfully! Thank you for your message.",
			icon: "success"
		}).then((result) => {
            if (result.isConfirmed) {
              // Reload the page when "OK" is clicked
              location.reload();
            }
          });
	}, function(error) {
		console.error("Error:", error);
		Swal.fire({
			title: "Email not Sent!",
			text: "Oops! Something went wrong. Please try again later.",
			icon: "error"
		});
	});
});

