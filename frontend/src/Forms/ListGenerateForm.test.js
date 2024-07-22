import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ListGenerateForm from "./ListGenerateForm";

test("it matches snapshot", function(){
    const {asFragment} = render(
        <MemoryRouter>
            <ListGenerateForm/>
        </MemoryRouter>
    );

    expect(asFragment()).toMatchSnapshot();
})