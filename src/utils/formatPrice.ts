export const formatPrice = (price: number) =>
  new Intl.NumberFormat("ru").format(price ? price : 0);
