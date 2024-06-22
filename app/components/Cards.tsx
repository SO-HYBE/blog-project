"use client"
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "gsap/all";
import Link from "next/link";

export default function Cards (){

    const cardsRef = useRef(null);
    gsap.registerPlugin(ScrollTrigger);
  
    useEffect(() => {
      if (typeof window !== 'undefined') {
        
        const ctx = gsap.context(() => {
          const tl = gsap.timeline();

          
          tl.from(".recent-title", {
            y:-100,
            opacity:0,
            scrollTrigger: {
              trigger: ".title-container",
              start: "-10% center",
              end: "150% center",
              scrub: true
            }
          })
  
        }, cardsRef);
  
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
        <div className="blog-posts h-fit mx-5 mt-52 font-oswald z-20 min-h-[520vh] pb-[10rem]" ref={cardsRef}>
        <div className="title-container flex flex-row items-center justify-center whitespace-pre cursor-default">
          <span className="recent-title text-white font-oswald text-4xl hover:text-black">Dive </span>
          <span className="recent-title text-white font-oswald text-4xl hover:text-black">into </span>
          <span className="recent-title text-white font-oswald text-4xl hover:text-black">the </span>
          <span className="recent-title text-white font-oswald text-4xl hover:text-black">Unknown</span>
        </div>
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
    )
}