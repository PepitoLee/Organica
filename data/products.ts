export interface Product {
  id: string;
  name: string;
  category: 'cafe' | 'cacao';
  subcategory?: string;
  weight: string;
  price: number;
  description: string;
  image: string;
  origin?: string;
  featured?: boolean;
}

export const PRODUCTS: Product[] = [
  // ========================================
  // CAFÉ ORGÁNICO
  // ========================================
  {
    id: 'cafe-250',
    name: 'Café Orgánico',
    category: 'cafe',
    weight: '250g',
    price: 39,
    description: 'Café orgánico peruano de especialidad. Disponible en grano o molido. Notas de chocolate, frutos rojos y caramelo.',
    image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=800&auto=format&fit=crop',
    origin: 'Cusco, Junín, Amazonas',
    featured: true,
  },
  {
    id: 'cafe-500',
    name: 'Café Orgánico',
    category: 'cafe',
    weight: '500g',
    price: 59,
    description: 'Café orgánico peruano de especialidad. Disponible en grano o molido. Perfil equilibrado con acidez brillante.',
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=800&auto=format&fit=crop',
    origin: 'Cusco, Junín, Amazonas',
    featured: true,
  },
  {
    id: 'cafe-1kg',
    name: 'Café Orgánico',
    category: 'cafe',
    weight: '1 kg',
    price: 99,
    description: 'Café orgánico peruano de especialidad. Disponible en grano o molido. Ideal para cafeterías y hogares.',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=800&auto=format&fit=crop',
    origin: 'Cusco, Junín, Amazonas',
  },

  // ========================================
  // CACAO TOSTADO
  // ========================================
  {
    id: 'cacao-tostado-500',
    name: 'Cacao Tostado',
    category: 'cacao',
    subcategory: 'tostado',
    weight: '1/2 kg',
    price: 49,
    description: 'Cacao criollo tostado de San Martín. Aroma intenso y sabor profundo. Ideal para chocolate artesanal.',
    image: 'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?q=80&w=800&auto=format&fit=crop',
    origin: 'San Martín',
    featured: true,
  },
  {
    id: 'cacao-tostado-1kg',
    name: 'Cacao Tostado',
    category: 'cacao',
    subcategory: 'tostado',
    weight: '1 kg',
    price: 89,
    description: 'Cacao criollo tostado de San Martín. Perfecto para elaboración de chocolate y repostería.',
    image: 'https://images.unsplash.com/photo-1481391319762-47dff72954d9?q=80&w=800&auto=format&fit=crop',
    origin: 'San Martín',
  },

  // ========================================
  // CACAO TOSTADO Y PELADO
  // ========================================
  {
    id: 'cacao-pelado-500',
    name: 'Cacao Tostado y Pelado',
    category: 'cacao',
    subcategory: 'pelado',
    weight: '1/2 kg',
    price: 79,
    description: 'Cacao tostado y pelado, listo para moler. Cacao criollo 100% peruano de primera calidad.',
    image: 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?q=80&w=800&auto=format&fit=crop',
    origin: 'San Martín',
  },
  {
    id: 'cacao-pelado-1kg',
    name: 'Cacao Tostado y Pelado',
    category: 'cacao',
    subcategory: 'pelado',
    weight: '1 kg',
    price: 119,
    description: 'Cacao tostado y pelado, listo para moler. Ideal para chocolateros y pasteleros profesionales.',
    image: 'https://images.unsplash.com/photo-1542843137-8791a6904d14?q=80&w=800&auto=format&fit=crop',
    origin: 'San Martín',
  },

  // ========================================
  // CACAO NIBS
  // ========================================
  {
    id: 'cacao-nibs-500',
    name: 'Cacao Nibs',
    category: 'cacao',
    subcategory: 'nibs',
    weight: '1/2 kg',
    price: 59,
    description: 'Trozos de cacao tostado, crujientes y aromáticos. Perfectos para granola, postres y snacks saludables.',
    image: 'https://images.unsplash.com/photo-1610450949065-1f2841536c88?q=80&w=800&auto=format&fit=crop',
    origin: 'San Martín',
    featured: true,
  },
  {
    id: 'cacao-nibs-1kg',
    name: 'Cacao Nibs',
    category: 'cacao',
    subcategory: 'nibs',
    weight: '1 kg',
    price: 99,
    description: 'Trozos de cacao tostado. Ricos en antioxidantes y fibra. Alto contenido de magnesio.',
    image: 'https://images.unsplash.com/photo-1623428187969-5da2dcea5ebf?q=80&w=800&auto=format&fit=crop',
    origin: 'San Martín',
  },

  // ========================================
  // CACAO EN POLVO
  // ========================================
  {
    id: 'cacao-polvo-500',
    name: 'Cacao en Polvo',
    category: 'cacao',
    subcategory: 'polvo',
    weight: '1/2 kg',
    price: 49,
    description: 'Cacao en polvo puro, sin azúcar ni aditivos. Ideal para bebidas, postres y repostería.',
    image: 'https://images.unsplash.com/photo-1587132137056-bfbf0166836e?q=80&w=800&auto=format&fit=crop',
    origin: 'San Martín',
  },
  {
    id: 'cacao-polvo-1kg',
    name: 'Cacao en Polvo',
    category: 'cacao',
    subcategory: 'polvo',
    weight: '1 kg',
    price: 89,
    description: 'Cacao en polvo puro de alta calidad. Perfecto para chocolatería y pastelería profesional.',
    image: 'https://images.unsplash.com/photo-1606890658317-7d14490b76fd?q=80&w=800&auto=format&fit=crop',
    origin: 'San Martín',
  },

  // ========================================
  // CACAO EN PASTA
  // ========================================
  {
    id: 'cacao-pasta-90',
    name: 'Cacao en Pasta',
    category: 'cacao',
    subcategory: 'pasta',
    weight: '90g',
    price: 9,
    description: 'Tableta de cacao 100% puro para taza. Derrite en leche caliente para un chocolate cremoso.',
    image: 'https://images.unsplash.com/photo-1548907040-4baa42d10919?q=80&w=800&auto=format&fit=crop',
    origin: 'San Martín',
    featured: true,
  },
  {
    id: 'cacao-pasta-1kg',
    name: 'Cacao en Pasta',
    category: 'cacao',
    subcategory: 'pasta',
    weight: '1 kg',
    price: 99,
    description: 'Pasta de cacao pura para elaboración de chocolate. Base ideal para chocolateros.',
    image: 'https://images.unsplash.com/photo-1511381939415-e44015466834?q=80&w=800&auto=format&fit=crop',
    origin: 'San Martín',
  },
  {
    id: 'cacao-pasta-caja',
    name: 'Caja Cacao en Pasta',
    category: 'cacao',
    subcategory: 'pasta',
    weight: '45 unidades (90g c/u)',
    price: 399,
    description: 'Caja mayorista de tabletas de cacao para taza. Ideal para tiendas, cafeterías y reventa.',
    image: 'https://images.unsplash.com/photo-1606890658317-7d14490b76fd?q=80&w=800&auto=format&fit=crop',
    origin: 'San Martín',
  },
];

// Helper functions
export const getCafeProducts = () => PRODUCTS.filter(p => p.category === 'cafe');
export const getCacaoProducts = () => PRODUCTS.filter(p => p.category === 'cacao');
export const getFeaturedProducts = () => PRODUCTS.filter(p => p.featured);
export const getProductsBySubcategory = (subcategory: string) =>
  PRODUCTS.filter(p => p.subcategory === subcategory);
