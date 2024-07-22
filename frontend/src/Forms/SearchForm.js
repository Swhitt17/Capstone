import React, {useState} from "react";
 const SearchForm = ({search}) => {


    const initialState = {
        cuisine: "",
        diet: "",
        dish: "",
        servings: "",
        title: "",
        time: ""
    }
    const [formData,setFormData] = useState(initialState);
    // const [formCuisineData, setFormCuisineData] = useState("");
    // const [formDietData, setFormDietData] = useState("");

    const handleChange = e => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value})
           
       
    }

    // const handleCuisineChange = e => {
    //     setFormCuisineData(e.target.value);
    // }
    
    // const handleDietChange = e => {
    //     setFormDietData(e.target.value);
    // }

    
    const handleSubmit = async(e) => {
        e.preventDefault();
        search({cuisine: formData.cuisine,  diet:formData.diet})
        setFormData(initialState)
    }

    return (
        <div className="SearchForm mb-4">
            <form className="form-inline " onSubmit={handleSubmit}>

              <div>
              <label htmlFor="cuisines-select">Select a cuisine</label>

                <select name="cuisine" id="cuisines-select" value={formData.cuisine} onChange={handleChange}>
                <option value ="">-- Please Select --</option>
                <option value="african">African</option>
                <option value="asian">Asian</option>
                <option value ="american">American</option>
                <option value ="british">British</option>
                <option value ="cajun">Cajun</option>
                <option value ="caribbean">Caribbean</option>
                <option value ="chinese">Chinese</option>
                <option value ="easterneuropean">Eastern European</option>
                <option value ="european">European</option>
                <option value ="french">French</option>
                <option value ="german">German</option>
                <option value ="greek">Greek</option>
                <option value ="indian">Indian</option>
                <option value ="italian">Italian</option>
                <option value ="japanese">Japanese</option>
                <option value ="jewish">Jewish</option>
                <option value ="korean">Korean</option>
                <option value ="latinamerican">Latin American</option>
                <option value ="mediterranean">Mediterranean</option>
                <option value ="mexican">Mexican</option>
                <option value ="middleeastern">Middle Eastern</option>
                <option value ="nordic">Nordic</option>
                <option value ="southern">Southern</option>
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
                <select name="dishType" id="type-select" value={formData.dish} onChange={handleChange}>
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
                <label htmlFor="servings">Number of Servings</label>
                <input
                type ="range"
                list="tickmarks"
                id="servings"
                name="servings"
                min="1"
                max="15"
                value={formData.servings}
                onChange={handleChange}
                />
                </div>

                <div className="col-sm-3 my-1">
                <label htmlFor="title">Recipe Title</label>
                <input
                className="form-control mb-2 mr-sm-2 "
                type ="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                />
                </div>


                <div className="col-sm-3 ">
                <label htmlFor="cooking-time">Max Prep and Cook Time</label>
                <input
                className="form-control"
                type ="number"
                id="cooking-time"
                name="time"
                min="5"
                max="180"
                value={formData.time}
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
    )
 }

 export default SearchForm;