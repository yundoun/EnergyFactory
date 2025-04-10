// clsx와 tailwind-merge에서 영감을 받은 유틸리티 함수
// 다양한 클래스를 병합하는 데 사용됩니다.
// cn 함수는 조건부로 여러 개의 CSS 클래스 이름을 조합하여 하나의 깔끔한 문자열로 만들어주는 편리한 유틸리티 함수입니다.

/**
 * 클래스명들을 병합합니다
 * @param  {...string} classes - 병합할 클래스명들
 * @returns {string} - 병합된 클래스명
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}