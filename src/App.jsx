import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./App.css";

gsap.registerPlugin(ScrollTrigger);

function App() {
  const carRef = useRef();
  const textRef = useRef();
  const statsRef = useRef([]);
  const heroRef = useRef();

  useEffect(() => {
    // 🔥 TEXT REVEAL (STAGGER)
    gsap.fromTo(
      textRef.current.children,
      { opacity: 0, y: 80, scale: 0.8 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        stagger: 0.08,
        duration: 1.2,
        ease: "power4.out",
      }
    );

    // 🔥 STATS FADE
    gsap.fromTo(
      statsRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.2,
        delay: 0.6,
        duration: 1,
      }
    );

    // 🔥 CAR LEFT → RIGHT (FIXED VERSION 💣)
    gsap.fromTo(
  carRef.current,
  {
    x: () => -carRef.current.offsetWidth, // 🔥 FULL LEFT OUTSIDE
  },
  {
    x: () =>
      window.innerWidth - carRef.current.offsetWidth, // 🔥 FULL RIGHT EDGE
    ease: "none",
    scrollTrigger: {
      trigger: heroRef.current,
      start: "top top",
      end: "bottom top",
      scrub: 2,
    },
  }
);

    // 🔥 EXTRA REALISM (rotation + scale)
    gsap.to(carRef.current, {
      // rotation: 8,
      scale: 1.05,
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top center",
        end: "bottom top",
        scrub: 2,
      },
    });

    // 🔥 PARALLAX BACKGROUND
    gsap.to(".bg", {
      y: -200,
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 2,
      },
    });

    // 🔥 TEXT FADE OUT
    gsap.to(textRef.current, {
      opacity: 0,
      y: -100,
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top center",
        end: "bottom top",
        scrub: true,
      },
    });

  }, []);

  return (
    <>
      <section ref={heroRef} className="hero">

        {/* BACKGROUND */}
        <div className="bg"></div>

        {/* TEXT */}
        <h1 ref={textRef}>
          {"WELCOME ITZFIZZ".split("").map((c, i) => (
            <span key={i}>{c}</span>
          ))}
        </h1>

        {/* STATS */}
        <div className="stats">
          {["98% Success", "120+ Projects", "50K Users"].map((item, i) => (
            <div key={i} ref={(el) => (statsRef.current[i] = el)}>
              <h2>{item.split(" ")[0]}</h2>
              <p>{item.split(" ")[1]}</p>
            </div>
          ))}
        </div>

        {/* CAR */}
        <img ref={carRef} src="/car.png" className="car" />
      </section>
    </>
  );
}

export default App;