import RecipeCard from "./Company";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

// test("it matches snapshot without picture", function (){
//     const {asFragment} = render(
//         <MemoryRouter>
//            <RecipeCard 
//             handle
           
//            />

//         </MemoryRouter>
        
//     );
//     expect(asFragment()).toMatchSnapshot();
// })


test("it matches snapshot with picture", function (){
    const {asFragment} = render(
        <MemoryRouter>
           <RecipeCard 
            title={"Kc's Oreo Cheesecake"}
            cuisine={""}
            img={"https://img.spoonacular.com/recipes/648798-312x231.jpg"}
           
           />

        </MemoryRouter>
        
    );
    expect(asFragment()).toMatchSnapshot();
})