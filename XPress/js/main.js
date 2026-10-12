"use strict";

window.addEventListener("load", load);

function load() {
  /* Перевірка мобільного браузера */
  const isMobile = {
    Android: function () {
      return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
      return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
      return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
      return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
      return (
        isMobile.Android() ||
        isMobile.BlackBerry() ||
        isMobile.iOS() ||
        isMobile.Opera() ||
        isMobile.Windows()
      );
    },
  };
  /* Додавання класу touch для HTML, якщо браузер мобільний */
  function addTouchAttr() {
    // Додавання data-fls-touch для HTML, якщо браузер мобільний
    if (isMobile.any())
      document.documentElement.setAttribute("data-fls-touch", "");
  }

  function initFooter() {
    const matchMedia = window.matchMedia(`(width <= 31.25rem)`);
    matchMedia.addEventListener(`change`, initFooter);
    initFooter();
    function initFooter() {
      const footerListItems = document.querySelectorAll(`.footer__list`);
      if (matchMedia.matches) {
        footerListItems.forEach((item) => {
          item.style.height = `0px`;
        });
      } else {
        footerListItems.forEach((item) => {
          item.style.height = `auto`;
        });
      }
    }
  }

  function initHeader() {
    window.addEventListener(`scroll`, function (e) {
      const headerElement = document.querySelector(`.header`);
      if (scrollY > 1) {
        headerElement.querySelectorAll(`.header__link`).forEach(link => {
          link.classList.add(`link-black`)
        })
        headerElement.style.backdropFilter = `blur(5px)`;
        if (window.innerWidth > 582) {
          headerElement.querySelector(`.header__container`).style.transform =
            `translate(0, 0)`;
          headerElement
            .querySelector(`.header__container`)
            .querySelectorAll(`.header__link`)
            .forEach((item) => {
              item.style.color = `#000`;
            });
        } else {
          headerElement.querySelector(`.header__container`).style.transform =
            ``;
        }
      } else {
        headerElement.style.backdropFilter = ``;
        headerElement.querySelector(`.header__container`).style.transform = ``;
        headerElement
          .querySelector(`.header__container`)
          .querySelectorAll(`.header__link`)
          .forEach((item) => {
            item.style.color = ``;
          });
      }
    });
  }

  initHeader();
  initFooter();
  initLink();
  initSwiper();
  initGallery()
  initCards()
  initPreloader()

  function initPreloader() {
    const preloaderBakgroundElement = document.querySelectorAll(`.preloader__background-part`)
    if(preloaderBakgroundElement) {
      setTimeout(() => {
        preloaderBakgroundElement.forEach(item => {
          item.style.cssText = `animation-name: toHide;`
        })
      },1000)
      document.addEventListener(`preloaderClose`, () => {
      initObserver()
    })
    }
  }

  function initCards() {
    const parentElement = document.querySelector(`.our-speciality__list`);
    const cardsElements = parentElement.querySelectorAll(`.cards-speciality__item`);
    if(parentElement && cardsElements.length) {
      cardsElements.forEach((item, index) => {
        item.style.animationDelay = `${0.6 * index}s`
      })
    }
  }
  function initLink() {
    const matchMedia = window.matchMedia(`(width < 62rem)`);
    matchMedia.addEventListener(`change`, setLink);
    setLink();
    function setLink() {
      const firstElement = document.querySelector(`#first-span`);
      const secondElement = document.querySelector(`#second-link`);
      if (matchMedia.matches) {
        secondElement.insertAdjacentText(
          `afterbegin`,
          firstElement.textContent,
        );
        firstElement.style.display = `none`;
        firstElement.style.position = `absolute`;
        secondElement.style.display = `inline-block`;
        secondElement.style.position = `relative`;
      } else {
        secondElement.textContent = ``;
        secondElement.style.display = `none`;
        firstElement.style.display = `inline-block`;
        firstElement.style.position = `relative`;
      }
    }
  }
  document.addEventListener(`click`, documnetActions);
  function documnetActions(e) {
    const targetElement = e.target;
    const targetType = e.type;
    if (targetType == "click") {
      if (targetElement.closest(`.header__burger`)) {
        const buttonElement = targetElement.closest(`.header__burger`);
        document.documentElement.toggleAttribute(`data-open-burger`);
      }
    }

    if (targetElement.closest(`.footer__title`)) {
      const currentTitleElement = targetElement.closest(`.footer__title`);
      const ulElement = currentTitleElement.nextElementSibling;
      if (window.innerWidth <= 500) {
        currentTitleElement.toggleAttribute(`data-footer-open`);
        const activeTitle = document.querySelector(`[data-footer-open]`);
        if (activeTitle && activeTitle != currentTitleElement) {
          closeFooter();
        }
        function closeFooter() {
          activeTitle.removeAttribute(`data-footer-open`);
          activeTitle.nextElementSibling.style.height = `0px`;
        }
        if (currentTitleElement.hasAttribute(`data-footer-open`)) {
          ulElement.style.cssText = ``;
          const ulElementHeight = ulElement.offsetHeight;
          ulElement.style.height = `0px`;
          ulElement.offsetHeight;
          ulElement.style.height = `${ulElementHeight}px`;
        } else {
          const ulElementHeight = ulElement.offsetHeight;
          ulElement.offsetHeight;
          ulElement.style.height = `0px`;
        }
      }
    }
  }


  function paralaxAffect() {
    const heroElement = document.querySelector(`.hero`);
    const picElement = document.querySelector(`.hero__picture`);
    if (picElement) {
      const speed = 0.0005;
      const divisor = 40;
      let Ymove = 0,
        Xmove = 0;
      let YInProcentMove = 0,
        XInProcentMove = 0;
      function setParalax() {
        let distrY = YInProcentMove - Ymove;
        let distrX = XInProcentMove - Xmove;
        Ymove = Ymove + distrY * speed;
        Xmove = Xmove + distrX * speed;
        requestAnimationFrame(setParalax);
        picElement.style.cssText = `transform: translate(${XInProcentMove / divisor}%, ${YInProcentMove / divisor}%);`;
        // alert(YInProcentMove)
      }
      setParalax();
      heroElement.addEventListener(`mousemove`, function (e) {
        const moveForY = heroElement.offsetHeight / 2 - e.pageY;
        const moveForX = e.pageX - heroElement.offsetWidth / 2;
        YInProcentMove = (moveForY / heroElement.offsetHeight) * 100;
        XInProcentMove = (moveForX / heroElement.offsetWidth) * 100;
        // alert(YInProcentMove)
      });
    }
  }
  paralaxAffect();
  function initGallery() {
    const galleryElement = document.querySelector(`.page__arrival`);
    const itemsGallery = document.querySelectorAll(`.arrival-gallery__item`);
    document.addEventListener(`scroll`, function (e) { 
      if(galleryElement) {
      if(galleryElement.hasAttribute(`data-run-animation`)) {
        for(let i = 0; i <= itemsGallery.length -1; i++) {
          setTimeout(() => {
            itemsGallery[i].classList.add(`rotate`)
          }, 100 * i)
        }
      } else if(!galleryElement.hasAttribute(`data-run-animation`)) {
        for(let i = 0; i <= itemsGallery.length - 1; i++) {
          setTimeout(() => {
            itemsGallery[i].classList.remove(`rotate`)
          }, 100 * i)
        }
      }
    }
    })

  }
  function initObserver () {
    const options = { 
      threshold : 0.3,
    }
    const callBack = ((entries, observer) => {
      entries.forEach(entry => {
        const {target, isIntersecting} = entry
        if(isIntersecting) {
          target.setAttribute(`data-run-animation`, ``);
        } else if (target.hasAttribute(`data-run-animation`)){
          target.removeAttribute(`data-run-animation`);
        }
      }) 
    })
    const mainObserver = new IntersectionObserver(callBack, options)
    document.querySelectorAll(`.page > *`).forEach(item => {
      mainObserver.observe(item)
    })
  }
  function initSwiper() {
    const swiperElement = document.querySelector(`.gallery-sub__swiper`);
    const sellingSwiperElement = document.querySelector(`.selling-top__swiper`);
    if (swiperElement) {
      const subSwiper = new Swiper(swiperElement, {
        // Optional parameters
        direction: "horizontal",
        initialSlide: 1,
        slidesPerView: 3,
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: "auto",
        // If we need pagination
        pagination: {
          el: ".gallery-sub__pagination",
          clickable: true,
        }, 
      });
    }
    if (sellingSwiperElement) {
      const sellingSwiper = new Swiper(sellingSwiperElement, {
        centerInsufficientSlides: true,
        slidesPerView: 3.29,
        initialSlide: 2,
        spaceBetween: -50,
        centeredSlides: true,
        autoHeight: true,
        centerInsufficientSlides: true,
        pagination: {
        el: ".selling-top__slide-pagination",
        clickable: true,
        },
        // loop: true,
        effect: "coverflow",
        coverflowEffect: {
          rotate: 20,
          depth: 400,
          slideShadows: false,
        },
        breakpoints: {
          786: {
            slidesPerView: 3.29,
          },
          380: {
            slidesPerView: 2.29,
          },
          320: {
            slidesPerView: 1.29,
          },
        },
      });
    }
  }
}

