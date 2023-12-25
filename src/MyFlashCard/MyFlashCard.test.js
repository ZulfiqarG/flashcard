
import MyFlashCard from "../MyFlashCard/MyFlashCard";
import { cleanup, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import {  createStore } from "redux";
import { BrowserRouter } from "react-router-dom";
import rootReducers from "../redux/reducers";


afterEach(cleanup)

const renderWithRedux = (
    component,
    { initialState, store = createStore(rootReducers, initialState) } = [],
) => {
    return {
        ...render(
            <BrowserRouter>
                <Provider store={store}>{component}</Provider>
            </BrowserRouter>),
        store,
    };
};
describe(MyFlashCard, () => {



    it('should show default values till  card is not created', () => {
        renderWithRedux(<MyFlashCard />)
        expect(screen.getByText(/no cards to show!!/i)).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /create card/i })).toBeInTheDocument();
        expect(screen.getByRole('img', { name: /logo/i })).toBeInTheDocument();
    })


    it('should show card after the  card is created  data is and recieved', () => {
        renderWithRedux(<MyFlashCard />, {
            initialState: {
                card: [{
                    group: "groupname",
                    groupicon: "",
                    description: "description",
                    card: []
                }]
            }
        })
        expect(screen.getByAltText('groupicon')).toBeInTheDocument()
        expect(screen.getByRole('link', { name: /view cards/i })).toBeInTheDocument()
        expect(screen.getByRole('heading', { name: /groupname/i })).toBeInTheDocument()
        expect(screen.getByRole('heading', { name: /description/i })).toBeInTheDocument()
    })

})