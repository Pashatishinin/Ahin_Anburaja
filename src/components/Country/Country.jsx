import React, { useRef, useEffect } from "react";
import gsap from "gsap";

import img1 from "../../assets/map_1.png";
import img2 from "../../assets/map_2.png";
import img3 from "../../assets/map_3.png";
import img4 from "../../assets/map_4.png";
import "./Country.css";
import { ScrollTrigger } from "gsap/ScrollTrigger";



export default function Country() {
  
  const sectionRef = useRef(null);
  const triggerRef = useRef(null);

  const countryData = [
    {
      name: "CANADA",
      description: `In my roles, I developed strong decision-making and conflict
      management skills as an umpire, mentored new umpires, and
      participated in national tournaments. Additionally, as a
      co-founder and events coordinator for the Indian Students'
      Association at UBCO, I planned events, managed budgets, and
      supervised volunteers, honing my leadership and organizational
      abilities.`,
      image: img1,
    },
    {
      name: "FRANCE",
      description: `Conducted a needs analysis for a fitness start-up. Provided
      strategic recommendations to boost consumer interest and drive
      sales. Suggested avenues for business expansion to support growth
      initiatives.`,
      image: img2,
    },
    {
      name: "CHINA",
      description: `Conducted research on the Chinese football fan market and their
      consumer motivations. Delivered insights on enhancing the European
      football match-day experience for Chinese fans, with a focus on
      digital strategies.`,
      image: img3,
    },
    {
      name: "GERMANY",
      description: `Oversaw the entire product process from initial briefing to final
      launch. Aligned team calendars with Go-To-Market strategies and
      stakeholder requirements. Analyzed financial data to ensure
      products met targets.`,
      image: img4,
    },
  ];

  const CountrySection = ({ name, description, image }) => (
    <div className="country-container scroll-section">
      <div className="country-title ">{name}</div>
      <div className="country-info">
        <span className="w-3/4 ">{description}</span>
      </div>
      <div className="flex h-2/4 lg:h-3/4">
        <img src={image} alt={name} className="country-img" />
      </div>
    </div>
  );

  
  
  
  

    useEffect(() => {
      let animationFrameId;
      let observer;

      const animate = () => {
        const pin = gsap.fromTo(
          sectionRef.current,
          { translateX: 0 },
          {
            translateX: "-300vw",
            ease: "none",
            duration: 1,
            scrollTrigger: {
              trigger: triggerRef.current,
              start: "top top",
              end: "+=2000 top",
              scrub: 0.6,
              markers: false,
              pin: true,
              invalidateOnRefresh: true,
            },
          }
        );

        ScrollTrigger.refresh(); // Обновляем триггеры ScrollTrigger

        // Добавляем небольшую задержку перед синхронизацией ScrollReveal
        setTimeout(() => {
          if (window.ScrollReveal) {
            window.ScrollReveal().sync();
          }
        }, 300); // Задержка 300ms, подстройка по необходимости

        return () => {
          pin.kill();
          // Уничтожаем только GSAP триггеры, не все ScrollTrigger
          ScrollTrigger.getAll().forEach((trigger) => {
            if (trigger.animation && trigger.animation.vars) {
              trigger.kill();
            }
          });
        };
      };

      const startAnimation = () => {
        animationFrameId = requestAnimationFrame(animate);
      };

      const handleIntersect = (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            startAnimation();
            observer.disconnect();
          }
        });
      };

      observer = new IntersectionObserver(handleIntersect, {
        root: null,
        threshold: 0.1,
      });

      observer.observe(sectionRef.current);

      return () => {
        if (animationFrameId) {
          cancelAnimationFrame(animationFrameId);
        }
        if (observer) {
          observer.disconnect();
        }
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    }, []);


    // useEffect(() => {
    //   // Добавляем отложенную инициализацию
    //   const timeoutId = setTimeout(() => {
    //     const pin = gsap.fromTo(
    //       sectionRef.current,
    //       { translateX: 0 },
    //       {
    //         translateX: "-300vw",
    //         ease: "none",
    //         duration: 1,
    //         scrollTrigger: {
    //           trigger: triggerRef.current,
    //           start: "top top",
    //           end: "+=2000 top", // Модифицированный end
    //           scrub: 0.6,
    //           markers: true,
    //           pin: true,
    //           invalidateOnRefresh: true,
    //         },
    //       }
    //     );
    //     ScrollTrigger.refresh();

    //     return () => {
    //       pin.kill();
    //       ScrollTrigger.getAll().forEach((trigger) => trigger.kill()); // Уничтожаем все триггеры
    //     };

    //     // Удаляем анимацию при размонтировании компонента
    //   }, 300);
    //   return () => {
    //     clearTimeout(timeoutId);
    //     // Уничтожаем все триггеры
    //   }; // Здесь вы можете изменить задержку, если требуется больше времени

    //   // Очищаем таймер при размонтировании компонента
    // }, []);

  return (
    <section ref={triggerRef} id="country" >
      <div
        ref={sectionRef}
        className="font-montserrat scroll-section-inner text-2xl tracking-widest leading-relaxed h-screen"
      >
        {countryData.map((country, index) => (
          <CountrySection
            key={index}
            name={country.name}
            description={country.description}
            image={country.image}
          />
        ))}
      </div>
    </section>
  );
}
