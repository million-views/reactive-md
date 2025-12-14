# E-Commerce Product Detail Page

> A complete mini-PRD for an e-commerce PDP.

## About This Case Study

Product Detail Pages (PDPs) are critical for e-commerce conversion. This case study explores the complete requirements for a high-converting PDP.

---

## Interactive Prototype

```jsx
import { useState } from 'react';

export default function ProductDetailPage() {
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState('black');
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [addedToCart, setAddedToCart] = useState(false);
  
  const images = ['📱', '📱', '📱', '📱'];
  const sizes = ['XS', 'S', 'M', 'L', 'XL'];
  const colors = [
    { id: 'black', hex: 'bg-gray-900' },
    { id: 'white', hex: 'bg-white border' },
    { id: 'blue', hex: 'bg-blue-600' },
    { id: 'red', hex: 'bg-red-600' },
  ];
  
  const handleAddToCart = () => {
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };
  
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="grid md:grid-cols-2 gap-6 p-6">
        {/* Images */}
        <div>
          <div className="aspect-square bg-gray-100 rounded-xl flex items-center justify-center text-8xl mb-4">
            {images[activeImage]}
          </div>
          <div className="flex gap-2">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImage(i)}
                className={`w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center ${
                  activeImage === i ? 'ring-2 ring-blue-600' : ''
                }`}
              >
                {img}
              </button>
            ))}
          </div>
        </div>
        
        {/* Details */}
        <div>
          <div className="text-sm text-gray-500 mb-1">Brand Name</div>
          <h1 className="text-2xl font-bold mb-2">Premium Product Name</h1>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-yellow-500">★★★★★</span>
            <span className="text-sm text-gray-500">(128 reviews)</span>
          </div>
          
          <div className="text-3xl font-bold text-green-600 mb-6">$129.99</div>
          
          {/* Color Selection */}
          <div className="mb-4">
            <div className="text-sm font-medium mb-2">Color: <span className="capitalize">{selectedColor}</span></div>
            <div className="flex gap-2">
              {colors.map((color) => (
                <button
                  key={color.id}
                  onClick={() => setSelectedColor(color.id)}
                  className={`w-8 h-8 rounded-full ${color.hex} ${
                    selectedColor === color.id ? 'ring-2 ring-offset-2 ring-blue-600' : ''
                  }`}
                />
              ))}
            </div>
          </div>
          
          {/* Size Selection */}
          <div className="mb-4">
            <div className="text-sm font-medium mb-2">Size</div>
            <div className="flex gap-2">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-10 h-10 rounded-lg border font-medium ${
                    selectedSize === size
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'hover:border-gray-400'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
          
          {/* Quantity */}
          <div className="mb-6">
            <div className="text-sm font-medium mb-2">Quantity</div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 rounded-lg border hover:bg-gray-50"
              >
                -
              </button>
              <span className="w-12 text-center font-medium">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 rounded-lg border hover:bg-gray-50"
              >
                +
              </button>
            </div>
          </div>
          
          {/* Add to Cart */}
          <button
            onClick={handleAddToCart}
            className={`w-full py-4 rounded-xl font-bold text-lg transition-colors ${
              addedToCart
                ? 'bg-green-600 text-white'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {addedToCart ? '✓ Added to Cart!' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
}
```

---

## Key Requirements

### Must Have (P0)
- [ ] High-quality product images with zoom
- [ ] Clear pricing and availability
- [ ] Size/color/variant selection
- [ ] Add to cart functionality
- [ ] Mobile-responsive layout

### Should Have (P1)
- [ ] Customer reviews section
- [ ] Related products carousel
- [ ] Size guide modal
- [ ] Wishlist functionality
- [ ] Share buttons

### Nice to Have (P2)
- [ ] AR/3D product viewer
- [ ] Recently viewed products
- [ ] Stock notifications

---

*Created with [Reactive MD](https://marketplace.visualstudio.com/items?itemName=million-views.reactive-md)*
