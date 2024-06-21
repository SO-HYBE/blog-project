"use client"
import NavHead from "../components/NavHead";
import gsap from "gsap";
import { useRef } from "react";
import Footer from "../components/Footer"
import useIsomorphicLayoutEffect from "use-isomorphic-layout-effect";


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

        tl.to(".post-cards", {
          duration:0.8,
          opacity:100,
          stagger:0.15,
          ease: 'power1.in'
        })

      }, postRef);

      return () => ctx.revert(); 
    }
  }, []);


  interface Article {
      id: number;
      author: string;
      title: string;
      content: string;
    }
    
    const articles: Article[] = [
      { id: 1, author: "Ahmed", title: "Article 1", content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit, tenetur error, harum nesciunt ipsum debitis quas aliquid." },
      { id: 2, author: "Ahmed", title: "Article 2", content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit, tenetur error, harum nesciunt ipsum debitis quas aliquid." },
      { id: 3, author: "Ahmed", title: "Article 3", content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit, tenetur error, harum nesciunt ipsum debitis quas aliquid." },
      { id: 4, author: "Ahmed", title: "Article 3", content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit, tenetur error, harum nesciunt ipsum debitis quas aliquid." },
      { id: 5, author: "Ahmed", title: "Article 3", content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit, tenetur error, harum nesciunt ipsum debitis quas aliquid." },
      { id: 6, author: "Ahmed", title: "Article 3", content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit, tenetur error, harum nesciunt ipsum debitis quas aliquid." },
      // Add more articles as needed
    ];
    
    interface CardProps {
      title: string;
      content: string;
      author: string;
    }
    
    const Card: React.FC<CardProps> = ({ title, content, author }) => (
      <div className="bg-black text-white p-4 shadow-md rounded-lg border-4 border-white hover:bg-white hover:text-black duration-700 hover:shadow-inner h-[100%]">
        <h2 className="text-xl font-bold mb-2">{title}</h2>
        <p className="truncate">{content}</p>
        <p className="font-bold pt-3">{author}</p>
      </div>
    );


    return(
    <main className="mx-5 h-[100vh]">
      <NavHead />
      
      <div className="blog-posts h-[100vh] mt-52 font-oswald z-20 bg-black relative" ref={postRef}>
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
          {articles.map((article) => (
            <a className="post-cards opacity-0" href={`/posts/${article.id}`}><Card key={article.id} title={article.title} content={article.content} author={article.author} /></a>
          ))}
        </div>
      </div>
      </div>

      <Footer/>
  </main>
    )
}