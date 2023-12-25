

// testing the flashcardGroup ;

import FlashCardGroup from "../components/FlashCardGroup";
import { screen, render as rtlRender,waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../store/store";
import { BrowserRouter } from "react-router-dom";

const render = (component) => rtlRender(
    <Provider store={store}>
        <BrowserRouter>
            {component}
        </BrowserRouter>
    </Provider>
)

describe(FlashCardGroup, () => {

    render(<FlashCardGroup items={{ group: "groupname", groupicon: "", description: "description", card: [], }} index={0} />)

    it('should contain the elements', () => {
        expect(screen.getByRole('link', { name: /view cards/i })).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: /groupname/i })).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: /description/i })).toBeInTheDocument();
    })

})