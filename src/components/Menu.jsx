import React, { useState, useRef } from "react";
import { sliderLists } from "./constants/index.js";
import { useGSAP } from "@gsap/react";
import gsap from "gsap/all";

const Menu = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const contentRef = useRef();

  useGSAP(() => {
    gsap.fromTo("#title", { opacity: 0 }, { opacity: 1, duration: 3 });

    gsap.fromTo(
      ".cocktail",
      { opacity: 0, xPercent: -100 },
      { opacity: 1, xPercent: 0, duration: 1, ease: "expo.inOut" }
    );

    gsap.fromTo(".details h2", {ypercent: 100, opacity: 0}, { ypercent: 0, opacity: 1, duration: 2, ease: "power2.inOut"})

    gsap.fromTo(".details p", {ypercent: 100, opacity: 0}, { ypercent: 0, opacity: 1, duration: 2, ease: "power2.inOut"})

  }, [currentIndex]);

  const totalCocktails = sliderLists.length;

  const goToSLide = (index) => {
    const newIndex = (index + totalCocktails) % totalCocktails;

    setCurrentIndex(newIndex);
  };

  const getCocktailAt = (indexOffSet) => {
    return sliderLists[
      (currentIndex + indexOffSet + totalCocktails) % totalCocktails
    ];
  };

  const currentCocktail = getCocktailAt(0);
  const prevCocktail = getCocktailAt(-1);
  const nextCocktail = getCocktailAt(+1);

  return (
    <section id="menu" aria-labelledby="menu-heading">
      <img
        src="/images/slider-left-leaf.png"
        alt="left-leaf"
        id="m-left-leaf"
      />
      <img
        src="/images/slider-right-leaf.png"
        alt="right-leaf"
        id="m-right-leaf"
      />

      <h2 id="menu-heading" className="sr-only">
        Cocktail Menu
      </h2>

      <nav className="cocktail-tabs" aria-label="Cocktail Navigation">
        {sliderLists.map((cocktail, index) => {
          const isActive = index === currentIndex;

          return (
            <button
              key={cocktail.id}
              className={`${
                isActive
                  ? "text-white border-white"
                  : "text-white/50 border-white/50"
              }`}
              onClick={() => goToSLide(index)}
            >
              {cocktail.name}
            </button>
          );
        })}
      </nav>

      <div className="content">
        <div className="arrows ">
          <button
            className="flex flex-col items-center"
            onClick={() => goToSLide(currentIndex - 1)}
          >
            <img
              src="/images/right-arrow.png"
              alt="right-arrow"
              aria-hidden="true"
              className="size-12"
            />
            <span className="items-center hidden sm:block">{prevCocktail.name}</span>
          </button>
          <button
            className="flex flex-col items-center"
            onClick={() => goToSLide(currentIndex + 1)}
          >
            <span className="hidden sm:block">{nextCocktail.name}</span>
            <img
              src="/images/left-arrow.png"
              alt="left-arrow"
              aria-hidden="true"
              className="size-12"
            />
          </button>
        </div>

        <div className="cocktail">
          <img src={currentCocktail.image} className="object-contain" alt="" />
        </div>
        <div className="recipe">
          <div ref={contentRef} className="info">
            <p>Recipe for:</p>
            <p id="title">{currentCocktail.name}</p>
          </div>
          <div className="details">
            <h2>{currentCocktail.title}</h2>
            <p>{currentCocktail.description}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Menu;
