import React, {useState} from "react";

const ListGenerateForm = ({generate}) => {

    const initialState = {
        startDate: "",
        endDate: ""
    }
     const [formData, setFormData] = useState(initialState);

     const handleChange = e => {
      const {name,value} = e.target
      setFormData({...formData, [name]: value})
     }

     const handleSubmit = async(e) => {
        e.preventDefault();
        console.log(formData.startDate, formData.endDate, "formData")
        generate({startDate: formData.startDate, endDate: formData.endDate})
        setFormData(initialState)
     }


     return(
         <div className="ListGenerateForm">
            <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
                <div className="card">
                    <div className="card-body">
                       <form onSubmit={handleSubmit}>
                        <div className="form-group">
                          <label htmlFor="startDate">Select a Start Date: </label>
                          <input 
                           className="form-control"
                          id="startDate"
                          type="date"
                          name="startDate"
                          value={formData.startDate}
                          onChange={handleChange}
                        />
                       </div>

                       <div className="form-group">
                         <label htmlFor="endDate">Select an End Date: </label>
                         <input 
                         className="form-control"
                          id="endDate"
                          type="date"
                          name="endDate"
                          value={formData.endDate}
                          onChange={handleChange}
                        />
                      </div>

            <button
            className="btn btn-success float-right"
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

export default ListGenerateForm;