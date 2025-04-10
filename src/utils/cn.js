// clsx와 tailwind-merge에서 영감을 받은 유틸리티 함수
// 다양한 클래스를 병합하는 데 사용됩니다.

/**
 * 클래스명들을 병합합니다
 * @param  {...string} classes - 병합할 클래스명들
 * @returns {string} - 병합된 클래스명
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}