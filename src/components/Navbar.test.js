
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Navbar from "../components/Navbar";

describe(Navbar, () => {

    render(<BrowserRouter><Navbar /></BrowserRouter>)

    it('should contain navlinks ', () => {
        expect(screen.getByRole('link', { name: /create new/i })).toBeInTheDocument()
        expect(screen.getByRole('link', { name: /my flash card/i })).toBeInTheDocument()
    })
})