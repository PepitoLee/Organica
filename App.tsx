import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Origins from './components/Origins';
import Story from './components/Story';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import CartSidebar from './components/CartSidebar';
import { CartProvider } from './store';
import { Product } from './types';
import { Leaf, Award, Truck } from 'lucide-react';

// Mock Data - Precios en Soles Peruanos (S/)
const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Etiopía Yirgacheffe',
    origin: 'Etiopía',
    roast: 'Light',
    notes: ['Jazmín', 'Limón', 'Miel'],
    price: 22.00,
    weight: '250g',
    description: 'Un café floral y cítrico cultivado en las tierras altas. Perfecto para métodos de vertido, ofreciendo una taza limpia y brillante.',
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: '2',
    name: 'Colombia Huila Supremo',
    origin: 'Colombia',
    roast: 'Medium',
    notes: ['Caramelo', 'Nuez', 'Frutas Rojas'],
    price: 20.00,
    weight: '250g',
    description: 'Cuerpo balanceado con dulzura natural. Notas profundas de chocolate y una acidez frutal que perdura en el paladar.',
    image: 'https://images.unsplash.com/photo-1611854779393-1b2ae54a1985?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: '3',
    name: 'Sumatra Mandheling',
    origin: 'Indonesia',
    roast: 'Dark',
    notes: ['Tierra', 'Especias', 'Chocolate Oscuro'],
    price: 25.00,
    weight: '250g',
    description: 'Intenso, con cuerpo completo y baja acidez. Un perfil exótico y complejo ideal para los amantes del café fuerte.',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: '4',
    name: 'Costa Rica Tarrazú',
    origin: 'Costa Rica',
    roast: 'Medium',
    notes: ['Miel', 'Vainilla', 'Fruta Tropical'],
    price: 23.00,
    weight: '250g',
    description: 'Reconocido por su acidez fina y cuerpo cremoso. Cultivado en suelos volcánicos ricos en minerales.',
    image: 'https://images.unsplash.com/photo-1606791405792-1004f1718d0c?q=80&w=800&auto=format&fit=crop',
  }
];

function App() {
  return (
    <CartProvider>
      <div className="bg-coffee-950 min-h-screen text-coffee-50 selection:bg-gold-500 selection:text-coffee-950 font-sans">
        <Navbar />
        <CartSidebar />
        
        <main>
          <Hero />

          {/* Feature Cards Section */}
          <div className="relative z-20 -mt-24 pb-12 px-6 container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-coffee-900/50 backdrop-blur-md p-8 border border-white/5 rounded-sm flex flex-col items-center text-center hover:border-gold-500/30 transition-colors duration-500">
                <Leaf className="w-8 h-8 text-gold-500 mb-4" />
                <h3 className="font-serif text-xl mb-2">100% Orgánico</h3>
                <p className="text-coffee-300 text-sm">Cultivado sin pesticidas, respetando la tierra y el ecosistema local.</p>
              </div>
              <div className="bg-coffee-900/50 backdrop-blur-md p-8 border border-white/5 rounded-sm flex flex-col items-center text-center hover:border-gold-500/30 transition-colors duration-500">
                <Award className="w-8 h-8 text-gold-500 mb-4" />
                <h3 className="font-serif text-xl mb-2">Comercio Justo</h3>
                <p className="text-coffee-300 text-sm">Trabajamos directamente con agricultores, asegurando pagos dignos.</p>
              </div>
              <div className="bg-coffee-900/50 backdrop-blur-md p-8 border border-white/5 rounded-sm flex flex-col items-center text-center hover:border-gold-500/30 transition-colors duration-500">
                <Truck className="w-8 h-8 text-gold-500 mb-4" />
                <h3 className="font-serif text-xl mb-2">Tostado Fresco</h3>
                <p className="text-coffee-300 text-sm">Enviamos dentro de las 48 horas posteriores al tueste para máxima frescura.</p>
              </div>
            </div>
          </div>

          {/* Origins/Products Section */}
          <Origins products={PRODUCTS} />

          {/* Story Section */}
          <Story />

          {/* Newsletter Section */}
          <Newsletter />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </CartProvider>
  );
}

export default App;