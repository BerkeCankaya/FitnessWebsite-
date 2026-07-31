/*GSAP for Home Hero*/
 gsap.registerPlugin(ScrollTrigger);

const menuToggle = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector(".mobile-menu");

if (menuToggle && mobileMenu) {
  const menuIcon = menuToggle.querySelector("i");
  const menuClose = mobileMenu.querySelector(".mobile-menu-close");
  const mobileMenuLinks = mobileMenu.querySelectorAll("a");
  let savedScrollY = 0;

  const lockPageScroll = () => {
    if (window.innerWidth > 767) {
      return;
    }

    savedScrollY = window.scrollY || window.pageYOffset;
    document.documentElement.classList.add("menu-open");
    document.body.classList.add("menu-open");
    document.body.style.position = "fixed";
    document.body.style.top = `-${savedScrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";
  };

  const unlockPageScroll = () => {
    const scrollTop = Math.abs(parseInt(document.body.style.top || "0", 10)) || savedScrollY;
    document.documentElement.classList.remove("menu-open");
    document.body.classList.remove("menu-open");
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.left = "";
    document.body.style.right = "";
    document.body.style.width = "";
    window.scrollTo(0, scrollTop);
  };

  const setMenuState = (isOpen) => {
    mobileMenu.classList.toggle("open", isOpen);

    if (isOpen) {
      lockPageScroll();
    } else {
      unlockPageScroll();
    }

    menuToggle.setAttribute("aria-expanded", String(isOpen));

    if (menuIcon) {
      menuIcon.classList.toggle("fa-bars", !isOpen);
      menuIcon.classList.toggle("fa-xmark", isOpen);
    }
  };

  menuToggle.addEventListener("click", () => {
    const isOpen = !mobileMenu.classList.contains("open");
    setMenuState(isOpen);
  });

  if (menuClose) {
    menuClose.addEventListener("click", () => setMenuState(false));
  }

  window.addEventListener("resize", () => {
    if (window.innerWidth > 767 && mobileMenu.classList.contains("open")) {
      setMenuState(false);
    }
  });

  mobileMenuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      setMenuState(false);
    });
  });
}

  const isWhyUsMobile = window.matchMedia("(max-width: 1024px)").matches;

       const testimonialsSwiper = new Swiper('.testimonials-swiper', {
        slidesPerView: 3,
        spaceBetween: 40,
        loop: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        breakpoints: {
          0: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3,
             spaceBetween: 25 
           },
        },
      });

 gsap.to(".contact-cta", {
  scale: 0.9,
  borderRadius: "12px",
  marginBottom: "200px",  
  ease: "none",
  scrollTrigger: {
    trigger: ".contact-cta",
    start: "top 60%",  
    end: "bottom 20%",    
    scrub: 1,
  }
});

const contactCtaContent = gsap.timeline({
  scrollTrigger: {
    trigger: ".contact-cta",
    start: "top 70%",
    end: "bottom 20%",
    toggleActions: "play reverse play reverse",
  },
});

  /*SERVİCE SECTİON GLOWS*/
  document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    card.style.setProperty('--x', `${x}px`);
    card.style.setProperty('--y', `${y}px`);
  });
});
/*SWİPER TESTİMONİALS GLOWS*/ 
 document.querySelectorAll('.swiper-slide').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    card.style.setProperty('--x', `${x}px`);
    card.style.setProperty('--y', `${y}px`);
  });
});
  
/*LUCIDE IKONS*/
lucide.createIcons();

/*GSAP PAGE EFFECTS*/
const heroTl = gsap.timeline();
  heroTl
  .from([".hero-text-container .title",".hero-text-container h1",".hero-text-container p",".hero-btns .second",".hero-btns .first"], {
    opacity: 0,
    x: -50,
    duration: 1,
    stagger: 0.1,
    ease: "power4.out",
  })
  .from([".navbar a img",".nav-links li"], {
    opacity: 0,
    y: -50,
    duration: 1,
    stagger: 0.1,
    ease: "power4.out",
  }, "-=0.75")
  .from([".left-bar",".right-bar"], {
    opacity: 0,
    y: -50,
    duration: 1,
    stagger: 0.1,
    ease: "power4.out",
  }, "-=1");

  /*SCROLLTRİGGER*/
  document.querySelectorAll(".marquee").forEach((marquee)=> {
    gsap.from(marquee, {
      y: 100,
      opacity: 0,
      duration: 1,
      ease: "power4.out",
      scrollTrigger: {
        trigger: marquee,
        start: "top 100%",
        toggleActions: "play none none none",
      },
    });
  });

  document.querySelectorAll(".common-title").forEach((commonTitle) => {
  const commonh2 = commonTitle.querySelector("h2");
  const sectionTitle = commonTitle.querySelector(".section-title");

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: commonTitle,
      start: "top 75%",
      toggleActions: "play none none none",
      },
  });

  tl.from(commonh2, {
    x: -100,
    opacity: 0,
    duration: 1,
    ease: "power4.out",
  })
  .from(sectionTitle, {
    x: 100,
    opacity: 0,
    duration: 1,
    ease: "power4.out",
  }, "-=0.9")
});

function animateCardRows(containerSelector, cardSelector, triggerId) {
  ScrollTrigger.getAll().forEach(trigger => {
    if (trigger.vars.id === triggerId) {
      trigger.kill();
    }
  });

  document.querySelectorAll(containerSelector).forEach(container => {
    const cards = [...container.querySelectorAll(cardSelector)];

    const rows = [];
    let currentRow = [];
    let currentTop = null;

    cards.forEach(card => {
      const top = Math.round(card.offsetTop);

      if (currentTop === null || top === currentTop) {
        currentRow.push(card);
        currentTop = top;
      } else {
        rows.push(currentRow);
        currentRow = [card];
        currentTop = top;
      }
    });

    if (currentRow.length) rows.push(currentRow);

    rows.forEach(row => {
      gsap.from(row, {
        y: 100,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "power4.out",
        clearProps: "transform,opacity",
        scrollTrigger: {
          id: triggerId,
          trigger: row[0],
          start: "top 85%",
          toggleActions: "play none none none",
        }
      });
    });
  });
}
animateCardRows(".services-cards", ".card", "services-row");
animateCardRows(".twu-cards", ".twu-card", "twu-row");

gsap.from(".twu-image", {
  y: 100,
  opacity: 0,
  duration: 0.8,
  ease: "power4.out",
  clearProps: "transform,opacity",
  scrollTrigger: {
    trigger: ".twu-image",
    start: "top 85%",
    toggleActions: "play none none none",
  }
});

gsap.from(".training-image", {
  y: 100,
  opacity: 0,
  duration: 1,
  ease: "power4.out",
  clearProps: "transform,opacity",
  scrollTrigger: {
    trigger: ".training-image",
    start: "top 70%",
    toggleActions: "play none none none",
  }
});
gsap.from([".video-title h3",".video-title a "],{
  y: 100,
  opacity: 0,
  duration: 1,
  ease: "power4.out",
  stagger: 0.1,
  clearProps: "transform,opacity",
  scrollTrigger: {
    trigger: ".video-title",
    start: "top 80%",
    toggleActions: "play none none none",
  }
});

animateCardRows(".training-cards", ".training-card", "training-row");
animateCardRows(".trainers-cards", ".trainer-card", "trainer-row");

gsap.from(".galery-image", {
  x: -100,
  opacity: 0,
  duration: 1,
  ease: "power4.out",
  clearProps: "transform,opacity",
  scrollTrigger: {
    trigger: ".galery-image",
    start: "top 80%",
    toggleActions: "play none none none",
  }
}); 
animateCardRows(".galery-cards", ".galery-card", "galery-row");

  gsap.from(".galery-btn", {
    y: 100,
    opacity: 0,
    duration: 1,
    ease: "power4.out",
    clearProps: "transform,opacity",
    scrollTrigger: {
      trigger: ".galery-btn",
      start: "top 80%",
      toggleActions: "play none none none",
    }
  });

    gsap.from(".common-title .nav-buttons", {
    y: 100,
    opacity: 0,
    duration: 1,
    ease: "power4.out",
    clearProps: "transform,opacity",
    scrollTrigger: {
      trigger: ".common-title",
      start: "top 80%",
      toggleActions: "play none none none",
    }
  });

  
  document.querySelectorAll(".testimonials-common-title").forEach((testiCommonTitle) => {
  const commonh2 = testiCommonTitle.querySelector("h2");
  const sectionTitle = testiCommonTitle.querySelector(".section-title");

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: testiCommonTitle,
      start: "top 10%",
      toggleActions: "play none none none",
      },
  });

  tl.from(commonh2, {
    x: -100,
    opacity: 0,
    duration: 1,
    ease: "power4.out",
  })
  .from(sectionTitle, {
    x: 100,
    opacity: 0,
    duration: 1,
    ease: "power4.out",
  }, "-=0.9")
});
gsap.from(".nav-buttons .nav-btn", {
  y: 100,
  opacity: 0,
  duration: 1,
  stagger: 0.1,
  ease: "power4.out",
  clearProps: "transform,opacity",
  scrollTrigger: {
    trigger: ".testimonials-common-title",
    start: "top 90%",
    toggleActions: "play none none none",
  }
});
animateCardRows(".swiper-wrapper", ".swiper-slide", "swiper-row");

gsap.from(".contact-cta", {
  y: 100,
  opacity: 0,
  duration: 1,
  ease: "power4.out",
  clearProps: "transform,opacity",
  scrollTrigger: {
    trigger: ".contact-cta",
    start: "top 90%",
    toggleActions: "play none none none",
  }
});
gsap.from([".contact-text h3",".contact-text p",".contact-text a"], {
  y: 100,
  opacity: 0,
  duration: 1,
  ease: "power4.out",
  stagger: 0.1,
  clearProps: "transform,opacity",
  scrollTrigger: {
    trigger: ".contact-text",
    start: "top 80%",
    toggleActions: "play none none none",
  }
});
animateCardRows(".top-footer", ".footer-card", "footer-row");

gsap.from(".bottom-footer span", {
  x: -100,
  opacity: 0,
  duration: 1,
  ease: "power4.out",
  clearProps: "transform,opacity",
  scrollTrigger: {
    trigger: ".bottom-footer",
    start: "top 90%",
    toggleActions: "play none none none",
  }
})
gsap.from(".bottom-footer .legal", {
  x: 100,
  opacity: 0,
  duration: 1,
  ease: "power4.out",
  clearProps: "transform,opacity",
    scrollTrigger: {
    trigger: ".bottom-footer",
    start: "top 90%",
    toggleActions: "play none none none",
  }
});

/*SCROLL TO TOP*/
const scrollToTopBtn = document.querySelector('.scroll-to-top');

if (scrollToTopBtn) {
  const toggleScrollToTopButton = () => {
    const shouldShow = window.scrollY >= window.innerHeight;
    scrollToTopBtn.classList.toggle('active', shouldShow);
  };

  const smoothScrollToTop = () => {
    const startPosition = window.pageYOffset;
    const duration = 700;
    const startTime = performance.now();

    const easeOutCubic = (progress) => 1 - Math.pow(1 - progress, 3);

    const step = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const nextPosition = startPosition * (1 - easeOutCubic(progress));

      window.scrollTo(0, nextPosition);

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  };

  scrollToTopBtn.addEventListener('click', () => {
    smoothScrollToTop();
  });

  window.addEventListener('scroll', toggleScrollToTopButton, { passive: true });
  toggleScrollToTopButton();
}

