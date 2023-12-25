
import { screen, render as rtlRender, waitFor, act } from "@testing-library/react"
import { Provider } from "react-redux"
import CreateFlashCard from "../CreateFlashCard/CreateFlashCard"
import store from '../store/store'
import user from '@testing-library/user-event'
const render = (component) => rtlRender(
    <Provider store={store}>
        {component}
    </Provider>
)
describe(CreateFlashCard, () => {

    beforeEach(() => {
        render(<CreateFlashCard />)
    })

    it('should show required on fields if any field is left blank', async () => {

        const groupName = screen.getByPlaceholderText(/group name/i)
        user.type(groupName, 'crest')

        const discription = screen.getByPlaceholderText(/add description/i)
        user.type(discription, 'Lo. Soluta doloremque quasi voluptate repellat velit hic magnam')

        const term = screen.getByPlaceholderText(/term/i)
        user.type(term, 'term1')
        //-- we are leaving one field blank for testing --
        // const defination = screen.getByPlaceholderText(/defination/i)
        // user.type(defination, '')

        user.click(screen.getByRole('button', { name: /create/i }));

        await waitFor(() => {
            expect(screen.getByText(/required/i)).toBeInTheDocument()
        })

    })


    it('should create input field on click add more button ', async () => {



        await act(() => {
            user.click(screen.getByRole('button', { name: /\+ add more/i }))
        });

        await waitFor(() => {
            expect(screen.getAllByPlaceholderText(/term/i)).toHaveLength(2)
        })


    })

    it('should reset form after all fields pass validation and click submit', async () => {

        const groupName = screen.getByPlaceholderText(/group name/i)
        user.type(groupName, 'crest')

        const discription = screen.getByPlaceholderText(/add description/i)
        user.type(discription, 'Lo. Soluta doloremque quasi voluptate repellat velit hic magnam')

        const term = screen.getByPlaceholderText(/term/i)
        user.type(term, 'term1')

        const defination = screen.getByPlaceholderText(/defination/i)
        user.type(defination, 'Lo. Soluta doloremque quasi voluptate repellat velit hic magnam')


        await act(() => {
            user.click(screen.getByRole('button', { name: /create/i }))
        })
        
        await act(() => {
            waitFor(() => {
                expect(groupName).toHaveTextContent("")
                expect(discription).toHaveTextContent("")
                expect(term).toHaveTextContent("")
                expect(defination).toHaveTextContent("")
            })
        })

    })
})