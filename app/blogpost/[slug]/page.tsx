"use client"
import React, { useEffect, useRef, useState } from "react";
import { useParams } from 'next/navigation'
import NavHead from "../../components/NavHead";
import Footer from "../../components/Footer";
import useIsomorphicLayoutEffect from "use-isomorphic-layout-effect";
import gsap from "gsap";

export default function BlogPost() {
  const params = useParams();
  const { slug } = params;
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const slugRef  = useRef(null);

  useIsomorphicLayoutEffect(() => {
    if (typeof window !== 'undefined') {
      const ctx = gsap.context(() => { 
      const tl = gsap.timeline();
        setTimeout(function() {
          tl.to(".post-item", {
            duration: 4,
            autoAlpha: 1,
            stagger: 0.25,
            ease: 'power1.in',
          });
        }, 500);
       
      }, slugRef);

      return () => ctx.revert();
    }
  }, []);

  useEffect(() => {
    if (slug) {
      fetch(`https://jsonplaceholder.typicode.com/posts/${slug}`)
        .then((response) => response.json())
        .then((data) => {
          setPost(data);
          setLoading(false);
        });
    }
  }, [slug]);

  if (loading) {
    return (
      <main className="h-screen mx-5 font-oswald bg-black flex items-center justify-center">
        <NavHead />
        <div>Loading...</div>
        <Footer />
      </main>
    );
  }

  if (!post) {
    return (
      <main className="h-screen mx-5 font-oswald bg-black flex items-center justify-center">
        <NavHead />
        <div>Post not found.</div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="font-oswald mx-5 h-[100vh]">
      <NavHead />
      <div className=" min-h-screen h-fit mb-20 font-oswald z-20 bg-black relative flex flex-col justify-center items-center" ref={slugRef}>
        <h1   className="text-white text-6xl capitalize hover:text-black post-title cursor-default post-item">{post.title}</h1>
        <p  className="text-white font-bold text-3xl mt-3 post-item">By {post.userId}</p>
        <hr  className="my-4" />
        <div  className="text-white text-2xl post-item">{post.body}.</div>
      </div>
      <Footer />
    </main>
  );
}
