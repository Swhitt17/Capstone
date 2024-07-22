import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ListAddForm from "./ListAddForm";


test("it matches snapshot", function(){
    const {asFragment} = render(
        <MemoryRouter>
            <ListAddForm />
        </MemoryRouter>
    );

    expect(asFragment()).toMatchSnapshot();
})