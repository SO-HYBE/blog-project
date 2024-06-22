"use client"
import Image from "next/image"
import mainLogo from "../../public/logo-white.png"
import gsap from "gsap";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

export default function NavHead() {
  const headRef = useRef(null);
  const pathname = usePathname();
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const ctx = gsap.context(() => {
        let tl2 = gsap.timeline();
          const handleRouteChange = (url : string) => {
            console.log('App is changing to: ', url);

            if (url === '/') {
              tl2.to(".head-img", { x: 0, duration: 1, autoAlpha: 1, delay: 4, ease: "power1.in"});
              gsap.to(".menu-item",{x: 0, duration: 1, autoAlpha: 1, ease: "power1.in", delay: 3.9});
            }else{
              tl2.to(".head-img", { x: 0, duration: 1, autoAlpha: 1, delay: 0.5, ease: "power1.in"});
              gsap.to(".menu-item",{x: 0, duration: 1, autoAlpha: 1, ease: "power1.in", delay: 0.4});
            }
          };

          handleRouteChange(pathname);

          const handlePathChange = () => {
            handleRouteChange(pathname);
          };
      
          const observer = new MutationObserver(handlePathChange);
          observer.observe(document, {
            subtree: true,
            childList: true,
          });
          
          return () => {
            observer.disconnect();
          };
      
      }, headRef);

      return () => ctx.revert();
    }
  }, [pathname]);

  return (
    <nav className="top-0 left-0 pt-5 flex flex-row justify-between overflow-x-hidden z-50 fixed px-5 w-full mix-blend-difference" ref={headRef}>
      <a className="head-img" href="/"><Image priority className="top-0 left-0 h-auto w-auto hover:opacity-[80%]" src={mainLogo} alt={"White logo of BNW"} width={180} height={180} /></a>
      <div className="flex items-center justify-center">
        <div className="nav-menu grid grid-cols-2 text-white gap-y-7 gap-x-10 h-fit w-fit align-middle text-center font-oswald">
          <span><a className="menu-item" href="/">Home</a></span>
          <span><a className="menu-item" href="/post">Blogs</a></span>
          <span><a className="menu-item" href="/create">Create</a></span>
          <span><a className="menu-item" href="https://github.com/SO-HYBE">Github</a></span>
        </div>
      </div>
    </nav>
  );
}
