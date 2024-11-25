export const toCurrency = (value: number) => {
  return value.toFixed(3).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
};