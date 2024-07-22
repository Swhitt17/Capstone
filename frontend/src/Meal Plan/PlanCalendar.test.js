import PlanCalendar from "./PlanCalendar";
import { render } from "@testing-library/react";


test("it matches snapshot", function (){
    const {asFragment} = render(
        <PlanCalendar />
    );
    expect(asFragment()).toMatchSnapshot();
})