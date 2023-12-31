import React, { useEffect, useRef } from "react";
import Img3 from "../../assets/img/test.png"; // 이미지 변경

import { ScrollTrigger } from "gsap/all";
import gsap from "gsap";
import { Link } from "react-router-dom";

const Section4 = () => {
  gsap.registerPlugin(ScrollTrigger);
  const pathMaskRef = useRef(null);
  const section4Ref = useRef(null);
  const text1Ref = useRef(null); // 필요한 경우 text1, text2 참조
  const text2Ref = useRef(null);

  useEffect(() => {
    const pathAnimation = gsap.to(pathMaskRef.current, {
      attr: { d: "M 0 280 Q 500 800 1000 280 Q 500 -200 0 280" },
      scrollTrigger: {
        trigger: section4Ref.current,
        start: "top 25%",
        end: "bottom bottom",
        scrub: 1,
        // markers: true,
      },
    });

    // text1, text2 애니메이션
    gsap.fromTo(
      text1Ref.current,
      { opacity: 0, yPercent: -50 },
      {
        opacity: 1,
        yPercent: 0,
        scrollTrigger: {
          trigger: section4Ref.current,
          start: "top 25%",
          end: "bottom bottom",
          ease: "none",
          scrub: 1,
        },
      }
    );

    gsap.fromTo(
      text2Ref.current,
      { opacity: 0, xPercent: -100 },
      {
        opacity: 1,
        xPercent: 0,
        scrollTrigger: {
          trigger: section4Ref.current,
          start: "top 25%",
          end: "bottom bottom",
          scrub: 1,
          ease: "none",
        },
      }
    );

    return () => {
      console.log("Section4 - useEffect: Cleaning up animations");
      pathAnimation.kill();
      ScrollTrigger.getById("section4-trigger")?.kill();
    };
  }, []);

  return (
    <section id="section4" ref={section4Ref}>
      <div className="contents4">
        <div className="cont__box">
          <svg
            className="content__img content__img--3"
            width="100%"
            height="100%"
            viewBox="0 0 1000 560"
          >
            <defs>
              <filter id="displacementFilter3">
                <feTurbulence
                  type="fractalNoise"
                  baseFrequency="0.02"
                  numOctaves="3"
                  result="noise"
                />
                <feDisplacementMap
                  in="SourceGraphic"
                  in2="noise"
                  scale="80"
                  result="displacement"
                  xChannelSelector="R"
                  yChannelSelector="G"
                />
              </filter>
              <mask id="pathMask">
                <path
                  ref={pathMaskRef}
                  d="M 0 280 Q 500 280 1000 280 Q 500 280 0 280"
                  fill="white"
                  className="mask"
                  style={{ filter: "url(#displacementFilter3)" }}
                />
              </mask>
            </defs>
            <Link to="/home">
              <image
                xlinkHref={Img3}
                width="100%"
                height="100%"
                mask="url(#pathMask)"
              />
            </Link>
          </svg>
          <div className="text">
            <div className="text1" ref={text1Ref}>
              YOUR TEXT1
            </div>
            <div className="text2" ref={text2Ref}>
              YOUR TEXT2
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section4;
