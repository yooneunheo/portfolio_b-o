"use strict";

(() => {
  // EXPRESSION
  let yOffset = 0; // window.pageYOffset 대신 쓸 변수
  let prevScrollHeight = 0; // 현재 스크롤 위치(yOffset)보다 이전에 위치한 스크롤 섹션들의 스크롤 높이값의 합
  let currentScene = 0; // 현재 활성화된(눈 앞에 보고있는) 씬(scroll-section)
  let enterNewScene = false; // 새로운 scene이 시작된 순간 true
  let delayedYOffset = 0; // 스크롤 했을 때 시작 지점
  let rafId; // requestAnimationFrame 리턴값
  let rafState;
  const acc = 0.2; // 가속도

  const sceneInfo = [
    {
      // scene 0
      type: "normal",
      scrollHeight: 0,
      objs: {
        // DOM 요소 가져오기
        container: document.querySelector("#scroll-section-0"),
      },
    },

    {
      // scene 1
      type: "sticky",
      heightNum: 5, // 브라우저 높이의 5배로 scrollHeight 세팅
      scrollHeight: 0,
      objs: {
        container: document.querySelector("#scroll-section-1"),
        messageA: document.querySelector("#scroll-section-1 .main-message.a"),
        messageB: document.querySelector("#scroll-section-1 .main-message.b"),
        messageC: document.querySelector("#scroll-section-1 .main-message.c"),
        messageD: document.querySelector("#scroll-section-1 .main-message.d"),
        canvas: document.querySelector("#video-canvas-0"),
        context: document.querySelector("#video-canvas-0").getContext("2d"),
        videoImages: [],
      },
      values: {
        // 애니메이션 정보
        videoImageCount: 299,
        imageSequence: [0, 298],
        canvas_opacity_in: [0, 1, { start: 0, end: 0.1 }],
        canvas_opacity_out: [1, 0, { start: 0.95, end: 1 }],
        messageA_opacity_in: [0, 1, { start: 0.1, end: 0.2 }],
        messageB_opacity_in: [0, 1, { start: 0.3, end: 0.4 }],
        messageC_opacity_in: [0, 1, { start: 0.5, end: 0.6 }],
        messageD_opacity_in: [0, 1, { start: 0.7, end: 0.8 }],
        messageA_translateY_in: [20, 0, { start: 0.1, end: 0.2 }],
        messageB_translateY_in: [20, 0, { start: 0.3, end: 0.4 }],
        messageC_translateY_in: [20, 0, { start: 0.5, end: 0.6 }],
        messageD_translateY_in: [20, 0, { start: 0.7, end: 0.8 }],
        messageA_opacity_out: [1, 0, { start: 0.25, end: 0.3 }],
        messageB_opacity_out: [1, 0, { start: 0.45, end: 0.5 }],
        messageC_opacity_out: [1, 0, { start: 0.65, end: 0.7 }],
        messageD_opacity_out: [1, 0, { start: 0.85, end: 0.9 }],
        messageA_translateY_out: [0, -20, { start: 0.25, end: 0.3 }],
        messageB_translateY_out: [0, -20, { start: 0.45, end: 0.5 }],
        messageC_translateY_out: [0, -20, { start: 0.65, end: 0.7 }],
        messageD_translateY_out: [0, -20, { start: 0.85, end: 0.9 }],
      },
    },

    {
      // scene 2
      type: "sticky",
      heightNum: 5,
      scrollHeight: 0,
      objs: {
        container: document.querySelector("#scroll-section-2"),
        messageA: document.querySelector("#scroll-section-2 .a"),
        canvas: document.querySelector("#video-canvas-1"),
        context: document.querySelector("#video-canvas-1").getContext("2d"),
        videoImages: [],
      },
      values: {
        videoImageCount: 100,
        imageSequence: [0, 99],
        canvas_opacity_in: [0, 1, { start: 0, end: 0.1 }],
        canvas_opacity_out: [1, 0, { start: 0.95, end: 1 }],
        messageA_opacity_in: [0, 1, { start: 0.6, end: 0.7 }],
        messageA_translateY_in: [20, 0, { start: 0.6, end: 0.7 }],
        messageA_opacity_out: [1, 0, { start: 0.75, end: 0.8 }],
        messageA_translateY_out: [0, -20, { start: 0.75, end: 0.8 }],
      },
    },
    {
      // scene 3
      type: "sticky",
      heightNum: 1.5,
      scrollHeight: 0,
      objs: {
        container: document.querySelector("#scroll-section-3"),
        messageA: document.querySelector("#scroll-section-3 .desc-message.a"),
      },
      values: {
        messageA_opacity_in: [0, 1, { start: 0, end: 0.2 }],
        messageA_translateY_in: [20, 0, { start: 0, end: 0.2 }],
        messageA_opacity_out: [1, 0, { start: 0.4, end: 0.6 }],
        messageA_translateY_out: [0, -20, { start: 0.4, end: 0.6 }],
      },
    },
    {
      // scene 4
      type: "sticky",
      heightNum: 1.5,
      scrollHeight: 0,
      objs: {
        container: document.querySelector("#scroll-section-4"),
        messageA: document.querySelector("#scroll-section-4 .desc-message.a"),
      },
      values: {
        messageA_opacity_in: [0, 1, { start: 0, end: 0.2 }],
        messageA_translateY_in: [20, 0, { start: 0, end: 0.2 }],
        messageA_opacity_out: [1, 0, { start: 0.4, end: 0.6 }],
        messageA_translateY_out: [0, -20, { start: 0.4, end: 0.6 }],
      },
    },
    {
      // scene 5
      type: "sticky",
      heightNum: 5,
      scrollHeight: 0,
      objs: {
        container: document.querySelector("#scroll-section-5"),
        messageA: document.querySelector("#scroll-section-5 .a"),
        canvas: document.querySelector("#video-canvas-2"),
        context: document.querySelector("#video-canvas-2").getContext("2d"),
        videoImages: [],
      },
      values: {
        videoImageCount: 97,
        imageSequence: [0, 96],
        canvas_opacity_in: [0, 1, { start: 0, end: 0.1 }],
        canvas_opacity_out: [1, 0, { start: 0.97, end: 1 }],
        messageA_opacity_in: [0, 1, { start: 0.8, end: 0.9 }],
        messageA_translateY_in: [20, 0, { start: 0.8, end: 0.9 }],
        messageA_opacity_out: [1, 0, { start: 0.9, end: 1 }],
        messageA_translateY_out: [0, -20, { start: 0.97, end: 1 }],
      },
    },
  ];

  function setCanvasImages() {
    // 캔버스에 쓸 비디오 이미지 옮겨오기

    let imgElem;
    for (let i = 0; i < sceneInfo[1].values.videoImageCount; i++) {
      imgElem = new Image();
      imgElem.src = `../video/intro/intro_${101 + i}.jpg`;
      sceneInfo[1].objs.videoImages.push(imgElem);
    }

    let imgElem2;
    for (let i = 0; i < sceneInfo[2].values.videoImageCount; i++) {
      imgElem2 = new Image();
      imgElem2.src = `../video/sensor/sensor_${101 + i}.jpg`;
      sceneInfo[2].objs.videoImages.push(imgElem2);
    }

    let imgElem3;
    for (let i = 0; i < sceneInfo[5].values.videoImageCount; i++) {
      imgElem3 = new Image();
      imgElem3.src = `../video/bass/bass_${101 + i}.jpg`;
      sceneInfo[5].objs.videoImages.push(imgElem3);
    }
  }

  function setLayout() {
    // 각 스크롤 섹션의 높이 세팅
    for (let i = 0; i < sceneInfo.length; i++) {
      if (sceneInfo[i].type === "sticky") {
        sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
      } else if (sceneInfo[i].type === "normal") {
        sceneInfo[i].scrollHeight = window.innerHeight;
      }
      sceneInfo[
        i
      ].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`;
    }

    // 중간에 새로고침할 때 현재 활성화된 페이지 위치에서 재세팅
    yOffset = window.pageYOffset;
    let totalScrollHeight = 0;
    for (let i = 0; i < sceneInfo.length; i++) {
      totalScrollHeight += sceneInfo[i].scrollHeight;
      if (totalScrollHeight >= yOffset) {
        currentScene = i;
        break;
      }
    }
    document.body.setAttribute("id", `show-scene-${currentScene}`);

    // 캔버스 크기 화면 높이에 맞게 세팅
    const heightRatio = window.innerHeight / 1080;
    sceneInfo[1].objs.canvas.style.transform = `translate3d(-50%, -50%, 0) scale(${heightRatio})`;
    sceneInfo[2].objs.canvas.style.transform = `translate3d(-50%, -50%, 0) scale(${heightRatio})`;
    sceneInfo[5].objs.canvas.style.transform = `translate3d(-50%, -50%, 0) scale(${heightRatio})`;
  }

  function calcValues(values, currentYOffset) {
    // playAnimation에서 쓸 애니메이션 관련 정보들 계산
    let rv;
    // 현재 씬(스크롤섹션)에서 스크롤된 범위를 비율로 구하기
    const scrollHeight = sceneInfo[currentScene].scrollHeight;
    const scrollRatio = currentYOffset / scrollHeight;

    if (values.length === 3) {
      // start ~ end 사이에 애니메이션 실행
      const partScrollStart = values[2].start * scrollHeight;
      const partScrollEnd = values[2].end * scrollHeight;
      const partScrollHeight = partScrollEnd - partScrollStart;

      if (
        currentYOffset >= partScrollStart &&
        currentYOffset <= partScrollEnd
      ) {
        rv =
          ((currentYOffset - partScrollStart) / partScrollHeight) *
            (values[1] - values[0]) +
          values[0];
      } else if (currentYOffset < partScrollStart) {
        rv = values[0];
      } else if (currentYOffset > partScrollEnd) {
        rv = values[1];
      }
    } else {
      rv = scrollRatio * (values[1] - values[0]) + values[0];
    }

    return rv;
  }

  function playAnimation() {
    // 애니메이션 동작 구현
    const objs = sceneInfo[currentScene].objs;
    const values = sceneInfo[currentScene].values;
    const currentYOffset = yOffset - prevScrollHeight;
    const scrollHeight = sceneInfo[currentScene].scrollHeight;
    const scrollRatio = currentYOffset / scrollHeight;

    switch (currentScene) {
      case 1:
        // canvas의 opacity
        if (scrollRatio <= 0.5) {
          // in
          objs.canvas.style.opacity = calcValues(
            values.canvas_opacity_in,
            currentYOffset,
          );
        } else {
          // out
          objs.canvas.style.opacity = calcValues(
            values.canvas_opacity_out,
            currentYOffset,
          );
        }

        // message의 opacity, translateY
        if (scrollRatio <= 0.22) {
          // in
          objs.messageA.style.opacity = calcValues(
            values.messageA_opacity_in,
            currentYOffset,
          );
          objs.messageA.style.transform = `translate3d(0, ${calcValues(
            values.messageA_translateY_in,
            currentYOffset,
          )}%, 0)`;
        } else {
          // out
          objs.messageA.style.opacity = calcValues(
            values.messageA_opacity_out,
            currentYOffset,
          );
          objs.messageA.style.transform = `translate3d(0, ${calcValues(
            values.messageA_translateY_out,
            currentYOffset,
          )}%, 0)`;
        }

        if (scrollRatio <= 0.42) {
          // in
          objs.messageB.style.opacity = calcValues(
            values.messageB_opacity_in,
            currentYOffset,
          );
          objs.messageB.style.transform = `translate3d(0, ${calcValues(
            values.messageB_translateY_in,
            currentYOffset,
          )}%, 0)`;
        } else {
          // out
          objs.messageB.style.opacity = calcValues(
            values.messageB_opacity_out,
            currentYOffset,
          );
          objs.messageB.style.transform = `translate3d(0, ${calcValues(
            values.messageB_translateY_out,
            currentYOffset,
          )}%, 0)`;
        }

        if (scrollRatio <= 0.62) {
          // in
          objs.messageC.style.opacity = calcValues(
            values.messageC_opacity_in,
            currentYOffset,
          );
          objs.messageC.style.transform = `translate3d(0, ${calcValues(
            values.messageC_translateY_in,
            currentYOffset,
          )}%, 0)`;
        } else {
          // out
          objs.messageC.style.opacity = calcValues(
            values.messageC_opacity_out,
            currentYOffset,
          );
          objs.messageC.style.transform = `translate3d(0, ${calcValues(
            values.messageC_translateY_out,
            currentYOffset,
          )}%, 0)`;
        }

        if (scrollRatio <= 0.82) {
          // in
          objs.messageD.style.opacity = calcValues(
            values.messageD_opacity_in,
            currentYOffset,
          );
          objs.messageD.style.transform = `translate3d(0, ${calcValues(
            values.messageD_translateY_in,
            currentYOffset,
          )}%, 0)`;
        } else {
          // out
          objs.messageD.style.opacity = calcValues(
            values.messageD_opacity_out,
            currentYOffset,
          );
          objs.messageD.style.transform = `translate3d(0, ${calcValues(
            values.messageD_translateY_out,
            currentYOffset,
          )}%, 0)`;
        }
        break;

      case 2:
        // canvas의 opacity
        if (scrollRatio <= 0.52) {
          // in
          objs.canvas.style.opacity = calcValues(
            values.canvas_opacity_in,
            currentYOffset,
          );
        } else {
          // out
          objs.canvas.style.opacity = calcValues(
            values.canvas_opacity_out,
            currentYOffset,
          );
        }

        // message의 opacity, translateY
        if (scrollRatio <= 0.75) {
          // in
          objs.messageA.style.transform = `translate3d(0, ${calcValues(
            values.messageA_translateY_in,
            currentYOffset,
          )}%, 0)`;
          objs.messageA.style.opacity = calcValues(
            values.messageA_opacity_in,
            currentYOffset,
          );
        } else {
          // out
          objs.messageA.style.transform = `translate3d(0, ${calcValues(
            values.messageA_translateY_out,
            currentYOffset,
          )}%, 0)`;
          objs.messageA.style.opacity = calcValues(
            values.messageA_opacity_out,
            currentYOffset,
          );
        }
        break;

      case 3:
        // message의 opacity, translateY
        if (scrollRatio <= 0.35) {
          // in
          objs.messageA.style.transform = `translate3d(0, ${calcValues(
            values.messageA_translateY_in,
            currentYOffset,
          )}%, 0)`;
          objs.messageA.style.opacity = calcValues(
            values.messageA_opacity_in,
            currentYOffset,
          );
        } else {
          // out
          objs.messageA.style.transform = `translate3d(0, ${calcValues(
            values.messageA_translateY_out,
            currentYOffset,
          )}%, 0)`;
          objs.messageA.style.opacity = calcValues(
            values.messageA_opacity_out,
            currentYOffset,
          );
        }
        break;

      case 4:
        // message의 opacity, translateY
        if (scrollRatio <= 0.35) {
          // in
          objs.messageA.style.transform = `translate3d(0, ${calcValues(
            values.messageA_translateY_in,
            currentYOffset,
          )}%, 0)`;
          objs.messageA.style.opacity = calcValues(
            values.messageA_opacity_in,
            currentYOffset,
          );
        } else {
          // out
          objs.messageA.style.transform = `translate3d(0, ${calcValues(
            values.messageA_translateY_out,
            currentYOffset,
          )}%, 0)`;
          objs.messageA.style.opacity = calcValues(
            values.messageA_opacity_out,
            currentYOffset,
          );
        }
        break;

      case 5:
        // canvas의 opacity
        if (scrollRatio <= 0.25) {
          // in
          objs.canvas.style.opacity = calcValues(
            values.canvas_opacity_in,
            currentYOffset,
          );
        } else {
          // out
          objs.canvas.style.opacity = calcValues(
            values.canvas_opacity_out,
            currentYOffset,
          );
        }

        // message의 opacity, translateY
        if (scrollRatio <= 0.83) {
          // in
          objs.messageA.style.transform = `translate3d(0, ${calcValues(
            values.messageA_translateY_in,
            currentYOffset,
          )}%, 0)`;
          objs.messageA.style.opacity = calcValues(
            values.messageA_opacity_in,
            currentYOffset,
          );
        } else {
          // out
          objs.messageA.style.transform = `translate3d(0, ${calcValues(
            values.messageA_translateY_out,
            currentYOffset,
          )}%, 0)`;
          objs.messageA.style.opacity = calcValues(
            values.messageA_opacity_out,
            currentYOffset,
          );
        }
        break;
    }
  }
  function scrollLoop() {
    // 현재 몇번째 스크롤 섹션이 활성되어있는지 계산해서 그 섹션에 맞는 애니메이션 활성화
    // 스크롤 섹션 끝났을 때 normal-content 에 있는 sticky-elem을 숨김
    enterNewScene = false;
    prevScrollHeight = 0;

    for (let i = 0; i < currentScene; i++) {
      prevScrollHeight += sceneInfo[i].scrollHeight;
    }

    if (
      delayedYOffset <
      prevScrollHeight + sceneInfo[currentScene].scrollHeight
    ) {
      document.body.classList.remove("scroll-effect-end");
    }

    if (
      delayedYOffset >
      prevScrollHeight + sceneInfo[currentScene].scrollHeight
    ) {
      enterNewScene = true;
      if (currentScene === sceneInfo.length - 1) {
        document.body.classList.add("scroll-effect-end");
      }
      if (currentScene < sceneInfo.length - 1) {
        currentScene++;
      }
      document.body.setAttribute("id", `show-scene-${currentScene}`);
    }

    if (delayedYOffset < prevScrollHeight) {
      enterNewScene = true;
      // 브라우저 바운스 효과로 인해 마이너스가 되는 것을 방지(모바일)
      if (currentScene === 0) return;
      currentScene--;
      document.body.setAttribute("id", `show-scene-${currentScene}`);
    }

    if (enterNewScene) return;

    playAnimation();
  }

  function loop() {
    // 부드러운 애니메이션을 위한 감속 효과
    delayedYOffset = delayedYOffset + (yOffset - delayedYOffset) * acc;

    if (!enterNewScene) {
      // 캔버스가 있는 구간에 감속 효과 넣기
      if (currentScene === 1 || currentScene === 2 || currentScene === 5) {
        const currentYOffset = delayedYOffset - prevScrollHeight;
        const objs = sceneInfo[currentScene].objs;
        const values = sceneInfo[currentScene].values;
        let sequence = Math.round(
          calcValues(values.imageSequence, currentYOffset),
        );
        if (objs.videoImages[sequence]) {
          objs.context.drawImage(objs.videoImages[sequence], 0, 0);
        }
      }
    }

    // 일부 기기에서 페이지 끝으로 고속 이동하면 body id가 제대로 인식 안되는 경우를 해결
    // 페이지 맨 위로 갈 경우: scrollLoop와 첫번쨰 캔버스 그리기 수행
    if (delayedYOffset < 1) {
      scrollLoop();
      sceneInfo[1].objs.canvas.style.opacity = 1;
      sceneInfo[1].objs.context.drawImage(
        sceneInfo[1].objs.videoImages[0],
        0,
        0,
      );
    }

    // 페이지 맨 아래로 갈 경우: 마지막 섹션은 스크롤 계산으로 위치 및 크기를 결정해야할 요소들이 많아서 1픽셀을 움직여주는 것으로 해결
    if (document.body.offsetHeight - window.innerHeight - delayedYOffset < 1) {
      let tempYOffset = yOffset;
      scrollTo(0, tempYOffset - 1);
    }

    rafId = requestAnimationFrame(loop);

    if (Math.abs(yOffset - delayedYOffset) < 1) {
      cancelAnimationFrame(rafId);
      rafState = false;
    }
  }

  window.addEventListener("load", () => {
    // 중간에 새로고침 시, 콘텐츠 양에 따라 높이 계산에 오차가 발생하는 경우를 방지하기 위해 before-load 클래스 제거 전에도 확실하게 높이를 세팅하도록 한번 더 실행
    setLayout();
    // setLayout이 실행을 끝내기 전(스크롤 섹션이 제대로 세팅되기 전)에는 다 안 보이게 한 다음(display: none), 레이아웃 세팅이 완료되면 다같이 동시에 보이도록
    document.body.classList.remove("before-load");
    setLayout();
    sceneInfo[1].objs.context.drawImage(sceneInfo[1].objs.videoImages[0], 0, 0);

    // 중간에서 새로고침 했을 경우 자동 스크롤을 줘서 레이아웃(스크롤 섹션의 높이) 세팅 해주기
    let tempYOffset = yOffset;
    let tempScrollCount = 0;
    if (tempYOffset > 0) {
      let siId = setInterval(() => {
        scrollTo(0, tempYOffset);
        tempYOffset += 5;

        if (tempScrollCount > 20) {
          clearInterval(siId);
        }
        tempScrollCount++;
      }, 20);
    }

    window.addEventListener("scroll", () => {
      yOffset = window.pageYOffset;
      scrollLoop();

      if (!rafState) {
        rafId = requestAnimationFrame(loop);
        rafState = true;
      }
    });

    window.addEventListener("resize", () => {
      // resize 될 때마다 새롭게 로드 되지만 모바일은 제외. 방향 전환이 아닌 이상 reload하지 않는다.
      // 하단바나 상태바가 유동적으로 움직이기 때문에 계속 resize가 일어나서 스크롤 진행이 안되기 때문
      // 900 : 모바일 landscape 모드의 최대 길이
      if (window.innerWidth > 900) {
        window.location.reload();
      }
    });

    window.addEventListener("orientationchange", () => {
      scrollTo(0, 0);
      // 레이어드 세팅을 위해 바로 reload되지 않고 시간차를 줘서 reload한다.
      setTimeout(() => {
        window.location.reload();
      }, 500);
    });

    document
      .querySelector(".loading")
      .addEventListener("transitionend", (e) => {
        document.body.removeChild(e.currentTarget);
      });
  });

  setCanvasImages();
})();
