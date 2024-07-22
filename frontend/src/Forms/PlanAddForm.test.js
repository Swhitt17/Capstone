import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import PlanAddForm from "./PlanAddForm";

test("it matches snapshot", function(){
    const {asFragment} = render(
        <MemoryRouter>
            <PlanAddForm />
        </MemoryRouter>
    );

    expect(asFragment()).toMatchSnapshot();
})