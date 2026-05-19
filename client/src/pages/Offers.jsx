import { PRODUCTS } from "../data/products";
import { Link } from "react-router-dom";
import { FaFire } from "react-icons/fa";

const Offers = () => {
  // Filter products that have a 50% discount to show as "Hot Offers"
  const hotOffers = PRODUCTS.filter((item) => item.percent === "50% OFF");

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Banner for Offers */}
      <div className="relative overflow-hidden bg-purple-900 py-16 sm:py-24">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1512496015851-a1c81da53a39?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
        
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-pink-500/20 px-4 py-1.5 text-sm font-semibold text-pink-300 ring-1 ring-inset ring-pink-500/30 backdrop-blur-sm mb-6">
                <FaFire className="text-orange-400" /> Limited Time Event
            </span>
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl">
                Premium Beauty <span className="text-pink-400">Clearance</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-purple-200">
                Upgrade your makeup collection with our biggest sale of the season. Up to 50% off on all trending and premium essentials.
            </p>
        </div>
      </div>

      {/* Offers List */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:py-12">
        <div className="mb-10 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">Flash Deal Items</h2>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {hotOffers.map((offer, index) => (
                <div key={index} className="group relative overflow-hidden rounded-[2rem] bg-gray-50 shadow-sm transition-all hover:shadow-2xl">
                    <div className="absolute top-4 right-4 z-10 rounded-full bg-red-600 px-3 py-1 text-xs font-black text-white shadow-lg shadow-red-600/30">
                        {offer.percent}
                    </div>
                    
                    <div className="aspect-[4/5] w-full overflow-hidden bg-white">
                        <img 
                            src={offer.img} 
                            alt={offer.name}
                            className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                        />
                    </div>
                    
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-white via-white/95 to-transparent pt-12 pb-6 px-6 backdrop-blur-sm transition-all">
                        <h3 className="text-lg font-bold text-gray-900 mb-1">{offer.name}</h3>
                        <div className="flex items-baseline gap-3 mb-4">
                            <span className="text-2xl font-black text-purple-700">Rs. {offer.price}</span>
                            <span className="text-sm font-semibold text-gray-400 line-through">Rs. {offer.offprice}</span>
                        </div>
                        
                        <Link to="/" className="flex w-full items-center justify-center rounded-xl bg-gray-900 py-3 text-sm font-semibold text-white transition-colors hover:bg-purple-700">
                            Shop Now
                        </Link>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Offers;
