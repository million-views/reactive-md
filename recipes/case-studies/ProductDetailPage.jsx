import { useState } from 'react';
import { Heart, ShoppingCart, Star } from 'lucide-react';

const productData = {
  id: 1,
  name: "Wireless Bluetooth Headphones",
  price: 199.99,
  originalPrice: 249.99,
  rating: 4.5,
  reviews: 128,
  description: "Premium wireless headphones with active noise cancellation, 30-hour battery life, and premium sound quality.",
  images: ['🎧', '🎧', '🎧', '🎧'],
  sizes: ['XS', 'S', 'M', 'L', 'XL'],
  colors: [
    { id: 'black', name: 'Midnight Black', hex: 'bg-gray-900' },
    { id: 'white', name: 'Pearl White', hex: 'bg-white border border-gray-300' },
    { id: 'blue', name: 'Ocean Blue', hex: 'bg-blue-600' },
    { id: 'red', name: 'Crimson Red', hex: 'bg-red-600' },
  ],
  features: [
    'Active Noise Cancellation',
    '30-hour Battery Life',
    'Premium Sound Quality',
    'Comfortable Fit',
    'Wireless Charging',
    'Voice Assistant Compatible'
  ]
};

function ProductImageGallery({ images, activeImage, onImageChange }) {
  return (
    <div>
      <div className="aspect-square bg-gray-100 rounded-xl flex items-center justify-center text-8xl mb-4">
        {images[activeImage]}
      </div>
      <div className="flex gap-2">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => onImageChange(i)}
            className={`w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center text-2xl transition-all ${
              activeImage === i ? 'ring-2 ring-blue-500' : ''
            }`}
          >
            {img}
          </button>
        ))}
      </div>
    </div>
  );
}

function ProductInfo({ product, selectedSize, onSizeChange, selectedColor, onColorChange }) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
              />
            ))}
          </div>
          <span className="text-gray-600">{product.rating} ({product.reviews} reviews)</span>
        </div>
        <div className="flex items-center gap-3 mb-4">
          <span className="text-3xl font-bold text-gray-900">${product.price}</span>
          <span className="text-xl text-gray-500 line-through">${product.originalPrice}</span>
          <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
            Save ${Math.round(product.originalPrice - product.price)}
          </span>
        </div>
        <p className="text-gray-600">{product.description}</p>
      </div>

      <div>
        <h3 className="font-semibold mb-3">Color: {product.colors.find(c => c.id === selectedColor)?.name}</h3>
        <div className="flex gap-3">
          {product.colors.map((color) => (
            <button
              key={color.id}
              onClick={() => onColorChange(color.id)}
              className={`w-10 h-10 rounded-full ${color.hex} transition-all ${
                selectedColor === color.id ? 'ring-2 ring-blue-500 ring-offset-2' : ''
              }`}
              title={color.name}
            />
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-3">Size: {selectedSize}</h3>
        <div className="flex gap-2">
          {product.sizes.map((size) => (
            <button
              key={size}
              onClick={() => onSizeChange(size)}
              className={`px-4 py-2 border rounded-lg transition-all ${
                selectedSize === size
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProductFeatures({ features }) {
  return (
    <div>
      <h3 className="font-semibold mb-3">Key Features</h3>
      <ul className="space-y-2">
        {features.map((feature, i) => (
          <li key={i} className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-gray-700">{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function ProductDetailPage() {
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState('black');
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [addedToCart, setAddedToCart] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleAddToCart = () => {
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="grid md:grid-cols-2 gap-8 p-6">
        <ProductImageGallery
          images={productData.images}
          activeImage={activeImage}
          onImageChange={setActiveImage}
        />

        <div className="space-y-6">
          <ProductInfo
            product={productData}
            selectedSize={selectedSize}
            onSizeChange={setSelectedSize}
            selectedColor={selectedColor}
            onColorChange={setSelectedColor}
          />

          <div className="flex items-center gap-4">
            <div className="flex items-center border rounded-lg">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-2 hover:bg-gray-50"
              >
                -
              </button>
              <span className="px-4 py-2 border-x">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 py-2 hover:bg-gray-50"
              >
                +
              </button>
            </div>

            <button
              onClick={() => setIsWishlisted(!isWishlisted)}
              className={`p-3 rounded-lg border transition-all ${
                isWishlisted ? 'bg-red-50 border-red-200' : 'hover:bg-gray-50'
              }`}
            >
              <Heart className={`w-5 h-5 ${isWishlisted ? 'text-red-500 fill-current' : 'text-gray-400'}`} />
            </button>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleAddToCart}
              disabled={addedToCart}
              className={`flex-1 py-3 px-6 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
                addedToCart
                  ? 'bg-green-600 text-white'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              <ShoppingCart className="w-5 h-5" />
              {addedToCart ? 'Added to Cart!' : 'Add to Cart'}
            </button>
          </div>

          <ProductFeatures features={productData.features} />
        </div>
      </div>
    </div>
  );
}