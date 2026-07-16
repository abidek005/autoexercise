export function applyDiscount(
  price: number,
  discount: number
) {
  return price - (price * discount) / 100;
}