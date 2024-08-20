export const rateSale = (original: number, sale: number) => Math.round(((original - sale) / original) * 100) + '%'
