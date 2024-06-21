"use client"
import NavHead from "./components/NavHead";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useRef } from "react";
import useIsomorphicLayoutEffect from "use-isomorphic-layout-effect";
import Image from "next/image";
import bgGif from "../public/bg-vid.gif"
import Cards from "./components/Cards"
import Footer from "./components/Footer"

export default function Home() {
  const elementsRef = useRef(null);
  gsap.registerPlugin(ScrollTrigger);

  useIsomorphicLayoutEffect(() => {
    if (typeof window !== 'undefined') {
      
      const ctx = gsap.context(() => {
        const tl = gsap.timeline();

        tl.set(".hero-span", {
          y: 100
        });
  
        tl.to(".bg-gif", {
          filter:"none",
          duration:1,
        });

        tl.to(".hero-span", { 
          y: 0, 
          duration: 1, 
          autoAlpha: 1, 
          stagger: 0.25, 
          delay: 0.2,
          ease: 'power1.in'
        });

        tl.to(".hero-span", {
          y: -200, 
          opacity: 0,
          stagger: 0.25,
          scrollTrigger: {
            trigger: ".hero-span",
            start: "-20% 50%",
            end: "120% 30%",
            scrub: true
          }
        });

      }, elementsRef);

      return () => ctx.revert(); 
    }
  }, []);

  return (
    <main className="homepage h-full">
      <NavHead />
      <div className="home-container mb-32 relative" ref={elementsRef}>

      <div className="h-[100vh]">
        <Image className="absolute bg-gif blur-xl" src={bgGif} alt="background gif" fill={true} style={{objectFit:"cover"}} sizes="100%"></Image>
      </div>

      <div className="hero-section h-[100vh] relative flex flex-row items-center justify-center">
        <div className="hero-text relative flex flex-row whitespace-pre w-full h-full items-center justify-center hover:cursor-default">
          <a className="hero-span relative top-[30%] " href="/post"><span className="text-white font-oswald text-6xl hover:text-black hover:text-[3.5rem] duration-500">Explore </span></a>
          <span className="hero-span text-white font-oswald text-6xl relative top-[30%] hover:text-black">The </span>
          <a className="hero-span relative top-[30%] " href="/create"><span className="text-white font-oswald text-6xl hover:text-black hover:text-[4rem] duration-500">Unknown</span></a>
        </div>
      </div>

      <Cards />

      </div>

      <Footer />
    
    </main>
  );
}
