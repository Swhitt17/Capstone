import PlanDay from "./PlanDay";
import { render } from "@testing-library/react";


test("it matches snapshot", function (){
    const {asFragment} = render(
        <PlanDay />
    );
    expect(asFragment()).toMatchSnapshot();
})