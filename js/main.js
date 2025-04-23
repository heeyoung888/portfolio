window.addEventListener('DOMContentLoaded', () => {
// === 얼굴 SVG 드로잉 ===
const svgEl = document.getElementById('face');
const finalImg = document.querySelector('.face_img');

const observer2 = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      svgEl.classList.add('draw');

      setTimeout(() => {
        finalImg.classList.add('show'); // 이미지 등장
        svgEl.style.opacity = '0';      // SVG 사라짐
      }, 4000); // fill + draw 끝나는 타이밍 딱 맞게 (조절 가능)

      observer2.unobserve(entry.target);
    }
  });
}, { threshold: 0.6 });

observer2.observe(document.querySelector('.main_visual'));

//스크롤
gsap.registerPlugin(ScrollTrigger);

gsap.utils.toArray('.main_visual .fade_up').forEach((elem) => {
  gsap.to(elem, {
    opacity: 0,
    y: -150,
    scale: 1.05,
    rotate: -2,
    ease: "power1.out",
    scrollTrigger: {
      trigger: '.main_visual',
      start: 'top top',
      end: 'bottom top',
      scrub: true,
    }
  });
});


  //프로필 타이틀 이미지 변환
  const imageList = [
    "./img/title1.png",
    "./img/title2.png",
    "./img/title3.png",
    "./img/title4.png"
  ];

  const titleImg = document.querySelector(".title-animation img");
  let current = 0;

  setInterval(() => {
    current = (current + 1) % imageList.length;
    titleImg.src = imageList[current];
  }, 500); // 속도조절

  // === 프로필 타이핑 ===
  const typingText = document.querySelector('.typing_txt');
  const cursor = typingText.querySelector('.cursor');
  const textToType = `personality : 
  꾸준함, 자기반성적
  education :
  피그마, css, html 수료
  philosophy :
  명확, 명료(포인트)`;

  let isTyping = false;

  function startTyping() {
    if (isTyping) return;
    isTyping = true;

    typingText.innerHTML = '<span class="cursor"></span>'; 
    const newCursor = typingText.querySelector('.cursor');

    let currentChar = 0;
    const typingInter = setInterval(() => {
      if (currentChar < textToType.length) {
        const char = textToType[currentChar];
        if (char === '\n') {
          newCursor.insertAdjacentHTML('beforebegin', '<br>');
        } else {
          newCursor.insertAdjacentText('beforebegin', char);
        }
        currentChar++;
      } else {
        clearInterval(typingInter);
        newCursor.style.display = 'none';
        isTyping = false;
      }
    }, 80);
  }

  const observer1 = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        startTyping();
        observer1.unobserve(entry.target); 
      }
    });
  }, { threshold: 0.4 });

  observer1.observe(document.querySelector('.profile'));

  gsap.registerPlugin(ScrollTrigger);

  gsap.fromTo(
    ".profile .con ul li",
    {
      y: 80,
      opacity: 0
    },
    {
      y: 0,
      opacity: 1,
      ease: "back.out(1.7)",
      stagger: 0.15,
      scrollTrigger: {
        trigger: ".profile",
        start: "top 50%",
        end: "bottom 90%",
        toggleActions: "play reverse play reverse"
      }
    }
  );
  
  // === Contact 흩어진 요소들 모으기 ===
  const listItems = document.querySelectorAll('.contact .con ul li');
  const parentUl = document.querySelector('.contact .con ul');
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;
  let triggered = false;

  listItems.forEach((li, index) => {
    const rect = li.getBoundingClientRect();
    const itemX = rect.left + rect.width / 2;
    const itemY = rect.top + rect.height / 2;
    const dx = itemX - centerX;
    const dy = itemY - centerY;
    const multiplier = 1.5;
    const offsetX = dx * multiplier;
    const offsetY = dy * multiplier;
    const delay = index * 80;
    li.style.setProperty('--x', `${offsetX}px`);
    li.style.setProperty('--y', `${offsetY}px`);
    li.style.setProperty('--delay', `${delay}ms`);
  });

  function onScrollTrigger() {
    const sectionTop = $('.contact').offset().top;
    const st = window.scrollY;
    if (sectionTop <= st && !triggered) {
      parentUl.classList.add('active');
      triggered = true;
    }
  }

  window.addEventListener('scroll', onScrollTrigger);
  

  // === Swiper 슬라이드 ===
  const swiper = new Swiper(".swiper_mySwiper", {
    loop: false,
    autoplay: false,
    slidesPerView: 3,
    spaceBetween: 20,
    grabCursor: false,
    simulateTouch: true,
    touchRatio: 1,
  
    on: {
      init: function () {
        updateScrollThumb(this);
      },
      slideChangeTransitionEnd: function () {
        updateScrollThumb(this);
      }
    }
  });
  
  function updateScrollThumb(swiper) {
  const thumb = document.querySelector('.scroll-thumb');
  const wrapper = swiper.wrapperEl;
  const container = swiper.el;

  const wrapperWidth = wrapper.scrollWidth;
  const containerWidth = container.clientWidth;

  const maxScroll = wrapperWidth - containerWidth;
  const currentScroll = Math.abs(swiper.getTranslate ? swiper.getTranslate() : swiper.translate);

  const ratio = maxScroll > 0 ? currentScroll / maxScroll : 0;

  const thumbWidthPercent = (containerWidth / wrapperWidth) * 100;
  const maxTranslate = 100 - thumbWidthPercent;
  const translateX = Math.min(ratio * maxTranslate, maxTranslate);

  thumb.style.width = `${thumbWidthPercent}%`;
  thumb.style.transform = `translateX(${translateX}%)`;
}
  
  // 모든 이미지가 로드되었는지 확인하는 헬퍼 함수
