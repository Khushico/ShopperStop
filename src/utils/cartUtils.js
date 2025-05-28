// Merge guest cart into user cart on login
export function mergeCarts(guestCart, userCart) {
  const merged = [...userCart];
  guestCart.forEach(guestItem => {
    const index = merged.findIndex(
      item =>
        item.id === guestItem.id &&
        item.selectedColor === guestItem.selectedColor &&
        item.selectedSize === guestItem.selectedSize
    );
    if (index > -1) {
      merged[index].quantity += guestItem.quantity;
    } else {
      merged.push({ ...guestItem });
    }
  });
  return merged;
}

export function getCartCount(cart) {
  return cart.reduce((sum, item) => sum + item.quantity, 0);
}
