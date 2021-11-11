export const rpFormat = value =>
  "Rp " +
  (!value || isNaN(value)
    ? 0
    : value.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1."));
