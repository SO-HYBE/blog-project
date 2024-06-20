"use client"
import NavHead from "./components/header";
import gsap from "gsap";
import { useEffect, useRef } from "react";

export default function Home() {
  const elementsRef = useRef(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Ensure GSAP animations are added after the component mounts
      const ctx = gsap.context(() => {
        let tl2 = gsap.timeline();
        tl2.to(".hero-span", { y: 0, duration: 0.8, autoAlpha: 1 , stagger: 0.5});
      }, elementsRef);

      return () => ctx.revert(); // Clean up GSAP context on unmount
    }
  }, []);

  return (
    <main className="homepage mx-5 h-full">
      <NavHead/>
      <div className="hero-section h-[100vh]">
        <div className="hero-text flex flex-row top-0 left-0 whitespace-pre w-full h-[60%] items-center justify-center hover:cursor-default" ref={elementsRef}>
          <span className="hero-span text-white font-oswald text-6xl hover:text-black">Explore </span>
          <span className="hero-span text-white font-oswald text-6xl hover:text-black">The </span>
          <span className="hero-span text-white font-oswald text-6xl hover:text-black">Unknown</span>
        </div>
      </div>
    </main>
  );
}
