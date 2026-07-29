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

ScrollTrigger.config({
  ignoreMobileResize: true,
});

ScrollTrigger.addEventListener("refresh", () => {
  document.documentElement.style.overflowX = "hidden";
});

ScrollTrigger.refresh();

  const heroTitle = document.querySelector(".hero-text-container h1");
  const heroChars = [];
  let isLineStart = true;

  const splitNodeToChars = (node, target, isAccent = false) => {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent || "";
      for (const ch of text) {
        if (ch === "\n" || ch === "\r" || ch === "\t") {
          isLineStart = true;
          continue;
        }

        if (ch === " " && isLineStart) {
          continue;
        }

        const charEl = document.createElement("span");
        charEl.className = "hero-char";
        if (!isAccent) {
          charEl.style.background = "none";
          charEl.style.color = "inherit";
          charEl.style.webkitTextFillColor = "currentcolor";
          charEl.style.textShadow = "none";
        }
        charEl.textContent = ch === " " ? "\xa0" : ch;
        target.appendChild(charEl);
        heroChars.push(charEl);
        isLineStart = false;
      }
      return;
    }

    if (node.nodeType !== Node.ELEMENT_NODE) {
      return;
    }

    if (node.tagName === "BR") {
      target.appendChild(document.createElement("br"));
      isLineStart = true;
      return;
    }

    const clone = node.cloneNode(false);
    const childIsAccent = isAccent || node.tagName === "SPAN";
    const children = Array.from(node.childNodes);
    for (const child of children) {
      splitNodeToChars(child, clone, childIsAccent);
    }
    target.appendChild(clone);
  };

  if (heroTitle) {
    const fragment = document.createDocumentFragment();
    const children = Array.from(heroTitle.childNodes);
    for (const child of children) {
      splitNodeToChars(child, fragment, false);
    }
    heroTitle.innerHTML = "";
    heroTitle.appendChild(fragment);

    gsap.set(".hero-char", { display: "inline-block" });
  }

   const tl = gsap.timeline({});

  tl.from(".hero", {
      x: "25%",
      opacity: 0,
      duration: 1.5,
    })
    .from(".hero-text-container .title", {
      x: "-100",
      opacity: 0,
      duration: 0.75,
    },"-=1")
    .from(heroChars, {
      y: 45,
      opacity: 0,
      duration: 0.6,
      stagger: 0.03,
      ease: "power4.out",
    }, "-=0.2")
    .from(".hero-text-container p", {
      x: "-20%",
      opacity: 0,
      duration: 0.75,
    },"-=0.35")
    .from(".hero-text-container .hero-btns a", {
      x: "-20%",
      opacity: 0,
      duration: 0.75,
      stagger: 0.2,
    },"-=0.35")
    .from(".header", {
      y: "-50%",
      opacity: 0,
      duration: 0.7,
    }, "-=0.5");

  // Marquee section için scroll-triggered animasyon
  gsap.from(".marquee-container", {
    y: "100px",       
    opacity: 0,
    duration: 1,
    ease: "power4.out",
    scrollTrigger: {
      trigger: ".marquee-container",
      start: "top 95%",
      toggleActions: "play reverse play reverse",
    }
  });
  
  const servicesTl = gsap.timeline({
    scrollTrigger: {
      trigger: ".services",
      start: "top 75%",
      end: "bottom 15%",
      toggleActions: "play reverse play reverse",
    },
  });
  servicesTl
    .from(".services-title h2", {
      x: -100,
      opacity: 0,
      duration: 1.5,
      ease: "power4.out",
    })
    .from(
      ".services-title .section-title",
      {
        x: 100,
        opacity: 0,
        duration: 0.75,
        ease: "power4.out",
      },
      "-=1")
    .from(
      ".services-cards .card",
      {
        y: 100,
        opacity: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: "power4.out",
        clearProps: "transform,opacity",
      },
      "-=1"
    );

     const whyUsTl = gsap.timeline({
    scrollTrigger: {
      trigger: ".why-us",
      start: "top 75%",
      end: "bottom 15%",
      toggleActions: "play reverse play reverse",
    },
  });

  const isWhyUsMobile = window.matchMedia("(max-width: 1024px)").matches;

  whyUsTl
    .from(".why-us .common-title h2", {
      x: -100,
      opacity: 0,
      duration: 1.5,
      ease: "power4.out",
    })
    .from(
      ".why-us .common-title .section-title",
      {
        x: 100,
        opacity: 0,
        duration: 0.75,
        ease: "power4.out",
      },
      "-=1");

  if (isWhyUsMobile) {
    whyUsTl
      .from(".why-us .twu-cards .twu-card", {
        x: -100,
        opacity: 0,
        duration: 0.7,
        stagger: 0.25,
        ease: "power4.out",
        clearProps: "transform,opacity",
      }, "-=0.5")
      .from(".why-us .twu-image", {
        x: 100,
        opacity: 0,
        duration: 0.7,
      }, "-=0.15");
  } else {
    whyUsTl
      .from(".why-us .twu-image", {
        x: 100,
        opacity: 0,
        duration: 0.7,
      }, ">")
      .from(".why-us .twu-cards .twu-card", {
        x: -100,
        opacity: 0,
        duration: 0.7,
        stagger: 0.25,
        ease: "power4.out",
        clearProps: "transform,opacity",
      }, "-=0.75");
  }

       const trainingTl = gsap.timeline({
        scrollTrigger: {
        trigger: ".training",
        start: "top 75%",
        end: "bottom 50%",
        toggleActions: "play reverse play reverse",
        },
      });
      trainingTl
      .from(".training .common-title h2", {
        x: -100,
        opacity: 0,
        duration: 0.75,
        ease: "power4.out",
      })
      .from(".training .common-title .section-title",{
        x: 100,
        opacity: 0,
        duration: 0.75,
        ease: "power4.out",
      },"-=0.25")
      .from(".training .training-image", {
        y: 100,
        opacity: 0,
        duration: 0.7,
      })
      .from(".training .video-title h3,.training .video-title a", {
        y: 100,
        opacity: 0,
        duration: 0.7,
        stagger: 0.25,
      })
      .from(".training .training-cards .training-card", {
        y: 100,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: "power4.out",
        clearProps: "transform,opacity",
      },"-=0.75");

      const trainersTl = gsap.timeline({
        scrollTrigger: {
        trigger: ".trainers",
        start: "top 75%",
        end: "bottom 15%",
        toggleActions: "play reverse play reverse",
        },
      });
      trainersTl
      .from(".trainers .common-title h2", {
        x: -100,
        opacity: 0,
        duration: 0.75,
        ease: "power4.out",
      })
      .from(".trainers .common-title .section-title",{
        x: 100,
        opacity: 0,
        duration: 0.75,
        ease: "power4.out",
      },"-=0.25")
      .from(".trainers .trainers-cards .trainer-card", {
        y: 100,
        opacity: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: "power4.out",
        clearProps: "transform,opacity",
      },"-=0.75");

      const galery = gsap.timeline({
      scrollTrigger: {
      trigger: ".galery",
      start: "top 75%",
      end: "bottom 15%",
      toggleActions: "play reverse play reverse",
    },
  });
  galery
    .from(".galery .common-title h2", {
      x: -100,
      opacity: 0,
      duration: 1.5,
      ease: "power4.out",
    })
    .from(
      ".galery .common-title .section-title",
      {
        x: 100,
        opacity: 0,
        duration: 0.75,
        ease: "power4.out",
      },
      "-=1")
      .from(".galery .galery-image", {
        x: -100,
        opacity: 0,
        duration: 0.7,
      },"-=0.5")
      .from(".galery .galery-cards .galery-card", {
        x: 100,
        opacity: 0,
        duration: 0.7,
        stagger: 0.20,
        ease: "power4.out",
        clearProps: "transform,opacity",
      },"-=0.75")
      .from(".galery-btn .allGalery-btn", {
        x: 100,
        opacity: 0,
        duration: 0.7,
      },"-=0.10");

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

       const testimonials = gsap.timeline({
      scrollTrigger: {
      trigger: ".testimonials",
      start: "top 70%",
      end: "bottom 15%",
      toggleActions: "play reverse play reverse",
    },
  });
  testimonials
    .from(".testimonials .common-title h2", {
      x: -100,
      opacity: 0,
      duration: 1.5,
      ease: "power4.out",
    })
    .from(
      ".testimonials .title-right .section-title",
      {
        x: 100,
        opacity: 0,
        duration: 0.75,
        ease: "power4.out",
      },
      "-=1")
    .from(
      ".testimonials .title-right .nav-buttons",
      {
        x: 100,
        opacity: 0,
        duration: 0.75,
        ease: "power4.out",
      },
      "<"
    )
    .from(
      ".testimonials .testimonials-swiper .swiper-slide",
      {
        y: 100,
        opacity: 0,
        duration: 0.7,
        stagger: 0.2,
        ease: "power4.out",
        clearProps: "transform,opacity",
      },
      "-=0.5"
    )
    .from(
      ".testimonials .testimonials-pagination .swiper-pagination-bullet",
      {
        y: 25,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: "power4.out",
        clearProps: "transform,opacity",
      },
      "<"
    );
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

contactCtaContent
.from(".contact-cta .section-title", {
      y: 100,
      opacity: 0,
      duration: 0.75,
      ease: "power4.out",
  })
  .from(".contact-cta .contact-text h3", {
    y: 100,
    opacity: 0,
    duration: 0.7,
    ease: "power4.out",
  })
  .from(
    ".contact-cta .contact-text p",
    {
      y: 100,
      opacity: 0,
      duration: 0.7,
      ease: "power4.out",
    },
    "-=0.35"
  )
  .from(
    ".contact-cta .contact-text a",
    {
      y: 100,
      opacity: 0,
      duration: 0.7,
      ease: "power4.out",
    },
    "-=0.35"
  );
  const footerTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: ".footer",
      start: "top 80%",
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

