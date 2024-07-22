import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import SearchForm from "./SearchForm";

test("it matches snapshot", function(){
    const {asFragment} = render(
        <MemoryRouter>
            <SearchForm />
        </MemoryRouter>
    );

    expect(asFragment()).toMatchSnapshot();
})