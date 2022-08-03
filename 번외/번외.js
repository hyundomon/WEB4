makeSlider(`.slide-contents-wrapper`);

function makeSlider(id) {
  const slideContentsWrapper = document.querySelector(id);
  const cloneFirst =
    slideContentsWrapper.firstElementChild.cloneNode(true);
  const cloneLast = slideContentsWrapper.lastElementChild.cloneNode(true);
  const 슬라이드너비 = slideContentsWrapper.parentElement.clientWidth;

  slideContentsWrapper.insertBefore(
    cloneLast,
    slideContentsWrapper.firstChild
  );
  slideContentsWrapper.appendChild(cloneFirst);

  const buttons = document.getElementsByTagName(`button`);
  const prevButton = buttons[0];
  const nextButton = buttons[1];

  let moveChecker = true;
  let intervalManager;
  // 5초 진행시에 인터벌메니저를 추가해줌 이곳에

  let index = 1;
  moveSlide(false);

  nextButton.addEventListener("click", () => {
    //childElmentCount 프로퍼티에는 자식요소의 갯수 값이 들어있다
    slide(true);
  });
  prevButton.addEventListener(`click`, () => {
    slide(false);
  });

// 5초 기능 추가해주는것임 밑에
  function fiveSecondsSlide() {
    intervalManager = setInterval(() => {
        slide(true);
    }, 5000);
  } 
  // 5마다 슬라이드 자동넘겨주기 기능 맹글기!!!!위에 5000은 5초를 의미  1s = 1000ms 이런 단위이다!!

  function slide(vector) {
    if (moveChecker) {
      let destination;
      let maxAndMin;

      moveChecker = false;
      if (vector) {
        maxAndMin = slideContentsWrapper.childElementCount - 1;
        destination = 1;
        index++;
      } else {
        maxAndMin = 0;
        destination = slideContentsWrapper.childElementCount - 2;
        index--;
      }
      moveSlide(true);
      clearInterval(intervalManager);
      fiveSecondsSlide();
      // 5초뒤에 슬라이드 넘어가에 위에 2개 추가해줌

      setTimeout(() => {
        moveChecker = true;
        if (index === maxAndMin) {
          index = destination;
          moveSlide(false);
        }
      }, 1000);
    }
  }

  function moveSlide(transition) {
    if (transition) {
      slideContentsWrapper.style.transition = `1s`;
    } else {
      slideContentsWrapper.style.transition = `0s`;
    }

    slideContentsWrapper.style.transform = `translateX(-${
      index * 슬라이드너비
    }px)`;
  }
}