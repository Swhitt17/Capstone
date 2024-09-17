import React, {useState} from "react";

const ListAddForm = ({addItem}) => {

  
     const [formData, setFormData] = useState("");

     const handleChange = e => {
        setFormData(e.target.value)
        
     }

     const handleSubmit = async(e) => {
        e.preventDefault();
        addItem(formData)
        setFormData("")
     }


     return(
      <div className="ListAddForm">
         <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
            <div className="card">
               <div className="card-body">
                 <form onSubmit={handleSubmit}>
                  <div className="form-group"> 
                   <label htmlFor="item">Enter an item to add </label>
                   <input 
                   className="form-control"
                    id="item"
                    type="text"
                    name="item"
                    placeholder="3 bananas"
                    value={formData}
                    onChange={handleChange}
                    />
                   </div>

            <button className="btn btn-success float-right" >Submit</button>

              </form>
             </div>
           </div>
          </div>
        </div>
     )
}

export default ListAddForm;