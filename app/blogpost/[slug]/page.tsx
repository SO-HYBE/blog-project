"use client"
import React, { useEffect, useRef, useState } from "react";
import { useParams } from 'next/navigation'
import NavHead from "../../components/NavHead";
import Footer from "../../components/Footer";

export default function BlogPost() {
  const params = useParams();
  const { slug } = params;
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

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
    <main className="min-h-screen flex flex-col mx-5 font-oswald bg-black relative top-[10vh]">
      <NavHead />
      <div className="flex-grow flex items-center justify-center flex-col py-8">
        <h1  id="post-item"  className="text-white text-6xl capitalize hover:text-black post-title cursor-default">{post.title}</h1>
        <p id="post-item"  className="text-white font-bold text-3xl mt-3">by {post.userId}</p>
        <hr id="post-item"  className="my-4" />
        <div  id="post-item" className="text-white text-2xl">{post.body}</div>
      </div>
      <Footer />
    </main>
  );
}
