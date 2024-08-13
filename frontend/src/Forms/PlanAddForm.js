import React, {useState} from "react";

const PlanAddForm = ({ post}) => {

    const initialState = {
        date: "",
        meal: "",
        recipeId: "",
        servings: null,
        position: null,
        title: ""
    }
  
     const [formData, setFormData] = useState(initialState);

     const handleChange = e => {
      setFormData(e.target.value);
        const {name,value} = e.target
        setFormData({...formData, [name]: value})
     }

           const convertToTimestamp = (date) => {
        let newDate = new Date(date)
        let newTimestamp = newDate.getTime()/1000.0
        console.log(newTimestamp)
        return newTimestamp;
      }

     const handleSubmit = async(e) => {
        e.preventDefault();
         let timestamp = convertToTimestamp(formData.date)
        console.log({date: timestamp,meal: formData.meal,position: formData.position, id: formData.recipeId, servings: formData.servings,  title: formData.title  })
        post({date: timestamp,  meal: formData.meal, position: formData.position,id: formData.recipeId, servings: formData.servings,title: formData.title  })
          // addMeal({date: timestamp,  meal: formData.meal, position: formData.position,id: formData.recipeId,servings: formData.servings, title: formData.title  })
        setFormData(initialState)
     }

    

      
     return(
        <div className="PlanAddForm">
            <div className="container col-md-6 col-lg-4 offset-md-3 offset-lg-4">
                <div className="card">
                    <div className="card-body">
                     <form onSubmit={handleSubmit}>
                        <div className="form-group">
                         <label htmlFor="date">Select the date you want to add to </label>
                         <input 
                           className="form-control"
                           id="date"
                           type="datetime-local"
                           name="date"
                           value={formData.date}
                           onChange={handleChange}
                           onSubmit={convertToTimestamp}
                          
                         />
                        </div>

                        <div className="form-group">
                             <label htmlFor="meal">Enter the meal you want to add to </label>
                             <select name="meal" id="meals-select" onChange={handleChange} value={formData.meal}>
                                <option value="">-- Please Select --</option>
                                <option value="1">Breakfast</option>
                                <option value="2">Lunch</option>
                                <option value="3">Dinner</option>
                             </select>  
                         </div>
                         
                         
                         <div className="form-group">
                           <label htmlFor="position">Enter the position within the meal slot </label>
                           <input 
                             className="form-control"
                             id="position"
                             type="number"
                             name="position"
                             placeholder="1"
                             value={formData.position}
                             onChange={handleChange}
                            />
                        </div>


                        <div className="form-group">
                          <label htmlFor="add-item">Enter the id of the recipe you want to add </label>
                          <input 
                            className="form-control"
                            id="add-item"
                            type="text"
                            name="recipeId"
                            placeholder="716627"
                            value={formData.recipeId}
                            onChange={handleChange}
                          />
                          </div>  
                          
                           <div className="form-group">
                           <label htmlFor="servings">Enter the amount of servings for the recipe </label>
                           <input 
                             className="form-control"
                             id="servings"
                             type="number"
                             name="servings"
                             placeholder="2"
                             value={formData.servings}
                             onChange={handleChange}
                            />
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

                     


               <button className="btn btn-success float-right"
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

export default PlanAddForm;