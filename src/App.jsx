import React, { useState } from "react";
import {
  ShoppingBag,
  Menu,
  X,
  Heart,
  ArrowRight,
  Star,
  Sparkles,
  Phone,
  MessageCircle,
  Instagram,
  ZoomIn,
} from "lucide-react";

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showCheckout, setShowCheckout] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [orderDetails, setOrderDetails] = useState({
    name: "",
    phone: "",
    address: "",
    paymentMethod: "wave",
  });

  const defaultProducts = [
    {
      id: 1,
      name: "Ankara Maxi Dress",
      price: 1800,
      category: "dress",
      img: "https://images.unsplash.com/photo-1624206112918-f140f087f9b5?w=400&h=500&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1624206112918-f140f087f9b5?w=800",
        "https://images.unsplash.com/photo-1617019114583-affb34d1b3cd?w=800",
        "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800",
      ],
      tag: "Bestseller",
      description:
        "Beautiful Ankara print maxi dress with vibrant colors and comfortable fit. Perfect for special occasions and celebrations. Made from premium quality African fabric.",
    },
    {
      id: 2,
      name: "Gold Statement Necklace",
      price: 950,
      category: "jewelry",
      img: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=500&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800",
        "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800",
      ],
      tag: "New",
      description:
        "Elegant gold statement necklace that adds glamour to any outfit. Handcrafted with attention to detail and premium materials.",
    },
    {
      id: 3,
      name: "Kente Print Gown",
      price: 2200,
      category: "dress",
      img: "https://images.unsplash.com/photo-1617019114583-affb34d1b3cd?w=400&h=500&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1617019114583-affb34d1b3cd?w=800",
        "https://images.unsplash.com/photo-1624206112918-f140f087f9b5?w=800",
      ],
      tag: "Hot",
      description:
        "Stunning Kente print gown with traditional African patterns. Premium quality fabric and expert tailoring for a perfect fit.",
    },
    {
      id: 4,
      name: "African Beaded Earrings",
      price: 650,
      category: "jewelry",
      img: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=500&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800",
        "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800",
      ],
      tag: "Trending",
      description:
        "Colorful African beaded earrings. Lightweight and comfortable for all-day wear. Handmade by local artisans.",
    },
    {
      id: 5,
      name: "Dashiki Evening Dress",
      price: 1950,
      category: "dress",
      img: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=500&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800",
        "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800",
      ],
      tag: "New",
      description:
        "Elegant Dashiki evening dress perfect for formal events. Features intricate patterns and flowing design.",
    },
    {
      id: 6,
      name: "Wooden Bead Bracelet Set",
      price: 750,
      category: "jewelry",
      img: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=500&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800",
      ],
      tag: "Handmade",
      description:
        "Handcrafted wooden bead bracelet set. Natural materials and authentic African design.",
    },
    {
      id: 7,
      name: "African Print Cocktail Dress",
      price: 1650,
      category: "dress",
      img: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=400&h=500&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=800",
        "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800",
      ],
      tag: "Popular",
      description:
        "Chic cocktail dress with bold African prints. Modern cut with traditional flair.",
    },
    {
      id: 8,
      name: "Cowrie Shell Necklace",
      price: 850,
      category: "jewelry",
      img: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=500&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800",
      ],
      tag: "Traditional",
      description:
        "Traditional cowrie shell necklace. Symbol of wealth and prosperity in African culture.",
    },
    {
      id: 9,
      name: "Kitenge Midi Dress",
      price: 1700,
      category: "dress",
      img: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&h=500&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800",
      ],
      tag: "Bestseller",
      description:
        "Stylish Kitenge midi dress with vibrant colors. Comfortable and fashionable for any occasion.",
    },
    {
      id: 10,
      name: "African Turquoise Ring",
      price: 580,
      category: "jewelry",
      img: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=500&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800",
      ],
      tag: "Unique",
      description:
        "Unique African turquoise ring. Natural stone with beautiful color variations.",
    },
    {
      id: 11,
      name: "Batik Wrap Dress",
      price: 1550,
      category: "dress",
      img: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=500&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800",
      ],
      tag: "New",
      description:
        "Elegant batik wrap dress. Flattering fit and authentic batik patterns.",
    },
    {
      id: 12,
      name: "Tribal Print Headwrap",
      price: 450,
      category: "accessories",
      img: "https://images.unsplash.com/photo-1596783074918-c84cb06531ca?w=400&h=500&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1596783074918-c84cb06531ca?w=800",
      ],
      tag: "Stylish",
      description:
        "Versatile tribal print headwrap. Multiple styling options and vibrant patterns.",
    },
  ];

  const [products, setProducts] = useState(defaultProducts);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const openProductDetail = (product) => {
    setSelectedProduct(product);
    setCurrentImageIndex(0);
    document.body.style.overflow = "hidden";
  };

  const closeProductDetail = () => {
    setSelectedProduct(null);
    document.body.style.overflow = "auto";
  };

  const toggleWishlist = (productId) => {
    if (wishlist.includes(productId)) {
      setWishlist(wishlist.filter((id) => id !== productId));
    } else {
      setWishlist([...wishlist, productId]);
    }
  };

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  const scrollToSection = (sectionId) => {
    setMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const cartTotal = cart.reduce((total, item) => total + item.price, 0);

  const placeOrder = () => {
    if (!orderDetails.name || !orderDetails.phone || !orderDetails.address) {
      alert("Please fill in all delivery details!");
      return;
    }

    const orderSummary = `
🛍️ NEW ORDER - SEYSOWE BRANDING

👤 Customer: ${orderDetails.name}
📞 Phone: ${orderDetails.phone}
📍 Address: ${orderDetails.address}
💳 Payment: ${orderDetails.paymentMethod.toUpperCase()}

📦 ITEMS (${cart.length}):
${cart.map((item, i) => `${i + 1}. ${item.name} - D${item.price}`).join("\n")}

💰 TOTAL: D${cartTotal}

✅ Order placed successfully! We'll deliver to your address.
    `;

    const whatsappMessage = encodeURIComponent(orderSummary);
    window.open(`https://wa.me/6538744?text=${whatsappMessage}`, "_blank");

    setCart([]);
    setShowCheckout(false);
    setOrderDetails({
      name: "",
      phone: "",
      address: "",
      paymentMethod: "wave",
    });
    alert(
      "Order placed! We will contact you shortly for payment confirmation."
    );
  };

  const getBusinessStatus = () => {
    const now = new Date();
    const day = now.getDay();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const currentTime = hours + minutes / 60;

    if (day === 0) {
      return { isOpen: false, message: "❌ Closed - Sunday (Rest Day)" };
    }

    if (day >= 1 && day <= 5) {
      if (currentTime >= 10 && currentTime < 21) {
        return {
          isOpen: true,
          message: "✅ Open Now - Mon-Fri: 10:00 AM - 9:00 PM",
        };
      }
      return {
        isOpen: false,
        message: "❌ Closed - Opens Mon-Fri at 10:00 AM",
      };
    }

    if (day === 6) {
      if (currentTime >= 10.5 && currentTime < 20.5) {
        return {
          isOpen: true,
          message: "✅ Open Now - Saturday: 10:30 AM - 8:30 PM",
        };
      }
      return {
        isOpen: false,
        message: "❌ Closed - Opens Saturday at 10:30 AM",
      };
    }

    return { isOpen: false, message: "❌ Closed" };
  };

  const businessStatus = getBusinessStatus();

  // WhatsApp SVG Icon Component
  const WhatsAppIcon = ({ size = 24 }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="currentColor"
      viewBox="0 0 16 16"
    >
      <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" />
    </svg>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      {/* Floating WhatsApp Button - Optimized for mobile */}
      <a
        href="https://wa.me/6538744"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110 hover:-translate-y-1 shadow-lg"
        style={{
          background: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)",
          boxShadow: "0 4px 20px rgba(37, 211, 102, 0.4)",
        }}
        aria-label="Chat on WhatsApp"
      >
        <WhatsAppIcon size={24} />
      </a>

      {/* Header - Improved mobile spacing */}
      <header className="bg-white/80 backdrop-blur-md shadow-lg sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600" />
              <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-600 to-rose-500 bg-clip-text text-transparent">
                SEYSOWE
              </span>
            </div>

            <nav className="hidden md:flex items-center gap-6 lg:gap-8">
              <button
                onClick={() => scrollToSection("hero")}
                className="text-gray-700 hover:text-purple-600 font-medium transition"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection("categories")}
                className="text-gray-700 hover:text-purple-600 font-medium transition"
              >
                Shop
              </button>
              <button
                onClick={() => scrollToSection("products")}
                className="text-gray-700 hover:text-purple-600 font-medium transition"
              >
                Collection
              </button>
              <button
                onClick={() => scrollToSection("newsletter")}
                className="text-rose-500 font-semibold hover:text-rose-600 transition"
              >
                Hours & Contact
              </button>
            </nav>

            <div className="flex items-center gap-3 sm:gap-4">
              <div className="relative">
                <Heart
                  className={`w-5 h-5 sm:w-6 sm:h-6 cursor-pointer transition ${
                    wishlist.length > 0
                      ? "text-rose-500 fill-rose-500"
                      : "text-gray-700 hover:text-rose-500"
                  }`}
                />
                {wishlist.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-xs w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center font-bold">
                    {wishlist.length}
                  </span>
                )}
              </div>

              <div className="relative">
                <ShoppingBag
                  onClick={() => setShowCheckout(true)}
                  className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700 hover:text-purple-600 cursor-pointer transition"
                />
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-purple-600 text-white text-xs w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center font-bold">
                    {cart.length}
                  </span>
                )}
              </div>

              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden p-1"
              >
                {menuOpen ? (
                  <X className="w-6 h-6 text-gray-700" />
                ) : (
                  <Menu className="w-6 h-6 text-gray-700" />
                )}
              </button>
            </div>
          </div>

          {menuOpen && (
            <div className="md:hidden mt-4 pb-4 space-y-3 border-t pt-4">
              <button
                onClick={() => scrollToSection("hero")}
                className="block text-gray-700 hover:text-purple-600 font-medium transition w-full text-left py-2"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection("categories")}
                className="block text-gray-700 hover:text-purple-600 font-medium transition w-full text-left py-2"
              >
                Shop
              </button>
              <button
                onClick={() => scrollToSection("products")}
                className="block text-gray-700 hover:text-purple-600 font-medium transition w-full text-left py-2"
              >
                Collection
              </button>
              <button
                onClick={() => scrollToSection("newsletter")}
                className="block text-rose-500 font-semibold hover:text-rose-600 transition w-full text-left py-2"
              >
                Hours & Contact
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section - Improved mobile layout */}
      <section
        id="hero"
        className="relative overflow-hidden py-8 sm:py-12 md:py-16 lg:py-24"
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-4">
          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
            <div className="text-center lg:text-left space-y-4 sm:space-y-6">
              <div className="inline-block">
                <span className="bg-gradient-to-r from-purple-600 to-rose-500 text-white text-xs sm:text-sm font-bold px-3 sm:px-4 py-1.5 sm:py-2 rounded-full">
                  ✨ NEW COLLECTION 2024
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 leading-tight">
                Seysowe Branding
                <span className="block bg-gradient-to-r from-purple-600 to-rose-500 bg-clip-text text-transparent mt-1">
                  Collections
                </span>
              </h1>

              <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-xl mx-auto lg:mx-0 px-2 sm:px-0">
                Discover premium African fashion, authentic jewelry, and stylish
                accessories. Located in Manjai New Road, bringing you the finest
                in African-inspired elegance and traditional craftsmanship.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start px-2 sm:px-0">
                <button
                  onClick={() => scrollToSection("products")}
                  className="group bg-gradient-to-r from-purple-600 to-rose-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold text-base sm:text-lg hover:shadow-2xl hover:scale-105 transition-all flex items-center justify-center gap-2"
                >
                  Shop Collection
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition" />
                </button>
                <button
                  onClick={() => {
                    setSelectedCategory("jewelry");
                    scrollToSection("products");
                  }}
                  className="border-2 border-purple-600 text-purple-600 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold text-base sm:text-lg hover:bg-purple-50 transition"
                >
                  Explore Jewelry
                </button>
              </div>

              <div className="flex items-center justify-center lg:justify-start gap-4 sm:gap-6 pt-4">
                <div className="text-center">
                  <div className="text-xl sm:text-2xl md:text-3xl font-bold text-purple-600">
                    {products.length * 20}+
                  </div>
                  <div className="text-gray-500 text-xs sm:text-sm">African Styles</div>
                </div>
                <div className="w-px h-10 sm:h-12 bg-gray-300"></div>
                <div className="text-center">
                  <div className="text-xl sm:text-2xl md:text-3xl font-bold text-rose-500">
                    5K+
                  </div>
                  <div className="text-gray-500 text-xs sm:text-sm">Happy Customers</div>
                </div>
                <div className="w-px h-10 sm:h-12 bg-gray-300"></div>
                <div className="flex items-center gap-0.5 sm:gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-yellow-400"
                    />
                  ))}
                  <span className="text-gray-600 ml-1 text-xs sm:text-sm">(4.9)</span>
                </div>
              </div>
            </div>

            <div className="relative mt-6 lg:mt-0">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 to-rose-400/20 rounded-3xl transform rotate-6"></div>
              <div className="relative grid grid-cols-2 gap-3 sm:gap-4">
                <div className="space-y-3 sm:space-y-4">
                  <div className="rounded-xl sm:rounded-2xl overflow-hidden shadow-xl transform hover:scale-105 transition">
                    <img
                      src={products[0]?.img}
                      alt="Fashion"
                      className="w-full h-40 sm:h-48 md:h-64 object-cover"
                    />
                  </div>
                  <div className="rounded-xl sm:rounded-2xl overflow-hidden shadow-xl transform hover:scale-105 transition">
                    <img
                      src={products[1]?.img}
                      alt="Jewelry"
                      className="w-full h-28 sm:h-32 md:h-40 object-cover"
                    />
                  </div>
                </div>
                <div className="space-y-3 sm:space-y-4 pt-6 sm:pt-8">
                  <div className="rounded-xl sm:rounded-2xl overflow-hidden shadow-xl transform hover:scale-105 transition">
                    <img
                      src={products[2]?.img}
                      alt="Fashion"
                      className="w-full h-28 sm:h-32 md:h-40 object-cover"
                    />
                  </div>
                  <div className="rounded-xl sm:rounded-2xl overflow-hidden shadow-xl transform hover:scale-105 transition">
                    <img
                      src={products[3]?.img}
                      alt="Accessories"
                      className="w-full h-40 sm:h-48 md:h-64 object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories - Improved mobile layout */}
      <section id="categories" className="py-8 sm:py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-3 sm:px-4">
          <div className="text-center mb-6 sm:mb-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-2 sm:mb-3">
              Shop By Category
            </h2>
            <p className="text-gray-500 text-sm sm:text-base">
              Explore our African-inspired collections
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div
              onClick={() => {
                setSelectedCategory("dress");
                scrollToSection("products");
              }}
              className="group relative overflow-hidden rounded-2xl sm:rounded-3xl shadow-xl transform hover:scale-105 transition-all duration-500 cursor-pointer"
            >
              <img
                src="https://images.unsplash.com/photo-1624206112918-f140f087f9b5?w=600"
                alt="Dresses"
                className="w-full h-56 sm:h-64 md:h-80 object-cover group-hover:scale-110 transition duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                <div className="text-white">
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2">
                    African Dresses
                  </h3>
                  <div className="flex items-center gap-2 text-white/80 group-hover:text-white transition text-sm sm:text-base">
                    Shop Now
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-2 transition" />
                  </div>
                </div>
              </div>
            </div>
            <div
              onClick={() => {
                setSelectedCategory("jewelry");
                scrollToSection("products");
              }}
              className="group relative overflow-hidden rounded-2xl sm:rounded-3xl shadow-xl transform hover:scale-105 transition-all duration-500 cursor-pointer"
            >
              <img
                src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600"
                alt="Jewelry"
                className="w-full h-56 sm:h-64 md:h-80 object-cover group-hover:scale-110 transition duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                <div className="text-white">
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2">
                    Jewelry
                  </h3>
                  <div className="flex items-center gap-2 text-white/80 group-hover:text-white transition text-sm sm:text-base">
                    Shop Now
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-2 transition" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section - Improved mobile grid */}
      <section id="products" className="py-8 sm:py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-3 sm:px-4">
          <div className="text-center mb-6 sm:mb-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-2 sm:mb-3">
              Trending Now
            </h2>
            <p className="text-gray-500 text-sm sm:text-base">Our most loved pieces this season</p>
          </div>

          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-6 sm:mb-8">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full font-bold transition text-xs sm:text-sm md:text-base ${
                selectedCategory === "all"
                  ? "bg-gradient-to-r from-purple-600 to-rose-500 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              All Products
            </button>
            <button
              onClick={() => setSelectedCategory("dress")}
              className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full font-bold transition text-xs sm:text-sm md:text-base ${
                selectedCategory === "dress"
                  ? "bg-gradient-to-r from-purple-600 to-rose-500 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              Dresses
            </button>
            <button
              onClick={() => setSelectedCategory("jewelry")}
              className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full font-bold transition text-xs sm:text-sm md:text-base ${
                selectedCategory === "jewelry"
                  ? "bg-gradient-to-r from-purple-600 to-rose-500 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              Jewelry
            </button>
          </div>

          {/* Improved product grid - single column on small phones, 2 on larger phones */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-xl sm:rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 hover:shadow-2xl transition-all duration-300"
              >
                <div
                  onClick={() => openProductDetail(product)}
                  className="cursor-pointer"
                >
                  <div className="relative">
                    <span className="absolute top-2 sm:top-3 left-2 sm:left-3 bg-gradient-to-r from-purple-600 to-rose-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
                      {product.tag}
                    </span>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWishlist(product.id);
                      }}
                      className="absolute top-2 sm:top-3 right-2 sm:right-3 bg-white/90 p-1.5 sm:p-2 rounded-full shadow-lg z-10 hover:scale-110 transition"
                    >
                      <Heart
                        className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${
                          wishlist.includes(product.id)
                            ? "text-rose-500 fill-rose-500"
                            : "text-gray-400"
                        }`}
                      />
                    </button>

                    <div className="aspect-[3/4] overflow-hidden">
                      <img
                        src={product.img}
                        alt={product.name}
                        className="w-full h-full object-cover hover:scale-110 transition duration-500"
                      />
                    </div>
                  </div>

                  <div className="p-2.5 sm:p-3 md:p-4">
                    <h3 className="font-bold text-gray-800 text-xs sm:text-sm md:text-base mb-1 line-clamp-2 min-h-[2.5rem] sm:min-h-[3rem]">
                      {product.name}
                    </h3>

                    <div className="flex items-center justify-between mt-2">
                      <span className="text-base sm:text-lg md:text-xl font-bold bg-gradient-to-r from-purple-600 to-rose-500 bg-clip-text text-transparent">
                        D{product.price}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(product);
                        }}
                        className="bg-gradient-to-r from-purple-600 to-rose-500 text-white p-1.5 sm:p-2 rounded-full hover:shadow-lg transition active:scale-95"
                      >
                        <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Business Hours & Newsletter - Improved mobile layout */}
      <section
        id="newsletter"
        className="py-8 sm:py-12 md:py-16 bg-gradient-to-r from-purple-600 to-rose-500 text-white"
      >
        <div className="max-w-4xl mx-auto px-3 sm:px-4 text-center">
          <Sparkles className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 sm:mb-4 animate-pulse" />
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">Business Hours</h2>

          <div
            className={`inline-block px-4 sm:px-6 py-2 sm:py-3 rounded-full font-bold text-sm sm:text-base md:text-lg mb-6 sm:mb-8 ${
              businessStatus.isOpen ? "bg-green-500" : "bg-red-500"
            }`}
          >
            {businessStatus.message}
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 text-left">
              <div>
                <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">📅 Opening Hours:</h3>
                <div className="space-y-1.5 sm:space-y-2 text-sm sm:text-base">
                  <div className="flex justify-between gap-2">
                    <span>Monday - Friday:</span>
                    <span className="font-bold">10:00 AM - 9:00 PM</span>
                  </div>
                  <div className="flex justify-between gap-2">
                    <span>Saturday:</span>
                    <span className="font-bold">10:30 AM - 8:30 PM</span>
                  </div>
                  <div className="flex justify-between gap-2">
                    <span>Sunday:</span>
                    <span className="font-bold text-red-300">CLOSED</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">📍 Location:</h3>
                <p className="mb-2 text-sm sm:text-base">Sukuta Junction Ba Road, The Gambia</p>
                <h3 className="text-lg sm:text-xl font-bold mb-2">📞 Contact:</h3>
                <p className="mb-2 text-sm sm:text-base">Phone/WhatsApp: 7100554</p>
                <p className="text-sm sm:text-base">💳 We accept: Wave, Cash on Delivery</p>
              </div>
            </div>
          </div>

          <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Join Our Community</h3>
          <p className="text-white/80 mb-4 sm:mb-6 text-sm sm:text-base px-2 sm:px-0">
            Get exclusive updates on new African fashion arrivals!
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <input
              type="email"
              id="subscriber-email"
              placeholder="Enter your email"
              className="px-4 sm:px-6 py-3 rounded-full text-gray-800 w-full sm:w-80 focus:outline-none focus:ring-2 focus:ring-white text-sm sm:text-base"
            />
            <button
              onClick={() => {
                const email = document.getElementById('subscriber-email').value;
                if (email && email.includes('@')) {
                  // Send subscription via WhatsApp
                  const message = `📧 New Newsletter Subscriber - Seysowe Branding\n\n👤 Subscriber Email: ${email}\n\n✅ Please add this email to the mailing list.`;
                  window.open(`https://wa.me/6538744?text=${encodeURIComponent(message)}`, '_blank');
                  
                  document.getElementById('subscriber-email').value = '';
                  alert('Thanks for subscribing to Seysowe! We will add you to our mailing list.');
                } else {
                  alert('Please enter a valid email address');
                }
              }}
              className="bg-white text-purple-600 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold hover:bg-gray-100 transition text-sm sm:text-base whitespace-nowrap"
            >
              Subscribe Now
            </button>
          </div>
        </div>
      </section>

      {/* Product Detail Modal - Improved mobile layout */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4">
          <div className="bg-white rounded-2xl sm:rounded-3xl max-w-4xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white p-3 sm:p-4 border-b flex justify-end z-10">
              <button
                onClick={closeProductDetail}
                className="p-2 hover:bg-gray-100 rounded-full transition active:scale-95"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 p-4 sm:p-6">
              {/* Image Section */}
              <div className="space-y-3 sm:space-y-4">
                <div className="relative rounded-xl sm:rounded-2xl overflow-hidden">
                  <img
                    src={selectedProduct.images[currentImageIndex]}
                    alt={selectedProduct.name}
                    className="w-full aspect-square object-cover"
                  />
                  <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 bg-black/50 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm flex items-center gap-1">
                    <ZoomIn className="w-3 h-3 sm:w-4 sm:h-4" />
                    Tap to zoom
                  </div>
                </div>

                {selectedProduct.images.length > 1 && (
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {selectedProduct.images.map((img, index) => (
                      <img
                        key={index}
                        src={img}
                        alt={`${selectedProduct.name} ${index + 1}`}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg cursor-pointer transition-all flex-shrink-0 ${
                          currentImageIndex === index
                            ? "ring-4 ring-purple-600"
                            : "opacity-60 hover:opacity-100"
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Product Info Section */}
              <div className="space-y-3 sm:space-y-4">
                <div>
                  <span className="bg-gradient-to-r from-purple-600 to-rose-500 text-white text-xs font-bold px-2.5 sm:px-3 py-1 rounded-full">
                    {selectedProduct.tag}
                  </span>
                </div>

                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">
                  {selectedProduct.name}
                </h2>

                <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-600 to-rose-500 bg-clip-text text-transparent">
                  D{selectedProduct.price}
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-yellow-400"
                      />
                    ))}
                  </div>
                  <span className="text-gray-500 text-sm sm:text-base">(4.9) • 200+ reviews</span>
                </div>

                <div>
                  <h3 className="font-bold text-gray-800 mb-2 text-sm sm:text-base">
                    Product Description
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base">{selectedProduct.description}</p>
                </div>

                <p className="text-gray-500 text-sm sm:text-base">
                  Category:{" "}
                  <span className="capitalize font-medium text-gray-700">
                    {selectedProduct.category}
                  </span>
                </p>

                <div className="space-y-2 sm:space-y-3 pt-2 sm:pt-4">
                  <button
                    onClick={() => {
                      addToCart(selectedProduct);
                      closeProductDetail();
                    }}
                    className="w-full bg-gradient-to-r from-purple-600 to-rose-500 text-white py-3 sm:py-4 rounded-full font-bold text-base sm:text-lg hover:shadow-2xl hover:scale-105 transition-all flex items-center justify-center gap-2 active:scale-95"
                  >
                    <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
                    Add to Cart
                  </button>

                  <button
                    onClick={() => toggleWishlist(selectedProduct.id)}
                    className={`w-full py-3 sm:py-4 rounded-full font-bold text-base sm:text-lg border-2 transition-all flex items-center justify-center gap-2 active:scale-95 ${
                      wishlist.includes(selectedProduct.id)
                        ? "bg-rose-50 border-rose-500 text-rose-600"
                        : "border-gray-300 text-gray-700 hover:border-rose-500"
                    }`}
                  >
                    <Heart
                      className={`w-4 h-4 sm:w-5 sm:h-5 ${
                        wishlist.includes(selectedProduct.id)
                          ? "fill-rose-500"
                          : ""
                      }`}
                    />
                    {wishlist.includes(selectedProduct.id)
                      ? "In Wishlist"
                      : "Add to Wishlist"}
                  </button>
                </div>

                <div className="bg-gray-50 rounded-xl p-3 sm:p-4">
                  <p className="text-gray-600 text-xs sm:text-sm mb-2">
                    Need help? Contact us:
                  </p>
                  <div className="flex gap-2 sm:gap-3">
                    <a
                      href="https://wa.me/6538744"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 sm:gap-2 bg-green-500 text-white px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium hover:bg-green-600 transition active:scale-95"
                    >
                      <WhatsAppIcon size={14} />
                      WhatsApp
                    </a>
                    <a
                      href="tel:+6538744"
                      className="flex items-center gap-1.5 sm:gap-2 bg-purple-500 text-white px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium hover:bg-purple-600 transition active:scale-95"
                    >
                      <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      Call
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Checkout Modal - Improved mobile layout */}
      {showCheckout && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4">
          <div className="bg-white rounded-2xl sm:rounded-3xl max-w-lg w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white p-3 sm:p-4 border-b z-10">
              <div className="flex justify-between items-center">
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">
                  Your Cart ({cart.length})
                </h2>
                <button
                  onClick={() => setShowCheckout(false)}
                  className="hover:scale-110 transition active:scale-95 p-1"
                >
                  <X className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
                </button>
              </div>
            </div>

            <div className="p-4 sm:p-6">
              {cart.length === 0 ? (
                <div className="text-center py-8 sm:py-12">
                  <ShoppingBag className="w-12 h-12 sm:w-16 sm:h-16 mx-auto text-gray-300 mb-3 sm:mb-4" />
                  <p className="text-gray-500 text-base sm:text-lg">Your cart is empty</p>
                  <button
                    onClick={() => setShowCheckout(false)}
                    className="mt-4 sm:mt-6 bg-gradient-to-r from-purple-600 to-rose-500 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-bold hover:shadow-lg transition text-sm sm:text-base active:scale-95"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <>
                  {/* Cart Items */}
                  <div className="space-y-2.5 sm:space-y-3 mb-4 sm:mb-6">
                    {cart.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2.5 sm:gap-3 bg-gray-50 p-2.5 sm:p-3 rounded-xl"
                      >
                        <img
                          src={item.img}
                          alt={item.name}
                          className="w-14 h-14 sm:w-16 sm:h-16 object-cover rounded-lg flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-gray-800 text-xs sm:text-sm truncate">
                            {item.name}
                          </h4>
                          <p className="text-purple-600 font-bold text-sm sm:text-base">
                            D{item.price}
                          </p>
                        </div>
                        <button
                          onClick={() =>
                            setCart(cart.filter((_, i) => i !== index))
                          }
                          className="text-red-500 hover:bg-red-50 p-1.5 sm:p-2 rounded-full transition active:scale-95 flex-shrink-0"
                        >
                          <X className="w-4 h-4 sm:w-5 sm:h-5" />
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Delivery Details */}
                  <div className="bg-purple-50 rounded-xl sm:rounded-2xl p-3 sm:p-4 mb-4 sm:mb-6">
                    <h3 className="font-bold text-purple-800 mb-2 sm:mb-3 text-sm sm:text-base">
                      📦 Delivery Details
                    </h3>
                    <div className="space-y-2.5 sm:space-y-3">
                      <input
                        type="text"
                        placeholder="Full Name"
                        value={orderDetails.name}
                        onChange={(e) =>
                          setOrderDetails({
                            ...orderDetails,
                            name: e.target.value,
                          })
                        }
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border-2 border-purple-200 focus:border-purple-500 focus:outline-none text-sm sm:text-base"
                      />
                      <input
                        type="tel"
                        placeholder="Phone Number"
                        value={orderDetails.phone}
                        onChange={(e) =>
                          setOrderDetails({
                            ...orderDetails,
                            phone: e.target.value,
                          })
                        }
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border-2 border-purple-200 focus:border-purple-500 focus:outline-none text-sm sm:text-base"
                      />
                      <textarea
                        placeholder="Delivery Address"
                        value={orderDetails.address}
                        onChange={(e) =>
                          setOrderDetails({
                            ...orderDetails,
                            address: e.target.value,
                          })
                        }
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border-2 border-purple-200 focus:border-purple-500 focus:outline-none h-20 sm:h-24 resize-none text-sm sm:text-base"
                      />

                      <div>
                        <label className="block text-xs sm:text-sm font-bold text-gray-700 mb-2">
                          💳 Payment Method:
                        </label>
                        <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
                          <button
                            onClick={() =>
                              setOrderDetails({
                                ...orderDetails,
                                paymentMethod: "wave",
                              })
                            }
                            className={`p-2.5 sm:p-3 md:p-4 rounded-xl border-2 font-bold transition text-xs sm:text-sm md:text-base active:scale-95 ${
                              orderDetails.paymentMethod === "wave"
                                ? "border-purple-500 bg-purple-50 text-purple-700"
                                : "border-gray-200 hover:border-purple-300"
                            }`}
                          >
                            📱 Wave
                          </button>
                          <button
                            onClick={() =>
                              setOrderDetails({
                                ...orderDetails,
                                paymentMethod: "cash",
                              })
                            }
                            className={`p-2.5 sm:p-3 md:p-4 rounded-xl border-2 font-bold transition text-xs sm:text-sm md:text-base active:scale-95 ${
                              orderDetails.paymentMethod === "cash"
                                ? "border-purple-500 bg-purple-50 text-purple-700"
                                : "border-gray-200 hover:border-purple-300"
                            }`}
                          >
                            💵 Cash
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Order Summary */}
                  <div className="bg-gradient-to-r from-purple-600 to-rose-500 text-white p-4 sm:p-6 rounded-xl sm:rounded-2xl mb-4 sm:mb-6">
                    <div className="flex justify-between items-center text-base sm:text-lg md:text-xl font-bold">
                      <span>Total Amount:</span>
                      <span className="text-xl sm:text-2xl md:text-3xl">D{cartTotal}</span>
                    </div>
                  </div>

                  {/* Place Order Button */}
                  <button
                    onClick={placeOrder}
                    className="w-full bg-gradient-to-r from-purple-600 to-rose-500 text-white py-3 sm:py-4 rounded-full font-bold text-base sm:text-lg hover:shadow-2xl hover:scale-105 transition-all flex items-center justify-center gap-2 active:scale-95"
                  >
                    <WhatsAppIcon size={18} />
                    Place Order via WhatsApp
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Footer - Improved mobile layout */}
      <footer className="bg-gray-900 text-white py-6 sm:py-8">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
            <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" />
            <span className="text-lg sm:text-xl font-bold">SEYSOWE</span>
          </div>
          <p className="text-gray-400 mb-3 sm:mb-4 text-sm sm:text-base">
            Premium African Fashion & Jewelry
          </p>
          <div className="flex justify-center gap-3 sm:gap-4 mb-3 sm:mb-4">
            <a
              href="https://wa.me/6538744"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 sm:p-2.5 bg-green-500 rounded-full hover:bg-green-600 transition active:scale-95"
            >
              <WhatsAppIcon size={18} />
            </a>
            <a
              href="https://instagram.com/seysowe"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 sm:p-2.5 bg-pink-500 rounded-full hover:bg-pink-600 transition active:scale-95"
            >
              <Instagram className="w-4 h-4 sm:w-5 sm:h-5" />
            </a>
            <a
              href="tel:+6538744"
              className="p-2 sm:p-2.5 bg-purple-500 rounded-full hover:bg-purple-600 transition active:scale-95"
            >
              <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
            </a>
          </div>
          <p className="text-gray-500 text-xs sm:text-sm">
            © {new Date().getFullYear()} Seysowe Branding. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
