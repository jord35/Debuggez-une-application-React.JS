/**
 * @jest-environment jsdom
 */
import { fireEvent, render, screen } from "@testing-library/react";
import Home from "./index";
import * as DataContext from "../../contexts/DataContext";


describe("When Form is created", () => {
  it("a list of fields card is displayed", async () => {
    render(<Home />);
    await screen.findByText("Email");
    await screen.findByText("Nom");
    await screen.findByText("Prénom");
    await screen.findByText("Personel / Entreprise");
  });

  describe("and a click is triggered on the submit button", () => {
    it("the success message is displayed", async () => {
      render(<Home />);
      fireEvent(
        await screen.findByText("Envoyer"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );
      await screen.findByText("En cours");
      await screen.findByText("Message envoyé !");
    });
  });

});


describe("When a page is created", () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it("a list of events is displayed", () => {
    render(<Home />);

    const eventList = screen.getByTestId("event-render");
    expect(eventList).toBeInTheDocument();
  });


  it("a list a people is displayed", () => {
    render(<Home />);
    const peopleList = screen.getByTestId("people-render");
    expect(peopleList).toBeInTheDocument();
  });


  it("a footer is displayed", () => {
    render(<Home />);
    const footerList = screen.getByTestId("footer-render");
    expect(footerList).toBeInTheDocument();
  });


  it("an event card, with the last event, is displayed", () => {
    // Mock du hook useData pour fournir `last`
    jest.spyOn(DataContext, "useData").mockReturnValue({
      last: {
        cover: "cover.png",
        title: "Dernier Event",
        date: new Date("2025-09-04"),
        type: "Soirée"
      }
    });

    render(<Home />);

    const lastEventCard = screen.getByTestId("card-testid");
    expect(lastEventCard).toBeInTheDocument();
  })
});
