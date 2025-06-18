document.addEventListener("DOMContentLoaded", function () {
  let mainslide = new Swiper(".swiper", {
      /* loop: true, */ // 무한 루프
      autoplay: {
          delay: 3000, // 3초마다 슬라이드 자동 변경
          disableOnInteraction: false, // 사용자가 터치해도 자동 슬라이드 유지
      },
      pagination: {
          el: ".swiper-pagination", // 페이지네이션 적용
          clickable: true,
      },
      navigation: {
          nextEl: ".swiper-button-next", // 다음 버튼 (필요하면 추가)
          prevEl: ".swiper-button-prev", // 이전 버튼 (필요하면 추가)
      },
  });

  let eventSwiper;

  function initEventSwiper() {
    const screenWidth = window.innerWidth;
  
    if (screenWidth <= 1024 && !eventSwiper) {
      // Swiper 슬라이더 초기화 (1024px 이하에서만)
      eventSwiper = new Swiper('.swiper_mySwiper', {
        loop: true,
        spaceBetween: 20,
        slidesPerView: 1,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        breakpoints: {
          768: {
            slidesPerView: 1.5,
          }
        }
      });
    }
  }
  
  // 최초 실행
  initEventSwiper();
  
  // 화면 리사이즈 될 때 슬라이드 적용 여부 판단
  window.addEventListener('resize', () => {
    // Swiper는 한 번만 실행되면 되므로 조건만 확인
    if (window.innerWidth <= 1024 && !eventSwiper) {
      initEventSwiper();
    }
  });
  

});