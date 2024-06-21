import gsap from "gsap";
import ScrollTrigger from "gsap/all";
import { useEffect, useRef } from "react";

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
        <div className="blog-posts h-fit mx-5 mt-52 font-oswald z-20" ref={cardsRef}>
        <div className="title-container flex flex-row items-center justify-center whitespace-pre cursor-default">
          <span className="recent-title text-white font-oswald text-4xl hover:text-black">Dive </span>
          <span className="recent-title text-white font-oswald text-4xl hover:text-black">into </span>
          <span className="recent-title text-white font-oswald text-4xl hover:text-black">the </span>
          <span className="recent-title text-white font-oswald text-4xl hover:text-black">Unknown</span>
        </div>
        <div className="container mx-auto p-4 relative pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {articles.map((article) => (
            <Card key={article.id} title={article.title} content={article.content} author={article.author} />
          ))}
        </div>
      </div>
    </div>
    )
}