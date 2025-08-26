import React, { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);

  // gere le premier rendu 


  const byDateDesc = data?.focus ? [...data.focus].sort((evtA, evtB) =>
    new Date(evtB.date) - new Date(evtA.date) // tri décroissant
  ) : [];


  const nextCard = () => {
    if (byDateDesc.length === 0) return; // si rien à afficher, on sort
    setTimeout(() => {
      setIndex(prev => (prev < byDateDesc.length - 1 ? prev + 1 : 0));
    }, 5000);
  };


  useEffect(() => {
    nextCard();

  }, [index, byDateDesc.length]);


  return (
    <div className="SlideCardList">
      {byDateDesc.map((event, idx) => {
        const key = event.id ?? `${event.title}-${idx}`; // clé unique (modifier en supr event.title pour utilisé juste idx?  )
        console.log("Clé utilisée pour SlideCard :", key);
        console.log("------------------", idx);


        return (
          <React.Fragment key={key}>
            {/* Carte */}
            <div className={`SlideCard SlideCard--${index === idx ? "display" : "hide"}`}>
              <img src={event.cover ?? "default.jpg"} alt={event.title ?? "événement"} />
              <div className="SlideCard__descriptionContainer">
                <div className="SlideCard__description">
                  <h3>{event.title ?? "Titre inconnu"}</h3>
                  <p>{event.description ?? ""}</p>
                  <div>{getMonth(new Date(event.date))}</div>
                </div>
              </div>
            </div>

            {/* Pagination */}
            <div className="SlideCard__paginationContainer">
              <div className="SlideCard__pagination">
                {byDateDesc.map((_, radioIdx) => (
                  <input
                    key={radioIdx}
                    type="radio"
                    name="radio-button"

                    checked={index === radioIdx}
                    readOnly
                  />
                ))}
              </div>
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default Slider;
