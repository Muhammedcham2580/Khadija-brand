import React, { useState } from 'react';
import { ShoppingBag, Menu, X, Heart, ArrowRight, Star, Sparkles, Upload, Phone, MessageCircle, Instagram } from 'lucide-react';

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [customImages, setCustomImages] = useState({});
  const [showCheckout, setShowCheckout] = useState(false);
  const [orderDetails, setOrderDetails] = useState({
    name: '',
    phone: '',
    address: '',
    paymentMethod: 'wave'
  });

  const defaultProducts = [
    { id: 1, name: 'Ankara Maxi Dress', price: 1800, category: 'dress', img: 'https://images.unsplash.com/photo-1624206112918-f140f087f9b5?w=400&h=500&fit=crop', tag: 'Bestseller' },
    { id: 2, name: 'Gold Statement Necklace', price: 950, category: 'jewelry', img: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=500&fit=crop', tag: 'New' },
    { id: 3, name: 'Kente Print Gown', price: 2200, category: 'dress', img: 'https://images.unsplash.com/photo-1617019114583-affb34d1b3cd?w=400&h=500&fit=crop', tag: 'Hot' },
    { id: 4, name: 'African Beaded Earrings', price: 650, category: 'jewelry', img: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=500&fit=crop', tag: 'Trending' },
    { id: 5, name: 'Dashiki Evening Dress', price: 1950, category: 'dress', img: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=500&fit=crop', tag: 'New' },
    { id: 6, name: 'Wooden Bead Bracelet Set', price: 750, category: 'jewelry', img: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=500&fit=crop', tag: 'Handmade' },
    { id: 7, name: 'African Print Cocktail Dress', price: 1650, category: 'dress', img: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=400&h=500&fit=crop', tag: 'Popular' },
    { id: 8, name: 'Cowrie Shell Necklace', price: 850, category: 'jewelry', img: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=500&fit=crop', tag: 'Traditional' },
    { id: 9, name: 'Kitenge Midi Dress', price: 1700, category: 'dress', img: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&h=500&fit=crop', tag: 'Bestseller' },
    { id: 10, name: 'African Turquoise Ring', price: 580, category: 'jewelry', img: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=500&fit=crop', tag: 'Unique' },
    { id: 11, name: 'Batik Wrap Dress', price: 1550, category: 'dress', img: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=500&fit=crop', tag: 'New' },
    { id: 12, name: 'Tribal Print Headwrap', price: 450, category: 'accessories', img: 'https://images.unsplash.com/photo-1596783074918-c84cb06531ca?w=400&h=500&fit=crop', tag: 'Stylish' }
  ];

  const [products, setProducts] = useState(defaultProducts);

  const addToCart = (product) => {
    setCart([...cart, product]);
    alert(`${product.name} added to cart!`);
  };

  const toggleWishlist = (productId) => {
    if (wishlist.includes(productId)) {
      setWishlist(wishlist.filter(id => id !== productId));
    } else {
      setWishlist([...wishlist, productId]);
    }
  };

  const handleImageUpload = (productId, event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCustomImages({
          ...customImages,
          [productId]: e.target.result
        });
        setProducts(products.map(p => 
          p.id === productId ? { ...p, img: e.target.result } : p
        ));
      };
      reader.readAsDataURL(file);
    }
  };

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  const scrollToSection = (sectionId) => {
    setMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const cartTotal = cart.reduce((total, item) => total + item.price, 0);

  const placeOrder = () => {
    if (!orderDetails.name || !orderDetails.phone || !orderDetails.address) {
      alert('Please fill in all delivery details!');
      return;
    }
    
    const orderSummary = `
🛍️ NEW ORDER - SEYSOWE BRANDING

👤 Customer: ${orderDetails.name}
📞 Phone: ${orderDetails.phone}
📍 Address: ${orderDetails.address}
💳 Payment: ${orderDetails.paymentMethod.toUpperCase()}

📦 ITEMS (${cart.length}):
${cart.map((item, i) => `${i + 1}. ${item.name} - D${item.price}`).join('\n')}

💰 TOTAL: D${cartTotal}

✅ Order placed successfully! We'll deliver to your address.
    `;
    
    const whatsappMessage = encodeURIComponent(orderSummary);
    window.open(`https://wa.me/7100554?text=${whatsappMessage}`, '_blank');
    
    setCart([]);
    setShowCheckout(false);
    setOrderDetails({ name: '', phone: '', address: '', paymentMethod: 'wave' });
    alert('Order placed! We will contact you shortly for payment confirmation.');
  };

  const getBusinessStatus = () => {
    const now = new Date();
    const day = now.getDay();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const currentTime = hours + minutes / 60;

    if (day === 0) {
      return { isOpen: false, message: '❌ Closed - Sunday (Rest Day)' };
    }
    
    if (day >= 1 && day <= 5) {
      if (currentTime >= 10 && currentTime < 21) {
        return { isOpen: true, message: '✅ Open Now - Mon-Fri: 10:00 AM - 9:00 PM' };
      }
      return { isOpen: false, message: '❌ Closed - Opens Mon-Fri at 10:00 AM' };
    }
    
    if (day === 6) {
      if (currentTime >= 10.5 && currentTime < 20.5) {
        return { isOpen: true, message: '✅ Open Now - Saturday: 10:30 AM - 8:30 PM' };
      }
      return { isOpen: false, message: '❌ Closed - Opens Saturday at 10:30 AM' };
    }

    return { isOpen: false, message: '❌ Closed' };
  };

  const businessStatus = getBusinessStatus();

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-purple-50">
      {/* Floating Contact Buttons */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
        <a 
          href="https://wa.me/7100554" 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-green-500 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform"
          title="WhatsApp: 7100554"
        >
          <MessageCircle className="w-6 h-6" />
        </a>
        <a 
          href="tel:+7100554" 
          className="bg-gradient-to-r from-purple-600 to-rose-500 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform"
          title="Call: 7100554"
        >
          <Phone className="w-6 h-6" />
        </a>
      </div>

      {/* Header */}
      <header className="fixed w-full bg-white/80 backdrop-blur-xl z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-purple-600" />
              <span className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-rose-500 bg-clip-text text-transparent">
                SEYSOWE
              </span>
            </div>
            
            <nav className="hidden md:flex items-center gap-8">
              <button onClick={() => scrollToSection('hero')} className="text-gray-700 hover:text-purple-600 font-medium transition">Home</button>
              <button onClick={() => scrollToSection('categories')} className="text-gray-700 hover:text-purple-600 font-medium transition">Shop</button>
              <button onClick={() => scrollToSection('products')} className="text-gray-700 hover:text-purple-600 font-medium transition">Collection</button>
              <button onClick={() => scrollToSection('newsletter')} className="text-rose-500 font-semibold hover:text-rose-600 transition">Hours & Contact</button>
            </nav>

            <div className="flex items-center gap-4">
              <div className="relative hidden md:block">
                <Heart 
                  className={`w-6 h-6 cursor-pointer transition ${wishlist.length > 0 ? 'text-rose-500 fill-rose-500' : 'text-gray-700 hover:text-rose-500'}`}
                />
                {wishlist.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                    {wishlist.length}
                  </span>
                )}
              </div>
              <div className="relative">
                <ShoppingBag 
                  onClick={() => setShowCheckout(true)}
                  className="w-6 h-6 text-gray-700 hover:text-purple-600 cursor-pointer transition" 
                />
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-gradient-to-r from-purple-600 to-rose-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                    {cart.length}
                  </span>
                )}
              </div>
              <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden">
                {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
          
          {menuOpen && (
            <nav className="md:hidden mt-4 pb-4 space-y-3">
              <button onClick={() => scrollToSection('hero')} className="block text-gray-700 hover:text-purple-600 font-medium transition w-full text-left">Home</button>
              <button onClick={() => scrollToSection('categories')} className="block text-gray-700 hover:text-purple-600 font-medium transition w-full text-left">Shop</button>
              <button onClick={() => scrollToSection('products')} className="block text-gray-700 hover:text-purple-600 font-medium transition w-full text-left">Collection</button>
              <button onClick={() => scrollToSection('newsletter')} className="block text-rose-500 font-semibold hover:text-rose-600 transition w-full text-left">Hours & Contact</button>
            </nav>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section id="hero" className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-block">
                <span className="bg-gradient-to-r from-purple-600 to-rose-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                  ✨ NEW COLLECTION 2024
                </span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black leading-tight">
                Seysowe Branding
                <span className="block bg-gradient-to-r from-purple-600 via-rose-500 to-purple-600 bg-clip-text text-transparent">
                  Collections
                </span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Discover premium African fashion, authentic jewelry, and stylish accessories. Located in Manjai New Road, bringing you the finest in African-inspired elegance and traditional craftsmanship.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => scrollToSection('products')}
                  className="group bg-gradient-to-r from-purple-600 to-rose-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all flex items-center justify-center gap-2"
                >
                  Shop Collection
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button 
                  onClick={() => {
                    setSelectedCategory('jewelry');
                    scrollToSection('products');
                  }}
                  className="border-2 border-purple-600 text-purple-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-purple-50 transition"
                >
                  Explore Jewelry
                </button>
              </div>
              <div className="flex flex-wrap items-center gap-4 md:gap-8 pt-4">
                <div>
                  <div className="text-3xl font-bold text-purple-600">{products.length * 20}+</div>
                  <div className="text-sm text-gray-600">African Styles</div>
                </div>
                <div className="w-px h-12 bg-gray-300 hidden sm:block"></div>
                <div>
                  <div className="text-3xl font-bold text-purple-600">5K+</div>
                  <div className="text-sm text-gray-600">Happy Customers</div>
                </div>
                <div className="w-px h-12 bg-gray-300 hidden sm:block"></div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 md:w-5 md:h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                  <span className="ml-2 text-sm text-gray-600">(4.9)</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 to-rose-400/20 rounded-3xl blur-3xl"></div>
              <div className="relative grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="relative overflow-hidden rounded-3xl shadow-2xl transform hover:scale-105 transition-all duration-500 group">
                    <img 
                      src="https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=400&h=500&fit=crop" 
                      alt="Elegant Dress"
                      className="w-full h-60 md:h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                  <div className="relative overflow-hidden rounded-3xl shadow-2xl transform hover:scale-105 transition-all duration-500 group">
                    <img 
                      src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=300&fit=crop" 
                      alt="Gold Jewelry"
                      className="w-full h-36 md:h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                </div>
                <div className="space-y-4 pt-8 md:pt-12">
                  <div className="relative overflow-hidden rounded-3xl shadow-2xl transform hover:scale-105 transition-all duration-500 group">
                    <img 
                      src="https://images.unsplash.com/photo-1603561596112-0a132b757442?w=400&h=300&fit=crop" 
                      alt="Diamond Ring"
                      className="w-full h-36 md:h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                  <div className="relative overflow-hidden rounded-3xl shadow-2xl transform hover:scale-105 transition-all duration-500 group">
                    <img 
                      src="https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&h=500&fit=crop" 
                      alt="Summer Dress"
                      className="w-full h-60 md:h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section id="categories" className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4">Shop By Category</h2>
            <p className="text-gray-600 text-lg">Explore our African-inspired collections</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <button 
              onClick={() => {
                setSelectedCategory('dress');
                scrollToSection('products');
              }}
              className="group relative overflow-hidden rounded-3xl shadow-xl transform hover:scale-105 transition-all duration-500"
            >
              <img 
                src="https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&h=700&fit=crop" 
                alt="Dresses"
                className="w-full h-80 md:h-96 object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-purple-500 to-pink-500 opacity-60 group-hover:opacity-70 transition-opacity"></div>
              <div className="absolute inset-0 flex items-end p-6 md:p-8">
                <div>
                  <h3 className="text-white text-3xl md:text-4xl font-black mb-2">African Dresses</h3>
                  <div className="bg-white text-gray-900 px-4 md:px-6 py-2 rounded-full font-bold inline-flex items-center gap-2 text-sm md:text-base">
                    Shop Now
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </button>
            
            <button 
              onClick={() => {
                setSelectedCategory('jewelry');
                scrollToSection('products');
              }}
              className="group relative overflow-hidden rounded-3xl shadow-xl transform hover:scale-105 transition-all duration-500"
            >
              <img 
                src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&h=700&fit=crop" 
                alt="Jewelry"
                className="w-full h-80 md:h-96 object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-rose-500 to-orange-500 opacity-60 group-hover:opacity-70 transition-opacity"></div>
              <div className="absolute inset-0 flex items-end p-6 md:p-8">
                <div>
                  <h3 className="text-white text-3xl md:text-4xl font-black mb-2">Jewelry</h3>
                  <div className="bg-white text-gray-900 px-4 md:px-6 py-2 rounded-full font-bold inline-flex items-center gap-2 text-sm md:text-base">
                    Shop Now
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-20 px-6 bg-gradient-to-br from-purple-50 to-rose-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4">Trending Now</h2>
            <p className="text-gray-600 text-lg">Our most loved pieces this season</p>
          </div>

          <div className="flex justify-center gap-2 md:gap-4 mb-12 flex-wrap">
            <button 
              onClick={() => setSelectedCategory('all')}
              className={`px-4 md:px-6 py-2 md:py-3 rounded-full font-bold transition text-sm md:text-base ${selectedCategory === 'all' ? 'bg-gradient-to-r from-purple-600 to-rose-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
            >
              All Products
            </button>
            <button 
              onClick={() => setSelectedCategory('dress')}
              className={`px-4 md:px-6 py-2 md:py-3 rounded-full font-bold transition text-sm md:text-base ${selectedCategory === 'dress' ? 'bg-gradient-to-r from-purple-600 to-rose-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
            >
              African Dresses
            </button>
            <button 
              onClick={() => setSelectedCategory('jewelry')}
              className={`px-4 md:px-6 py-2 md:py-3 rounded-full font-bold transition text-sm md:text-base ${selectedCategory === 'jewelry' ? 'bg-gradient-to-r from-purple-600 to-rose-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
            >
              Jewelry
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {filteredProducts.map((product) => (
              <div key={product.id} className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                <div className="absolute top-2 md:top-4 right-2 md:right-4 z-10">
                  <span className="bg-gradient-to-r from-purple-600 to-rose-500 text-white px-2 md:px-3 py-1 rounded-full text-xs font-bold">
                    {product.tag}
                  </span>
                </div>
                <div className="absolute top-2 md:top-4 left-2 md:left-4 z-10">
                  <button onClick={() => toggleWishlist(product.id)}>
                    <Heart 
                      className={`w-5 h-5 md:w-6 md:h-6 cursor-pointer transition ${wishlist.includes(product.id) ? 'text-rose-500 fill-rose-500' : 'text-white hover:fill-white'}`}
                    />
                  </button>
                </div>
                
                <div className="absolute top-2 md:top-4 right-10 md:right-16 z-10">
                  <label className="cursor-pointer bg-white/90 hover:bg-white p-1.5 md:p-2 rounded-full transition">
                    <Upload className="w-3 h-3 md:w-4 md:h-4 text-purple-600" />
                    <input 
                      type="file" 
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleImageUpload(product.id, e)}
                    />
                  </label>
                </div>

                <div className="relative overflow-hidden">
                  <img 
                    src={customImages[product.id] || product.img} 
                    alt={product.name}
                    className="w-full h-56 md:h-72 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors"></div>
                </div>
                <div className="p-3 md:p-4">
                  <h3 className="font-bold text-gray-800 mb-1 text-sm md:text-base">{product.name}</h3>
                  <div className="flex justify-between items-center">
                    <span className="text-xl md:text-2xl font-black bg-gradient-to-r from-purple-600 to-rose-500 bg-clip-text text-transparent">
                      D{product.price}
                    </span>
                    <button 
                      onClick={() => addToCart(product)}
                      className="bg-gradient-to-r from-purple-600 to-rose-500 text-white p-1.5 md:p-2 rounded-full hover:shadow-lg transition"
                    >
                      <ShoppingBag className="w-3 h-3 md:w-4 md:h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Business Hours & Newsletter */}
      <section id="newsletter" className="py-20 px-6 bg-gradient-to-r from-purple-600 via-rose-500 to-purple-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <Sparkles className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-6" />
          <h2 className="text-4xl md:text-5xl font-black mb-6">Business Hours</h2>
          
          <div className={`inline-block px-4 md:px-6 py-2 md:py-3 rounded-full text-base md:text-lg font-bold mb-6 ${businessStatus.isOpen ? 'bg-green-500' : 'bg-red-500'}`}>
            {businessStatus.message}
          </div>
          
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 md:p-8 mb-8">
            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div>
                <h3 className="font-bold text-lg md:text-xl mb-4">📅 Opening Hours:</h3>
                <ul className="space-y-2 text-sm md:text-base">
                  <li className="flex justify-between">
                    <span>Monday - Friday:</span>
                    <span className="font-bold">10:00 AM - 9:00 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Saturday:</span>
                    <span className="font-bold">10:30 AM - 8:30 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Sunday:</span>
                    <span className="font-bold text-red-300">CLOSED</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-lg md:text-xl mb-4 ">📍 Location:</h3>
                <p className="mb-4 text-sm md:text-base">Manjai New Road, The Gambia</p>
                <h3 className="font-bold text-lg md:text-xl mb-4">📞 Contact:</h3>
                <p className="mb-2 text-sm md:text-base">Phone/WhatsApp: 7100554</p>
                <p className="text-xs md:text-sm opacity-90">💳 We accept: Wave, Cash on Delivery</p>
              </div>
            </div>
          </div>

          <h2 className="text-3xl md:text-4xl font-black mb-4">Join Our Community</h2>
          <p className="text-lg md:text-xl mb-8 opacity-90">Get exclusive updates on new African fashion arrivals!</p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email"
              className="flex-1 px-4 md:px-6 py-3 md:py-4 rounded-full text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-white/50 text-sm md:text-base"
            />
            <button 
              onClick={() => alert('Thanks for subscribing to Seysowe!')}
              className="bg-white text-purple-600 px-6 md:px-8 py-3 md:py-4 rounded-full font-bold hover:bg-gray-100 transition text-sm md:text-base"
            >
              Subscribe Now
            </button>
          </div>
        </div>
      </section>

      {/* 🛒 CHECKOUT MODAL */}
      {showCheckout && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-r from-purple-600 to-rose-500 text-white p-4 md:p-6 rounded-t-3xl">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl md:text-3xl font-black">Your Cart ({cart.length})</h2>
                <button onClick={() => setShowCheckout(false)} className="hover:scale-110 transition">
                  <X className="w-6 h-6 md:w-8 md:h-8" />
                </button>
              </div>
            </div>

            <div className="p-4 md:p-6">
              {cart.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingBag className="w-20 h-20 md:w-24 md:h-24 mx-auto text-gray-300 mb-4" />
                  <p className="text-lg md:text-xl text-gray-600">Your cart is empty</p>
                  <button 
                    onClick={() => setShowCheckout(false)}
                    className="mt-6 bg-gradient-to-r from-purple-600 to-rose-500 text-white px-6 md:px-8 py-2 md:py-3 rounded-full font-bold hover:shadow-lg transition text-sm md:text-base"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <>
                  {/* Cart Items */}
                  <div className="space-y-4 mb-6">
                    {cart.map((item, index) => (
                      <div key={index} className="flex items-center gap-3 md:gap-4 bg-gray-50 p-3 md:p-4 rounded-2xl">
                        <img src={item.img} alt={item.name} className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-xl" />
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-800 text-sm md:text-base">{item.name}</h3>
                          <p className="text-purple-600 font-bold text-sm md:text-base">D{item.price}</p>
                        </div>
                        <button 
                          onClick={() => setCart(cart.filter((_, i) => i !== index))}
                          className="text-red-500 hover:bg-red-50 p-2 rounded-full transition"
                        >
                          <X className="w-4 h-4 md:w-5 md:h-5" />
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Delivery Details */}
                  <div className="bg-purple-50 p-4 md:p-6 rounded-2xl mb-6">
                    <h3 className="text-lg md:text-xl font-bold mb-4">📦 Delivery Details</h3>
                    <div className="space-y-3 md:space-y-4">
                      <input
                        type="text"
                        placeholder="Your Full Name"
                        value={orderDetails.name}
                        onChange={(e) => setOrderDetails({...orderDetails, name: e.target.value})}
                        className="w-full px-3 md:px-4 py-2 md:py-3 rounded-xl border-2 border-purple-200 focus:border-purple-500 focus:outline-none text-sm md:text-base"
                      />
                      <input
                        type="tel"
                        placeholder="Phone Number"
                        value={orderDetails.phone}
                        onChange={(e) => setOrderDetails({...orderDetails, phone: e.target.value})}
                        className="w-full px-3 md:px-4 py-2 md:py-3 rounded-xl border-2 border-purple-200 focus:border-purple-500 focus:outline-none text-sm md:text-base"
                      />
                      <textarea
                        placeholder="Delivery Address (Include landmarks)"
                        value={orderDetails.address}
                        onChange={(e) => setOrderDetails({...orderDetails, address: e.target.value})}
                        className="w-full px-3 md:px-4 py-2 md:py-3 rounded-xl border-2 border-purple-200 focus:border-purple-500 focus:outline-none h-20 md:h-24 resize-none text-sm md:text-base"
                      />
                      
                      <div>
                        <label className="block text-xs md:text-sm font-bold text-gray-700 mb-2">💳 Payment Method:</label>
                        <div className="grid grid-cols-2 gap-3 md:gap-4">
                          <button
                            onClick={() => setOrderDetails({...orderDetails, paymentMethod: 'wave'})}
                            className={`p-3 md:p-4 rounded-xl border-2 font-bold transition text-sm md:text-base ${orderDetails.paymentMethod === 'wave' ? 'border-purple-500 bg-purple-50 text-purple-700' : 'border-gray-200 hover:border-purple-300'}`}
                          >
                            📱 Wave
                          </button>
                          <button
                            onClick={() => setOrderDetails({...orderDetails, paymentMethod: 'cash'})}
                            className={`p-3 md:p-4 rounded-xl border-2 font-bold transition text-sm md:text-base ${orderDetails.paymentMethod === 'cash' ? 'border-purple-500 bg-purple-50 text-purple-700' : 'border-gray-200 hover:border-purple-300'}`}
                          >
                            💵 Cash
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Order Summary */}
                  <div className="bg-gradient-to-r from-purple-600 to-rose-500 text-white p-4 md:p-6 rounded-2xl mb-6">
                    <div className="flex justify-between items-center text-lg md:text-xl font-bold">
                      <span>Total Amount:</span>
                      <span className="text-2xl md:text-3xl">D{cartTotal}</span>
                    </div>
                    <p className="text-xs md:text-sm mt-2 opacity-90">
                      Payment via {orderDetails.paymentMethod.toUpperCase()} • Free delivery within Serekunda
                    </p>
                  </div>

                  {/* Place Order Button */}
                  <button
                    onClick={placeOrder}
                    className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 md:py-4 rounded-full font-bold text-base md:text-lg hover:shadow-2xl hover:scale-105 transition-all flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-5 h-5 md:w-6 md:h-6" />
                    Place Order via WhatsApp
                  </button>
                  <p className="text-center text-xs md:text-sm text-gray-500 mt-4">
                    Your order will be sent to our WhatsApp. We'll confirm and deliver to your address.
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-purple-400" />
                <span className="text-xl md:text-2xl font-bold">SEYSOWE</span>
              </div>
              <p className="text-gray-400 text-xs md:text-sm">Seysowe Branding - Premium fashion and jewelry. Located at Manjai New Road, The Gambia. Your destination for elegant style.</p>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-sm md:text-base">Shop</h4>
              <ul className="space-y-2 text-xs md:text-sm text-gray-400">
                <li><button onClick={() => scrollToSection('products')} className="hover:text-white transition">New Arrivals</button></li>
                <li><button onClick={() => { setSelectedCategory('dress'); scrollToSection('products'); }} className="hover:text-white transition">Dresses</button></li>
                <li><button onClick={() => { setSelectedCategory('jewelry'); scrollToSection('products'); }} className="hover:text-white transition">Jewelry</button></li>
                <li><button className="hover:text-white transition">Sale</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-sm md:text-base">Help</h4>
              <ul className="space-y-2 text-xs md:text-sm text-gray-400">
                <li><button className="hover:text-white transition">Contact</button></li>
                <li><button className="hover:text-white transition">Shipping</button></li>
                <li><button className="hover:text-white transition">Returns</button></li>
                <li><button className="hover:text-white transition">FAQ</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-sm md:text-base">Follow Us</h4>
              <p className="text-xs md:text-sm text-gray-400 mb-4">Join our community on social media</p>
              <div className="flex gap-3 mb-4">
                <a href="https://instagram.com/seysowe" target="_blank" rel="noopener noreferrer" className="w-8 h-8 md:w-10 md:h-10 bg-white/10 rounded-full hover:bg-gradient-to-r hover:from-purple-600 hover:to-rose-500 transition flex items-center justify-center" title="Instagram">
                  <Instagram className="w-4 h-4 md:w-5 md:h-5" />
                </a>
                <a href="https://tiktok.com/@seysowe" target="_blank" rel="noopener noreferrer" className="w-8 h-8 md:w-10 md:h-10 bg-white/10 rounded-full hover:bg-gradient-to-r hover:from-purple-600 hover:to-rose-500 transition flex items-center justify-center text-xs font-bold" title="TikTok">
                  TT
                </a>
                <a href="https://snapchat.com/add/seysowe" target="_blank" rel="noopener noreferrer" className="w-8 h-8 md:w-10 md:h-10 bg-white/10 rounded-full hover:bg-gradient-to-r hover:from-purple-600 hover:to-rose-500 transition flex items-center justify-center text-xs font-bold" title="Snapchat">
                  SC
                </a>
                <a href="https://wa.me/7100554" target="_blank" rel="noopener noreferrer" className="w-8 h-8 md:w-10 md:h-10 bg-white/10 rounded-full hover:bg-gradient-to-r hover:from-purple-600 hover:to-rose-500 transition flex items-center justify-center" title="WhatsApp">
                  <MessageCircle className="w-4 h-4 md:w-5 md:h-5" />
                </a>
                <a href="tel:+7100554" className="w-8 h-8 md:w-10 md:h-10 bg-white/10 rounded-full hover:bg-gradient-to-r hover:from-purple-600 hover:to-rose-500 transition flex items-center justify-center" title="Call Us">
                  <Phone className="w-4 h-4 md:w-5 md:h-5" />
                </a>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-2">Contact Us:</p>
                <a href="tel:+7100554" className="text-xs md:text-sm text-white hover:text-purple-400 transition block mb-1">
                  📞 7100554
                </a>
                <p className="text-xs text-gray-400 mb-2">
                  📍 Manjai New Road, The Gambia
                </p>
                <p className="text-xs text-green-400 font-bold">
                  💳 Wave & Cash on Delivery Available
                </p>
                <p className="text-xs text-gray-400 mt-2">
                  🚚 Free Delivery in Serekunda Area
                </p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-xs md:text-sm text-gray-400">
            <p>© 2024 Seysowe. Made with ❤️ for fashion lovers everywhere.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}