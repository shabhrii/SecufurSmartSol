'use client';

import React from 'react';
import Link from 'next/link';

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 font-sans pb-16">
      {/* Hero Section */}
      <section className="bg-[#002366] text-white py-20 px-6 sm:px-12 text-center relative overflow-hidden">
        <div className="absolute top-[-50%] left-[-20%] w-[80%] h-[150%] bg-blue-900/40 rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-3xl mx-auto relative z-10 space-y-6">
          <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tight font-jakarta">
            About Secufur Smart Solutions
          </h1>
          <p className="text-lg sm:text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
            Pioneering customized battery packs and premium smart electronic solutions engineered for reliability, safety, and ultimate efficiency.
          </p>
        </div>
      </section>

      {/* Main Grid Content */}
      <main className="max-w-4xl mx-auto mt-12 px-6 sm:px-8 space-y-12">
        
        {/* Our Vision */}
        <section className="bg-white border border-slate-200 p-8 sm:p-10 space-y-4 shadow-sm hover:shadow-md transition-shadow">
          <h2 className="text-2xl font-black text-[#002366] uppercase tracking-wide">
            Our Vision
          </h2>
          <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
            At Secufur Smart Solutions, we envision a fully powered, efficient future where high-quality customized power packs and smart electronic assemblies are seamless and accessible. We aim to close the gap between ready-made specifications and bespoke engineering, providing consumers and industrial partners with exactly the power configurations they need.
          </p>
        </section>

        {/* Our Story */}
        <section className="bg-white border border-slate-200 p-8 sm:p-10 space-y-4 shadow-sm hover:shadow-md transition-shadow">
          <h2 className="text-2xl font-black text-[#002366] uppercase tracking-wide">
            Our Story
          </h2>
          <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
            Secufur Smart Solutions was founded to address a critical market demand: robust, secure, and tailor-made battery management setups and advanced electronics modules in India. Over years of iterative prototyping and deep domain engineering, we evolved into a unified marketplace platform where buyers can procure specialized power components, pre-designed modules, and receive high-end design intelligence under one roof.
          </p>
        </section>

        {/* Core Values */}
        <section className="grid sm:grid-cols-3 gap-6">
          <div className="bg-white border border-slate-200 p-6 space-y-2 shadow-sm text-center">
            <div className="w-12 h-12 bg-blue-50 border border-blue-100 text-[#002366] flex items-center justify-center mx-auto text-lg font-bold">01</div>
            <h3 className="font-bold text-slate-800 text-base uppercase">Innovation</h3>
            <p className="text-xs text-slate-500 leading-relaxed">Constant iteration of electrical architectures to maximize energy density and cycle lifetimes.</p>
          </div>
          <div className="bg-white border border-slate-200 p-6 space-y-2 shadow-sm text-center">
            <div className="w-12 h-12 bg-blue-50 border border-blue-100 text-[#002366] flex items-center justify-center mx-auto text-lg font-bold">02</div>
            <h3 className="font-bold text-slate-800 text-base uppercase">Customer Centric</h3>
            <p className="text-xs text-slate-500 leading-relaxed">Designing exactly to specified form factors, cell chemistries, and voltage configurations.</p>
          </div>
          <div className="bg-white border border-slate-200 p-6 space-y-2 shadow-sm text-center">
            <div className="w-12 h-12 bg-blue-50 border border-blue-100 text-[#002366] flex items-center justify-center mx-auto text-lg font-bold">03</div>
            <h3 className="font-bold text-slate-800 text-base uppercase">Security First</h3>
            <p className="text-xs text-slate-500 leading-relaxed">Meticulous thermal layouts and integrated battery protection setups to safeguard all hardware environments.</p>
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-[#f0f4fc] border border-blue-100 p-8 text-center space-y-6">
          <h2 className="text-xl sm:text-2xl font-black text-[#002366] uppercase tracking-wide">
            Need a Customized Solution?
          </h2>
          <p className="text-slate-600 text-sm max-w-xl mx-auto leading-relaxed">
            Our engineers are standing by to design and manufacture bespoke lithium packs, custom BMS modules, or advanced smart circuits to fit your technical criteria.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/buyer/contact" className="bg-[#002366] hover:bg-blue-900 text-white font-bold text-xs tracking-wider uppercase px-6 py-3 shadow-lg">
              Contact Us
            </Link>
            <Link href="/buyer" className="bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold text-xs tracking-wider uppercase px-6 py-3">
              Explore Store
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
