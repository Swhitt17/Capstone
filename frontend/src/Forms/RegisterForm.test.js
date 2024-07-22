import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import RegisterForm from "./RegisterForm";

test("it matches snapshot", function(){
    const {asFragment} = render(
        <MemoryRouter>
            <RegisterForm />
        </MemoryRouter>
    );

    expect(asFragment()).toMatchSnapshot();
})