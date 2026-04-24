import React from 'react';
import Navbar          from './components/Navbar';
import Hero            from './components/Hero';
import Services        from './components/Services';
import WhyUs           from './components/WhyUs';
import Gallery         from './components/Gallery';
import Testimonials    from './components/Testimonials';
import BrandScroller   from './components/BrandScroller';
import RemoteControls  from './components/RemoteControls';
import Contact         from './components/Contact';
import Footer          from './components/Footer';
import MobileBar       from './components/MobileBar';
import BookingNudge    from './components/BookingNudge';
import LazySection     from './components/LazySection';

export default function App() {
  return (
    <>
      <Navbar />
      <BookingNudge />
      <Hero />
      <Services />
      <WhyUs />
      <LazySection minHeight="500px"><Gallery /></LazySection>
      <LazySection minHeight="300px"><Testimonials /></LazySection>
      <LazySection minHeight="200px"><BrandScroller /></LazySection>
      {/* On mobile: Contact shown above RemoteControls via CSS order */}
      <div className="contact-remote-wrapper">
        <div className="remote-slot">
          <LazySection minHeight="200px"><RemoteControls /></LazySection>
        </div>
        <div className="contact-slot">
          <Contact />
        </div>
      </div>
      <Footer />
      <MobileBar />
    </>
  );
}
