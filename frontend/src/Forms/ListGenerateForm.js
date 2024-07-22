import React, {useState} from "react";

const ListGenerateForm = ({search}) => {

    const initialState = {
        startDate: "",
        endDate: ""
    }
     const [formData, setFormData] = useState(initialState);

     const handleChange = e => {
        
        setFormData( e.target.value)
     }

     const handleSubmit = async(e) => {
        e.preventDefault();
        search(formData)
        setFormData(initialState)
     }


     return(
         <div className="ListGenerateForm">
            <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
                <div className="card">
                    <div className="card-body">
                       <form onSubmit={handleSubmit}>
                        <div className="form-group">
                          <label htmlFor="start-date">Select a Start Date: </label>
                          <input 
                           className="form-control"
                          id="start-date"
                          type="date"
                          name="start-date"
                          value={formData.startDate}
                          onChange={handleChange}
                        />
                       </div>

                       <div className="form-group">
                         <label htmlFor="end-date">Select an End Date: </label>
                         <input 
                         className="form-control"
                          id="end-date"
                          type="date"
                          name="end-date"
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