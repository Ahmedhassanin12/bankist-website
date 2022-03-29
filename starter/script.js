'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
let buttonchange = document.querySelectorAll('.operations__tab');
let parantdiv = document.querySelector('.operations__tab-container');
let divconent = document.querySelectorAll('.operations__content');
let navlinks = document.querySelector('.nav__links');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
////////////////////////////////
// smothe scroll
///////////////////////////////
let btnScroll = document.querySelector('.btn--scroll-to');
let goToSection = document.getElementById('section--1');

btnScroll.addEventListener('click', function (e) {
  goToSection.scrollIntoView({ behavior: 'smooth' });
});

navlinks.addEventListener('click', function (e) {
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute(`href`);
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});
/////////////////////////////////////
// event switch between tabs
/////////////////////////////////////
parantdiv.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');

  if (!clicked) return;
  // switch between buttons
  buttonchange.forEach(tab => tab.classList.remove('operations__tab--active'));
  clicked.classList.add('operations__tab--active');
  // switch between conent
  divconent.forEach(tab => tab.classList.remove('operations__content--active'));
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

// navbar animation
let nav = document.querySelector('.nav');

const handelfun = function (e, opacity) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    //console.log(link);
    const sibilng = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    sibilng.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};
nav.addEventListener('mouseover', handelfun.bind(0.5));
nav.addEventListener('mouseout', handelfun.bind(1));
///////////////////////////////////////
// sticky nav
///////////////////////////////////////
let header = document.querySelector('.header');
let navHieght = nav.getBoundingClientRect().height;
let funStick = function (enteris) {
  let [entry] = enteris;
  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
  } else nav.classList.remove('sticky');
};
let stickyHeader = new IntersectionObserver(funStick, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHieght}px`,
});
stickyHeader.observe(header);
//////////////////////////////////
// reveal sections
//////////////////////////////////
const allSecs = document.querySelectorAll('.section');

const reverlsection = function (enteris, observer) {
  const [entry] = enteris;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionsObserver = new IntersectionObserver(reverlsection, {
  root: null,
  threshold: 0.15,
});

allSecs.forEach(function (sec) {
  sectionsObserver.observe(sec);
  sec.classList.add('section--hidden')
});
////////////////////////////////////////
// lazy loading images
////////////////////////////////////////
const allPic = document.querySelectorAll('img[data-src]');
const obserImg = function (enteris, observer) {
  const [entry] = enteris;
  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target);
};
const imgOvserver = new IntersectionObserver(obserImg, {
  root: null,
  threshold: 0,
  rootMargin: '-200px',
});
allPic.forEach(img => imgOvserver.observe(img));
///////////////////////////////
// slider
///////////////////////////////
const Slider = function () {
  // selectors
  const slides = document.querySelectorAll('.slide');
  // const slider = document.querySelector('.slider');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');
  let curentslide = 0;
  // Functions
  const createDots = function () {
    slides.forEach(function (_s, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activeDots = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));
    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  const nextSlide = function () {
    if (curentslide === slides.length - 1) {
      curentslide = 0;
    } else {
      curentslide++;
    }
    goToSlide(curentslide);
    // -100% , 0%, 100%, 200%.
    activeDots(curentslide);
  };

  const prevSlide = function () {
    if (curentslide === 0) {
      curentslide = slides.length - 1;
    } else {
      curentslide--;
    }
    goToSlide(curentslide);
    activeDots(curentslide);
  };

  const inti = function () {
    goToSlide(0);
    createDots();
    activeDots(0);
  };
  inti();
  // event handlers
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') nextSlide();
    if (e.key === 'ArrowLeft') prevSlide();
  });

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activeDots(slide);
    }
  });
};
Slider();
