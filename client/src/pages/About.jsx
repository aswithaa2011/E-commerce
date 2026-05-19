import React from 'react';
import { FaLeaf, FaShieldAlt, FaBoxOpen, FaHeart } from 'react-icons/fa';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-purple-900 py-24 sm:py-32">
        <div className="absolute inset-0 opacity-20">
            <svg viewBox="0 0 1024 1024" className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2 -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]" aria-hidden="true">
                <circle cx="512" cy="512" r="512" fill="url(#purple-gradient)" fillOpacity="0.7" />
                <defs>
                    <radialGradient id="purple-gradient">
                        <stop stopColor="#fb7185" />
                        <stop offset="1" stopColor="#a855f7" />
                    </radialGradient>
                </defs>
            </svg>
        </div>
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl drop-shadow-md">
            Redefining <span className="text-pink-300">Beauty</span> 
          </h1>
          <p className="mt-6 text-lg leading-8 text-purple-100 max-w-2xl mx-auto font-medium">
            At Glowra, we believe makeup is more than just color. It's self-expression, confidence, and care wrapped into a premium experience.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl text-purple-900">Our Mission</h2>
                    <p className="mt-6 text-lg leading-8 text-gray-600">
                        Founded in 2026, Glowra set out to shatter the standards of the modern beauty industry. We source only the finest, cruelty-free ingredients to deliver high-performance cosmetics that respect your skin and the environment. 
                    </p>
                    <p className="mt-4 text-base leading-7 text-gray-500">
                        From vibrant eyeshadow palettes to hydrating serums, every product we ship is thoroughly tested, certified authentic, and designed to uplift the everyday routine of millions.
                    </p>
                </div>
                <div className="relative">
                    <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-tr from-purple-200 to-pink-100">
                        <img 
                            src="https://images.unsplash.com/photo-1596462502278-27bf84033054?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                            alt="Beauty products" 
                            className="w-full h-full object-cover mix-blend-multiply opacity-90 transition-transform duration-1000 hover:scale-105"
                        />
                    </div>
                    <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl border border-gray-100">
                        <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">2M+</div>
                        <div className="text-sm font-semibold text-gray-500 mt-1">Happy Customers</div>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="bg-gray-50 py-20 border-t border-purple-100">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-16 shadow-none">The Glowra Promise</h2>
            
            <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
                
                <div className="group bg-white p-8 rounded-[2rem] shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-green-100 text-green-600 transition-transform duration-300 group-hover:-translate-y-2">
                        <FaLeaf size={32} />
                    </div>
                    <h3 className="mt-6 text-xl font-bold text-gray-900">100% Vegan</h3>
                    <p className="mt-2 text-sm text-gray-500">
                        Strictly plant-based formulations with zero animal testing. Ever.
                    </p>
                </div>

                <div className="group bg-white p-8 rounded-[2rem] shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 text-blue-600 transition-transform duration-300 group-hover:-translate-y-2">
                        <FaShieldAlt size={32} />
                    </div>
                    <h3 className="mt-6 text-xl font-bold text-gray-900">Dermatology Tested</h3>
                    <p className="mt-2 text-sm text-gray-500">
                        Safe for all skin types. Clinically tested for allergens.
                    </p>
                </div>

                <div className="group bg-white p-8 rounded-[2rem] shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-yellow-100 text-yellow-600 transition-transform duration-300 group-hover:-translate-y-2">
                        <FaBoxOpen size={32} />
                    </div>
                    <h3 className="mt-6 text-xl font-bold text-gray-900">Eco Packaging</h3>
                    <p className="mt-2 text-sm text-gray-500">
                        We use 80% recycled post-consumer waste for our boxes.
                    </p>
                </div>

                <div className="group bg-white p-8 rounded-[2rem] shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-pink-100 text-pink-600 transition-transform duration-300 group-hover:-translate-y-2">
                        <FaHeart size={32} />
                    </div>
                    <h3 className="mt-6 text-xl font-bold text-gray-900">Made with Love</h3>
                    <p className="mt-2 text-sm text-gray-500">
                        Carefully crafted to bring out your inner confidence.
                    </p>
                </div>

            </div>
        </div>
      </section>

    </div>
  );
};

export default About;
