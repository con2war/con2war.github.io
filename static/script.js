let popUp = document.getElementById("cookiePopup");
//When user clicks the accept button
document.getElementById("acceptCookie").addEventListener("click", () => {
    //Create date object
    let d = new Date();
    //Increment the current time by 1 minute (cookie will expire after 1 minute)
    d.setMinutes(2 + d.getMinutes());
    //Create Cookie withname = myCookieName, value = thisIsMyCookie and expiry time=1 minute
    document.cookie = "myCookieName=thisIsMyCookie; expires = " + d + ";";
    //Hide the popup
    popUp.classList.add("hide");
    popUp.classList.remove("show");
});

//Check if cookie is already present
const checkCookie = () => {
    //Read the cookie and split on "="
    let input = document.cookie.split("=");
    //Check for our cookie
    if (input[0] == "myCookieName") {
        //Hide the popup
        popUp.classList.add("hide");
        popUp.classList.remove("show");
    } else {
        //Show the popup
        popUp.classList.add("show");
        popUp.classList.remove("hide");
    }
};
//Check if cookie exists when page loads
window.onload = () => {
    setTimeout(() => {
        checkCookie();
    }, 2000);
};

const buttons = document.querySelectorAll("[data-carousel-button]")

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const offset = button.dataset.carouselButton === "next" ? 1 : -1
        const slides = button
            .closest("[data-carousel]")
            .querySelector("[data-slides]")

        const activeSlide = slides.querySelector("[data-active]")
        let newIndex = [...slides.children].indexOf(activeSlide) + offset
        if (newIndex < 0) newIndex = slides.children.length - 1
        if (newIndex >= slides.children.length) newIndex = 0

        slides.children[newIndex].dataset.active = true
        delete activeSlide.dataset.active
    })
})

const swiper = new Swiper(".heroslider", {
    spaceBetween: 30,
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
    effect: "fade",
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.2
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('navbar-scrolled');
    } else {
        navbar.classList.remove('navbar-scrolled');
    }
});

// Reviews Carousel
class ReviewsCarousel {
    constructor() {
        this.track = document.querySelector('.reviews-track');
        this.cards = document.querySelectorAll('.review-card');
        this.prevBtn = document.querySelector('.prev-btn');
        this.nextBtn = document.querySelector('.next-btn');
        this.dotsContainer = document.querySelector('.carousel-dots');
        
        this.currentIndex = 0;
        this.cardWidth = 0;
        this.maxIndex = 0;
        
        this.init();
    }

    init() {
        // Create dots
        this.cards.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => this.goToSlide(index));
            this.dotsContainer.appendChild(dot);
        });

        // Add event listeners
        this.prevBtn.addEventListener('click', () => this.prev());
        this.nextBtn.addEventListener('click', () => this.next());
        
        // Initialize responsive behavior
        this.updateDimensions();
        window.addEventListener('resize', () => this.updateDimensions());

        // Auto play
        this.startAutoPlay();
    }

    updateDimensions() {
        this.cardWidth = this.cards[0].offsetWidth;
        const visibleCards = window.innerWidth >= 1024 ? 3 : 
                           window.innerWidth >= 768 ? 2 : 1;
        this.maxIndex = Math.max(0, this.cards.length - visibleCards);
        this.goToSlide(Math.min(this.currentIndex, this.maxIndex));
    }

    goToSlide(index) {
        this.currentIndex = index;
        const offset = -this.currentIndex * this.cardWidth;
        this.track.style.transform = `translateX(${offset}px)`;
        
        // Update dots
        document.querySelectorAll('.dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }

    prev() {
        this.goToSlide(Math.max(0, this.currentIndex - 1));
    }

    next() {
        this.goToSlide(Math.min(this.maxIndex, this.currentIndex + 1));
    }

    startAutoPlay() {
        setInterval(() => {
            if (this.currentIndex >= this.maxIndex) {
                this.goToSlide(0);
            } else {
                this.next();
            }
        }, 5000);
    }
}

// Initialize carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ReviewsCarousel();
});

// Hero Carousel
class HeroCarousel {
    constructor() {
        this.slides = document.querySelectorAll('.hero-slide');
        this.dots = document.querySelector('.hero-dots');
        this.prevBtn = document.querySelector('.hero-prev');
        this.nextBtn = document.querySelector('.hero-next');
        
        this.currentSlide = 0;
        this.interval = null;
        
        this.init();
    }

    init() {
        // Create dots
        this.slides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('hero-dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => this.goToSlide(index));
            this.dots.appendChild(dot);
        });

        // Add button listeners
        this.prevBtn.addEventListener('click', () => this.prev());
        this.nextBtn.addEventListener('click', () => this.next());

        // Start autoplay
        this.startAutoPlay();
    }

    goToSlide(index) {
        // Remove active classes
        this.slides[this.currentSlide].classList.remove('active');
        this.dots.children[this.currentSlide].classList.remove('active');
        
        // Update current slide
        this.currentSlide = index;
        
        // Add active classes
        this.slides[this.currentSlide].classList.add('active');
        this.dots.children[this.currentSlide].classList.add('active');
    }

    prev() {
        const index = this.currentSlide === 0 ? this.slides.length - 1 : this.currentSlide - 1;
        this.goToSlide(index);
    }

    next() {
        const index = this.currentSlide === this.slides.length - 1 ? 0 : this.currentSlide + 1;
        this.goToSlide(index);
    }

    startAutoPlay() {
        this.interval = setInterval(() => this.next(), 5000);
    }
}

// Initialize hero carousel
document.addEventListener('DOMContentLoaded', () => {
    new HeroCarousel();
});