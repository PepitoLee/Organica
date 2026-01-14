export interface Product {
  id: string;
  name: string;
  origin: string;
  roast: 'Light' | 'Medium' | 'Dark';
  notes: string[];
  price: number;
  image: string;
  description: string;
  weight: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  toggleCart: () => void;
  isCartOpen: boolean;
  total: number;
}