function imagesLoaded(container, callback) {
  const images = container.querySelectorAll('img');
  let loadedCount = 0;
  const total = images.length;

  images.forEach(img => {
    if (img.complete) {
      loadedCount++;
      if (loadedCount === total) callback();
    } else {
      img.addEventListener('load', () => {
        loadedCount++;
        if (loadedCount === total) callback();
      });
    }
  });
}

// 이미지 로딩 완료 후 Swiper 실행
imagesLoaded(document.querySelector('.swiper_mySwiper'), () => {
  const swiper = new Swiper(".swiper_mySwiper", {
    loop: false,
    autoplay: false,
    slidesPerView: 3,
    spaceBetween: 20,
    grabCursor: false,
    simulateTouch: true,
    touchRatio: 1,

    on: {
      init: function () {
        updateScrollThumb(this);
      },
      slideChangeTransitionEnd: function () {
        updateScrollThumb(this);
      }
    }
  });

  function updateScrollThumb(swiper) {
    const thumb = document.querySelector('.scroll-thumb');
    const wrapper = swiper.wrapperEl;
    const container = swiper.el;

    const wrapperWidth = wrapper.scrollWidth;
    const containerWidth = container.clientWidth;

    const maxScroll = wrapperWidth - containerWidth;
    const currentScroll = Math.abs(swiper.translate);

    const ratio = maxScroll > 0 ? currentScroll / maxScroll : 0;

    const thumbWidthPercent = (containerWidth / wrapperWidth) * 100;
    const maxTranslate = 100 - thumbWidthPercent;
    const translateX = ratio * maxTranslate;

    thumb.style.width = `${thumbWidthPercent}%`;
    thumb.style.transform = `translateX(${translateX}%)`;
  }
});


  // === 돋보기 확대 효과 ===
  const skillsSection = document.querySelector('.skills');
  const magnifier = document.createElement('div');
  magnifier.classList.add('magnifier');
  document.body.appendChild(magnifier);

  const zoomed = document.createElement('div');
  zoomed.classList.add('zoomed-content');
  zoomed.innerHTML = skillsSection.innerHTML;
  magnifier.appendChild(zoomed);

  zoomed.style.position = 'absolute';
  zoomed.style.top = '0';
  zoomed.style.left = '0';
  zoomed.style.width = `${skillsSection.offsetWidth}px`;
  zoomed.style.transformOrigin = 'top left';


  skillsSection.addEventListener('mousemove', (e) => {
    const rect = skillsSection.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;

    magnifier.style.display = 'block';
    magnifier.style.left = `${e.pageX - 70}px`;
    magnifier.style.top = `${e.pageY + 75}px`; // 조정된 위치

    zoomed.style.transform = `scale(2) translate(${-offsetX + 75}px, ${-offsetY + 75}px)`;
  });

  skillsSection.addEventListener('mouseleave', () => {
    magnifier.style.display = 'none';
  });


});