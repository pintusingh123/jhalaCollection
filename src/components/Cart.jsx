import { useState } from "react";
import Layout from "./Layout";
import { Link } from "react-router-dom";

function Cart() {
  const [products, setProducts] = useState([
    {
      title: "premium shirt",

      price: 20000,
      discount: 15,
      image: "/images/a.jpeg",
    },
    {
      title: "Nokia Phone",

      price: 20000,
      discount: 15,
      image: "/images/b.jpeg",
    },
    {
      title: "Samsung Galaxy",

      price: 35000,
      discount: 10,
      image: "/images/a.jpeg",
    },
  ]);

  const total = products.reduce(
    (acc, item) => acc + (item.price - (item.price * item.discount) / 100),
    0,
  );

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1400px] mx-auto">
          {/* Header */}
          <div className="flex items-center gap-3 mb-10">
            <div>
              <div className="flex items-center gap-2">
                <i className="ri-shopping-cart-2-line text-4xl text-yellow-500"></i>
                <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
                  My <span className="text-yellow-500">Cart</span>
                </h1>
              </div>
              <p className="text-gray-500 text-sm mt-1">{products.length} Products Added</p>
            </div>
          </div>

          {/* Empty Cart */}
          {products.length === 0 ? (
            <div className="bg-white rounded-3xl border border-gray-100 shadow-xl p-16 text-center max-w-lg mx-auto">
              <div className="w-20 h-20 bg-yellow-50 text-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                <i className="ri-shopping-cart-line text-4xl"></i>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Your Cart is Empty</h2>
              <p className="text-gray-500 mt-2 text-sm">
                Add some premium items to your collection to continue.
              </p>
              <Link to="/products" className="inline-block mt-8 bg-black text-white px-8 py-3.5 rounded-xl font-bold hover:bg-yellow-500 hover:text-black transition-all duration-300 shadow-md">
                Start Shopping
              </Link>
            </div>
          ) : (
            <>
              {/* Product Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.map((item, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
                  >
                    {/* Product Image */}
                    <div className="h-64 overflow-hidden bg-gray-50 flex items-center justify-center relative">
                      {item.discount > 0 && (
                        <span className="absolute top-3 left-3 bg-red-500 text-white text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider z-10 shadow-sm">
                          {item.discount}% OFF
                        </span>
                      )}
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover hover:scale-108 transition duration-500"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <div>
                        <h2 className="text-lg font-bold text-gray-900 capitalize">
                          {item.title}
                        </h2>

                        <div className="flex items-baseline gap-2 mt-3">
                          <span className="text-2xl font-black text-gray-900">
                            ₹{item.price - (item.price * item.discount) / 100}
                          </span>
                          <del className="text-gray-400 text-sm">₹{item.price}</del>
                        </div>
                      </div>

                      <div className="flex gap-3 mt-6">
                        <button className="flex-1 border border-gray-200 text-red-600 hover:bg-red-50 hover:border-red-500 py-3 rounded-xl font-bold transition duration-200 cursor-pointer">
                          <i className="ri-delete-bin-line mr-1"></i>
                          Remove
                        </button>

                        <button className="flex-1 bg-black text-white hover:bg-yellow-500 hover:text-black py-3 rounded-xl font-bold transition duration-300 cursor-pointer flex items-center justify-center gap-1">
                          <i className="ri-flashlight-line mr-1"></i>
                          View
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {products.length > 0 && (
            <div className="mt-12 w-full bg-white rounded-3xl shadow-xl border border-gray-100 p-8 sm:p-10">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
                <div>
                  <h2 className="text-2xl font-extrabold text-gray-900 flex items-center gap-2">
                    <i className="ri-bill-line text-yellow-500"></i>
                    Order Summary
                  </h2>

                  <p className="text-gray-500 mt-1 text-sm">
                    Review items and details before checkout
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-8 sm:gap-12">
                  <div>
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Products</p>
                    <h3 className="text-xl font-extrabold text-gray-800 mt-1">{products.length}</h3>
                  </div>

                  <div>
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Shipping</p>
                    <h3 className="text-xl font-extrabold text-green-600 mt-1">Free</h3>
                  </div>

                  <div>
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Discount</p>
                    <h3 className="text-xl font-extrabold text-green-600 mt-1">Applied</h3>
                  </div>

                  <div>
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Total Amount</p>
                    <h3 className="text-3xl font-black text-gray-900 mt-1">
                      ₹{total.toLocaleString()}
                    </h3>
                  </div>
                </div>

                <button className="bg-black hover:bg-yellow-500 hover:text-black transition-all duration-300 text-white px-10 py-4 rounded-2xl font-bold shadow-lg hover:shadow-yellow-500/10 cursor-pointer flex items-center justify-center gap-2">
                  <i className="ri-secure-payment-line text-lg"></i>
                  <span>Checkout Order</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default Cart;
