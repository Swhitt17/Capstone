import RecipeDetail from "./RecipeDetail";
import { render } from "@testing-library/react";

test("it renders without crashing", function (){
     render(
        <RecipeList />
    );
    expect(asFragment()).toMatchSnapshot();
})


test("it matches snapshot", function (){
    const {asFragment} = render(
        <RecipeList />
    );
    expect(asFragment()).toMatchSnapshot();
})