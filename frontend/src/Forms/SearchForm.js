import React, {useState} from "react";
 const SearchForm = ({search}) => {


    const initialState = {
        cuisine: "",
        diet: "",
        dish: "",
        intolerance: "",
        title: "",
       
    }
    const [formData,setFormData] = useState(initialState);
   
  
    const handleChange = e => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value})
           
       
    }


    
    const handleSubmit = async(e) => {
        e.preventDefault();
        search({cuisine: formData.cuisine,  diet:formData.diet, dish:formData.dish, intolerance:formData.intolerance, title: formData.title})
        // setFormData(initialState)
        
    }

    return (
        <div className="SearchForm mb-4">
            <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
                  <div className="card">
                    <div className="card-body">
                     <form className="form-inline " onSubmit={handleSubmit}>


                     <div>
                <label htmlFor="cuisines-select">Select a cuisine</label>

                <select name="cuisine" id="cuisines-select"  value={formData.cuisine}  onChange={handleChange}>
                <option value ="">-- Please Select --</option>
                <option value="african">African</option>
                <option value="asian">Asian</option>
                <option value ="american">American</option>
                <option value ="british">British</option>
                <option value ="cajun">Cajun</option>
                <option value ="caribbean">Caribbean</option>
                <option value ="chinese">Chinese</option>
                <option value ="european">European</option>
                <option value ="french">French</option>
                <option value ="german">German</option>
                <option value ="greek">Greek</option>
                <option value ="indian">Indian</option>
                <option value ="irish">Irish</option>
                <option value ="italian">Italian</option>
                <option value ="japanese">Japanese</option>
                <option value ="jewish">Jewish</option>
                <option value ="korean">Korean</option>
                <option value ="mediterranean">Mediterranean</option>
                <option value ="mexican">Mexican</option>
                <option value ="nordic">Nordic</option>
                <option value ="southern">Southern (US)</option>
                <option value ="spanish"> Spanish</option>
                <option value ="thai">Thai</option>
                <option value ="vietnamese">Vietnamese</option>
                </select>
                </div> 

                <div>
                <label htmlFor="diets-select">Select a diet</label>
                <select name="diet" id="diets-select" value={formData.diet} onChange={handleChange}>
                    <option value="">-- Please Select --</option>
                    <option value="glutenFree">Gluten Free</option>
                    <option value="ketogenic">Ketogenic</option>
                    <option value="vegetarian">Vegetarian</option>
                    <option value="lactovegitarian">Lacto-Vegitarian</option>
                    <option value="ovovegtarian">Ovo-Vegitarian</option>
                    <option value="vegan">Vegan</option>
                    <option value="pescetarian">Pescetarian</option>
                    <option value="paleo">Paleo</option>
                    <option value="primal">Primal</option>
                    <option value="lowfodmap">Low FODMAP</option>
                    <option value="whole30"> Whole30</option>
                </select>
                </div>

                <div>
                <label htmlFor="type-select">Select a dish type</label>
                <select name="dish" id="type-select" value={formData.dish} onChange={handleChange}>
                    <option value="">-- Please Select --</option>
                    <option value="maincourse">Main Course</option>
                    <option value="sidedish">Side Dish</option>
                    <option value="dessert">Dessert</option>
                    <option value="appetizer">Appetizer</option>
                    <option value="snack">Salad</option>
                    <option value="bread">Bread</option>
                    <option value="breakfast">Breakfast</option>
                    <option value="soup">Soup</option>
                    <option value="sauce">Sauce</option>
                    <option value="marinade">Marinade</option>
                    <option value="fingerfood">Fingerfood</option>
                    <option value="snack">Snack</option>
                    <option value="drink">Drink</option>
                </select>
                </div>

                <div>
                <label htmlFor="type-select">Select an intolerance</label>
                <select name="intolerance" id="type-select" value={formData.intolerance} onChange={handleChange}>
                    <option value="">-- Please Select --</option>
                    <option value="dairy">Dairy</option>
                    <option value="egg">Egg</option>
                    <option value="gluten">Gluten</option>
                    <option value="grain">Grain</option>
                    <option value="peanut">Peanut</option>
                    <option value="seafood">Seafood</option>
                    <option value="sesame">Sesame</option>
                    <option value="shellfish">Shellfish</option>
                    <option value="soy">Soy</option>
                    <option value="sulfite">Sulfite</option>
                    <option value="treenut">Tree Nut</option>
                    <option value="wheat">Wheat</option>
                </select>
                </div>



                <div className="form-group">
                <label htmlFor="title">Recipe Title</label>
                <input
                className="form-control  "
                type ="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                />
                </div>


                <button
                className="btn btn-md btn-success"
                 onClick={handleSubmit}
                 >
                Submit
                </button>
            </form>
              </div>
            </div>
           </div>
         </div>
    )
 }

 export default SearchForm;