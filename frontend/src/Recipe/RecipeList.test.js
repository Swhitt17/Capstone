import RecipeList from "./RecipeList";
import { render } from "@testing-library/react";


test("it matches snapshot", function (){
    const {asFragment} = render(
        <RecipeList />
    );
    expect(asFragment()).toMatchSnapshot();
})