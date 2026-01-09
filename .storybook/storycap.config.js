module.exports = {
  // Storycap 설정
  storybookUrl: 'http://localhost:6006',

  // 스크린샷 저장 경로
  outDir: '__screenshots__',

  // 병렬 실행 수
  parallel: 4,

  // 뷰포트 설정
  viewports: {
    desktop: {
      width: 1280,
      height: 800,
    },
    tablet: {
      width: 768,
      height: 1024,
    },
    mobile: {
      width: 375,
      height: 667,
    },
  },

  // 기본 뷰포트
  defaultViewport: 'desktop',

  // 스크린샷 옵션
  screenshot: {
    fullPage: false,
    omitBackground: false,
  },

  // 스크린샷 찍기 전에 포커스 제거
  prepareScript: () => {
    if (document.activeElement) {
      document.activeElement.blur();
    }
  },

  // ForJsdoc 스토리만 캡처
  skip: (story) => {
    // story.story는 "For Jsdoc" 또는 "ForJsdoc" 등일 수 있음
    return !story.story.match(/For\s?Jsdoc/i);
  },
};
