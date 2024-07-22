import ShoppingList from "./ShoppingList";
import { render } from "@testing-library/react";


test("it matches snapshot", function (){
    const {asFragment} = render(
        <ShoppingList />
    );
    expect(asFragment()).toMatchSnapshot();
})