"use client"
import Image from "next/image"
import mainLogo from "../../public/logo-white.png"
import gsap from "gsap";
import { useEffect, useRef } from "react";

export default function NavHead() {
  const headRef = useRef(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Ensure GSAP animations are added after the component mounts
      const ctx = gsap.context(() => {
        let tl2 = gsap.timeline();
        tl2.to(".head-img", { x: 0, duration: 1, autoAlpha: 1, delay: 1.5, ease: "sine.in"});
        gsap.to(".menu-item",{x: 0, duration: 1, autoAlpha: 1, ease: "sine.in", delay: 1.5});
      }, headRef);

      return () => ctx.revert(); // Clean up GSAP context on unmount
    }
  }, []);

  return (
    <nav className="top-0 left-0 py-5 w-full flex flex-row justify-between overflow-x-hidden fixed z-20" ref={headRef}>
      <a className="head-img" href="/"><Image priority className="top-0 left-0 h-auto w-auto" src={mainLogo} alt={"White logo of BNW"} width={180} height={180} /></a>
      <div className="flex items-center justify-center">
        <div className="nav-menu grid grid-cols-2 text-white gap-y-7 gap-x-10 h-fit w-fit align-middle text-center font-oswald">
          <span><a className="menu-item" href="/">Home</a></span>
          <span><a className="menu-item" href="/post">Blogs</a></span>
          <span><a className="menu-item" href="/create">Create</a></span>
          <span><a className="menu-item" href="/">Github</a></span>
        </div>
      </div>
    </nav>
  );
}
