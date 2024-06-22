"use client"
import NavHead from "../components/NavHead";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import Footer from "../components/Footer"
import useIsomorphicLayoutEffect from "use-isomorphic-layout-effect";
import Link from "next/link";


export default function Post() {

  const postRef = useRef(null);

  useIsomorphicLayoutEffect(() => {
    if (typeof window !== 'undefined') {
      
      const ctx = gsap.context(() => {
        const tl = gsap.timeline();

        tl.to(".title-post", { 
          y: 0, 
          duration: 1, 
          autoAlpha: 1, 
          stagger: 0.25,
          ease: 'power1.in',
        });

      }, postRef);

      return () => ctx.revert(); 
    }
  }, []);


  interface Post {
      id: number;
      author: string;
      title: string;
      content: string;
    }

    const [posts, setPosts] = useState<Post[]>([]);
    
    useEffect(() => {
      fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.json())
        .then(data => {
          const formattedData = data.map((item: any) => ({
            id: item.id,
            author: `User ${item.userId}`,
            title: item.title,
            content: item.body,
          }));
          setPosts(formattedData);
        });
    }, []);
    

    const Card: React.FC<Post> = ({ title, content, author }) => (
      <div className="bg-black text-white p-4 shadow-md rounded-lg border-4 border-white hover:bg-white hover:text-black duration-700 hover:shadow-inner h-[100%]">
        <h2 className="text-xl font-bold mb-2">{title}</h2>
        <p className="truncate">{content}</p>
        <p className="font-bold pt-3">{author}</p>
      </div>
    );


    return(
    <main className="mx-5 h-[100vh]">
      <NavHead />
      
      <div className="blog-posts min-h-[550vh] pb-[10rem] h-fit mb-20 mt-52 font-oswald z-20 bg-black relative" ref={postRef}>
        <div className="title-container flex flex-row items-center justify-center whitespace-pre cursor-default pb-20">
          <span className="title-post text-white font-oswald text-6xl hover:text-black">Take </span>
          <span className="title-post text-white font-oswald text-6xl hover:text-black">A </span>
          <span className="title-post text-white font-oswald text-6xl hover:text-black">Tour </span>
          <span className="title-post text-white font-oswald text-6xl hover:text-black">Over </span>
          <span className="title-post text-white font-oswald text-6xl hover:text-black">All </span>
          <span className="title-post text-white font-oswald text-6xl hover:text-black">Posts</span>
        </div>
        <div className="posts-container mx-auto p-4 relative pb-20">
        <div className="cards-container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {posts.map((post) => (
              <Link legacyBehavior key={post.id} href={`/blogpost/${post.id}`}>
                <a>
                  <Card title={post.title} content={post.content} author={post.author} id={post.id} />
                </a>
              </Link>
            ))}
          </div>
      </div>
      </div>

      <Footer />
  </main>
    )
}