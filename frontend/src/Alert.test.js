import React from "react";
import {render} from "@testing-library/react";
import Alert from "./Alert";

test("renders withot crashing", function(){
    render(<Alert />);
});

test("matches snapshot for danger", function (){
    let messages = ["Everything is broken"];
    const {asFragment} = render(<Alert type="danger" messages={messages} />);
    expect(asFragment()).toMatchSnapshot();
});

test("matches snapshot for success", function(){
    let messages = ["Everything is awesome"];
    const {asFragment} = render(<Alert type="success" messages={messages} />);
    expect(asFragment()).toMatchSnapshot();
});