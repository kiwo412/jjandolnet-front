/**
 * 오늘 날짜를 'YYYY-MM-DD' 형식으로 반환
 */
export const getTodayDate = (): string => {
  return formatDate(new Date());
};

/**
 * 만 나이 제한을 적용한 최대 선택 가능 날짜 반환
 * 예: 14세 제한인 경우 오늘로부터 14년 전 날짜를 반환
 */
export const getMaxBirthDate = (ageLimit: number = 14): string => {
  const date = new Date();
  date.setFullYear(date.getFullYear() - ageLimit);
  return formatDate(date);
};

/**
 * Date 객체를 'YYYY-MM-DD' 형식의 문자열로 변환
 */
export const formatDate = (date: Date): string => {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
};
