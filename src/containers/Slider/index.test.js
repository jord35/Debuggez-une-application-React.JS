import { render, act, waitFor } from "@testing-library/react";
import Slider from "./index";

const data = {
  focus: [
    {
      title: "World economic forum",
      description: "Oeuvre à la coopération entre le secteur public et le privé.",
      date: "2022-02-29T20:28:45.744Z",
      cover: "/images/evangeline-shaw-nwLTVwb7DbU-unsplash1.png",
    },
    {
      title: "World Gaming Day",
      description: "Evenement mondial autour du gaming",
      date: "2022-03-29T20:28:45.744Z",
      cover: "/images/evangeline-shaw-nwLTVwb7DbU-unsplash1.png",
    },
    {
      title: "World Farming Day",
      description: "Evenement mondial autour de la ferme",
      date: "2022-01-29T20:28:45.744Z",
      cover: "/images/evangeline-shaw-nwLTVwb7DbU-unsplash1.png",
    },
  ],
};

jest.mock("../../contexts/DataContext", () => ({
  useData: () => ({ data }),
}));



describe("When slider is created", () => {
  it("affiche l’événement le plus ancien au chargement", async () => {
    render(<Slider />);

    const visibleCard = await waitFor(() =>
      document.querySelector(".SlideCard--display")
    );

    expect(visibleCard).not.toBeNull();
    expect(visibleCard).toHaveTextContent("World Farming Day");
  });
});


describe("Slider pointer synchronization", () => {
  it("le pointeur doit correspondre à la carte affichée au chargement", async () => {
    const { container } = render(<Slider />);

    // Attendre que la carte affichée soit rendue
    const visibleCard = await waitFor(() =>
      container.querySelector(".SlideCard--display")
    );

    expect(visibleCard).not.toBeNull();

    // Récupérer tous les radios
    const radios = container.querySelectorAll('.SlideCard__pagination input');

    // Vérifier que le radio correspondant à la carte affichée est checked
    const index = Array.from(container.querySelectorAll(".SlideCard")).indexOf(visibleCard);
    expect(radios[index].checked).toBe(true);
  });
});

describe("Slider looping behavior with timer", () => {
  beforeAll(() => {
    // _________________________________________________

    jest.useFakeTimers(); // Activer les timers simulés
  });

  afterAll(() => {
    jest.useRealTimers(); // Restaurer les timers réels
  });

  // _________________________________________________

  it("le dernier élément suivi affiche de nouveau le premier", async () => {
    const { container } = render(<Slider />);
    const cards = container.querySelectorAll(".SlideCard");

    for (let i = 0; i < cards.length; i++) {
      act(() => {
        jest.advanceTimersByTime(5000);
      });
      await waitFor(() =>
        expect(container.querySelector(".SlideCard--display")).not.toBeNull()
      );
    }

    const visibleCard = await waitFor(() =>
      container.querySelector(".SlideCard--display")
    );

    expect(visibleCard).toHaveTextContent("World Farming Day");
  })
});