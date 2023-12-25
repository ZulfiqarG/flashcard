
describe(FlashCardDetails, () => {



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
    beforeEach(() => {
        renderWithRedux(<FlashCardDetails />, {
            initialState: {
                card: [{
                    group: "groupname",
                    groupicon: "",
                    description: "description",
                    card: [{
                        id: 1,
                        term: "term1",
                        defination: "defination1",
                        image: ''
                    }]
                }],
            } })
    })
    it('should contain heading and description', () => {

        expect(screen.getByText(/description/i)).toBeInTheDocument()
        expect(screen.getByRole("heading", { name: /groupname/i })).toBeInTheDocument()
    })

    it('should contain side bar with  card heading and card term link',async () => {

        await waitFor(()=>{

            expect(screen.getByRole("heading", { name: /flashcards/i })).toBeInTheDocument()
            expect(screen.getByRole("link", { name: /term1/i })).toBeInTheDocument()
        })
        
    })
    it('should contain buttons for share,download and print',async () => {

        await waitFor(()=>{

            expect(screen.getByRole("button", { name: /share/i })).toBeInTheDocument()
            expect(screen.getByRole("button", { name: /download/i })).toBeInTheDocument()
            expect(screen.getByRole("button", { name: /print/i })).toBeInTheDocument()
        })

    })

})