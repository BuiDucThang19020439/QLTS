/**
 * Hàm format số
 * CreatedBy: Bùi Đức Thắng (06/09/2023)
 */
export const formatNumber = (x, locale, separator) => {
    return x
      .toLocaleString(locale, {
        useGrouping: true,
        minimumFractionDigits: 0,
      })
      .replace(/[,.]/g, separator);
}