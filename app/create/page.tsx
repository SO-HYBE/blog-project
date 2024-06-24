"use client"
import { useFormState } from "react-dom";
import NavHead from "../components/NavHead";
import Image from "next/image";
import createImg from "../../public/create.jpg"
import useIsomorphicLayoutEffect from "use-isomorphic-layout-effect";
import { useRef, useState } from "react";
import gsap from "gsap";
import Footer from "../components/Footer";
import { useRouter } from "next/navigation";

const intitialState = {
  message : null,
}

export default function CreatePost(){

  const createRef = useRef(null);


  useIsomorphicLayoutEffect(() => {
    if (typeof window !== 'undefined') {
      
      const ctx = gsap.context(() => {
        const tl = gsap.timeline();

        tl.to(".title-create", { 
          y: 0, 
          duration: 1, 
          autoAlpha: 1, 
          stagger: 0.25,
          ease: 'power1.in',
        });
      }, createRef);

      return () => ctx.revert(); 
    }
  }, []);

  const router = useRouter();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");

  const addPost = async (post: { title: string; author: string; content: string }) => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(post),
    });

    if (response.ok) {
      router.push("/post");
      alert("THE POST HAS BEEN CREATED SUCCESSFULLY BROOO 🔥🔥 !!!!!!")
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addPost({ title, author, content });
  };



  // const  [state, formAction] = useFormState(, intitialState)

    return(
    <main className="mx-5 h-[140vh]">
      <NavHead />
      <div className="font-oswald bg-black flex items-center justify-center h-full relative flex-col mt-32">
            <div className="whitespace-pre relative mb-20" ref={createRef}>
              <span className="title-create cursor-default text-white hover:text-black text-6xl">Express </span>
              <span className="title-create cursor-default text-white hover:text-black text-6xl">Yourself</span>
            </div>
            <div className="flex flex-row justify-between w-full h-[80vh] px-32 sm:flex-col">
            <form className="text-white relative flex flex-row sm:flex-col justify-between basis-1/2" onSubmit={handleSubmit}>
              <label className="text-xl" htmlFor="">Title</label>
              <input               
              type="text"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="rounded-md focus:bg-black focus:text-white text-black w-[50%]"
              />
              <label className="text-xl" htmlFor="">Author</label>
              <input 
              type="text"
              name="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required 
              className="rounded-md focus:bg-black focus:text-white text-black w-[50%]"
              />
              <label className="text-xl" htmlFor="">Content</label>
              <textarea               
              name="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              className="rounded-md focus:bg-black focus:text-white h-36 text-black"></textarea>
              <button className="block w-full bg-black text-white p-4 rounded-lg border-4 border-white text-xl hover:bg-white hover:text-black duration-700 hover:shadow-inner hover:tracking-[1em] hover:font-bold" type="submit">CREATE</button>
            </form>
              <div className="overflow-hidden rounded-lg basis-[fit-content] flex justify-between items-center">
                <Image className="rounded-md hover:invert duration-700 hover:scale-125" width={400} height={400} src={createImg} alt="Man in a dark desert"></Image>          
              </div>
            </div>
      </div>
      <Footer />
    </main>
    )
}