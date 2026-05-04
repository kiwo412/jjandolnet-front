//숫자 세자리마다 콤마 추가
export const formatAmountInput = (value: string) => {
  const numberValue = value.replace(/[^0-9]/g, "");
  return numberValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

// 콤마 제거 후 숫자로 변환 (서버 전송용)
export const parseAmount = (value: string | number) => {
  if (typeof value === "string") {
    return Number(value.replace(/,/g, ""));
  } else {
    return Number(String(value).replace(/,/g, ""));
  }
};
