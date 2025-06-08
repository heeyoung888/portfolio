window.addEventListener('DOMContentLoaded', () => {

//main_visual

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

/* 햄버거 */
const hamburger = document.getElementById('hamburger');
const dropdownMenu = document.getElementById('dropdownMenu');
const mainNav = document.querySelector('.main_visual nav');

hamburger.addEventListener('click', () => {
  dropdownMenu.classList.toggle('active');
});

// 스크롤 감지해서 햄버거 토글
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const mainVisualHeight = document.querySelector('.main_visual').offsetHeight;

  if (scrollY > mainVisualHeight - 50) {
    hamburger.style.display = 'flex';
    mainNav.style.display = 'none';
  } else {
    hamburger.style.display = 'none';
    mainNav.style.display = 'block';
    dropdownMenu.classList.remove('active');
  }
});

// 메뉴 클릭 시 자동 닫기
document.querySelectorAll('.dropdown-menu a').forEach(link => {
  link.addEventListener('click', () => {
    dropdownMenu.classList.remove('active');
  });
});
/* 햄버거 */


//profile
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


// 타이핑으로 등장할 '한글' 텍스트만!
const texts = [
  "꾸준함, 자기반성적",
  "명확, 명료(포인트)"
];

const typingElements = [
  document.getElementById('typing1'),
  document.getElementById('typing3')
];

let isTyping = false;

function startTyping() {
  if (isTyping) return;
  isTyping = true;

  let lineIndex = 0;
  let charIndex = 0;

  function typeLine() {
    if (lineIndex >= texts.length) {
      isTyping = false;
      return;
    }

    const currentLine = texts[lineIndex];
    const currentElement = typingElements[lineIndex];

    const typingInter = setInterval(() => {
      if (charIndex < currentLine.length) {
        const char = currentLine[charIndex];
        currentElement.insertAdjacentText('beforeend', char);
        charIndex++;
      } else {
        clearInterval(typingInter);
        lineIndex++;
        charIndex = 0;
        setTimeout(typeLine, 500); // 다음 줄 타이핑 시작
      }
    }, 65);
  }

  typeLine();
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
  
  
  //skills
  // === Swiper 슬라이드 ===
  const swiper = new Swiper(".swiper_mySwiper", {
    loop: false,
    autoplay: false,
    slidesPerView: 3.5,
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
    slidesPerView: 3.5,
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


// === 돋보기 확대 효과 (li에만 적용, 성능 최적화 + 정밀 위치) ===
const swiperWrapper = document.querySelector('.skills .swiper_mySwiper .swiper-wrapper');
const skillsItems = document.querySelectorAll('.skills .swiper_mySwiper .swiper-slide');

// 확대용 콘텐츠 복사
const magnifier = document.createElement('div');
magnifier.classList.add('magnifier');
document.body.appendChild(magnifier);

const zoomed = document.createElement('div');
zoomed.classList.add('zoomed-content');
zoomed.innerHTML = swiperWrapper.outerHTML;

// 이미지 lazy 속성 추가 (성능 향상)
zoomed.querySelectorAll('img').forEach(img => {
  img.setAttribute('loading', 'lazy');
});

magnifier.appendChild(zoomed);

// 확대 콘텐츠 스타일 설정
zoomed.style.position = 'absolute';
zoomed.style.top = '0';
zoomed.style.left = '0';
zoomed.style.transformOrigin = 'top left';

// 돋보기 크기, 확대 배율
const magnifierSize = 300;
const scale = 2;
magnifier.style.width = `${magnifierSize}px`;
magnifier.style.height = `${magnifierSize}px`;

// 성능 최적화를 위한 변수
let isAnimating = false;

skillsItems.forEach((item) => {
  item.addEventListener('mouseenter', () => {
    document.body.style.cursor = 'none';
    magnifier.style.display = 'block';
  });

  item.addEventListener('mousemove', (e) => {
    if (isAnimating) return;
    isAnimating = true;

    requestAnimationFrame(() => {
      const swiperRect = swiperWrapper.getBoundingClientRect();

      const offsetX = e.clientX - swiperRect.left;
      const offsetY = e.clientY - swiperRect.top;

      // 돋보기를 마우스 위치에 정확히 위치
      magnifier.style.left = `${e.pageX}px`;
      magnifier.style.top = `${e.pageY}px`;
      magnifier.style.transform = `translate(-50%, -50%)`;

      // 확대 콘텐츠를 돋보기 안에 정확히 맞게 이동
      const translateX = -offsetX + magnifierSize / (2 * scale);
      const translateY = -offsetY + magnifierSize / (2 * scale);
      zoomed.style.transform = `scale(${scale}) translate(${translateX}px, ${translateY}px)`;

      isAnimating = false;
    });
  });

  item.addEventListener('mouseleave', () => {
    magnifier.style.display = 'none';
    document.body.style.cursor = 'default';
  });
});



// === CONTACT 인터랙션 ===
const contactSection = document.querySelector('.contact');  // 👈 반드시 필요
contactSection.classList.add('shrink');

const listItems = document.querySelectorAll('.contact .con ul li');
const parentUl = document.querySelector('.contact .con ul');
const triggerItem = listItems[4]; // 5번째 li (index 4)

// 플래시 오버레이 생성
const flashOverlay = document.createElement('div');
flashOverlay.className = 'flash-overlay';
document.body.appendChild(flashOverlay);

// 처음에는 모든 li 숨김 + 5번만 보이게
listItems.forEach((li, i) => {
  li.style.opacity = i === 4 ? '1' : '0';
  li.style.pointerEvents = i === 4 ? 'auto' : 'none';
});

// 클릭 시 플래시 터지고 전체 모션

const cameraImg = document.querySelector('.contact .inner .con ul li:nth-child(5) .camera');

triggerItem.addEventListener('click', () => {
  flashOverlay.style.opacity = '1'; //  플래시 ON

  setTimeout(() => {
    flashOverlay.style.opacity = '0'; //  플래시 OFF

    cameraImg.style.display = 'none';

    // 텍스트 박스 숨기기
    const txtBox = triggerItem.querySelector('.txt_box');
    if (txtBox) txtBox.style.display = 'none';

    listItems.forEach((li, index) => {
      li.style.opacity = '1';
      li.style.pointerEvents = 'auto';

      if (index === 4) return;

      const rect = li.getBoundingClientRect();
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const dx = rect.left + rect.width / 2 - centerX;
      const dy = rect.top + rect.height / 2 - centerY;
      const offsetX = dx * 1.5;
      const offsetY = dy * 1.5;
      const delay = index * 80;
      li.style.setProperty('--x', `${offsetX}px`);
      li.style.setProperty('--y', `${offsetY}px`);
      li.style.setProperty('--delay', `${delay}ms`);
    });

    contactSection.classList.remove('shrink');
    parentUl.classList.add('active');
  }, 150);
});

// contact 이미지 클릭 시 모달 열기
document.querySelector('.contact .inner .con ul li:nth-child(4) img')
  .addEventListener('click', () => {
    document.getElementById('imageModal').style.display = 'flex';
  });

// 모달 배경 누르면 닫기
document.getElementById('imageModal')
  .addEventListener('click', () => {
    document.getElementById('imageModal').style.display = 'none';
  });



  // === Scroll to top button ===
const scrollTopBtn = document.querySelector('.scroll-top-btn');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  if (scrollY > 600) {
    scrollTopBtn.classList.add('show');
  } else {
    scrollTopBtn.classList.remove('show');
  }
});

scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

});

  