import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Alert from "../Alert";



const RegisterForm = ({register}) => {
    let navigate = useNavigate();
    const initialState = {
        username: "",
        password: "",
        email: "",
        firstName: "",
        lastName: "",
    }

    const [formErrors, setFormErrors] = useState([]);
    const [formData,setFormData] = useState(initialState);

    const handleChange = e => {
        const {name, value} = e.target;
        setFormData(data => ({
            ...data,[name]: value
        }))
    }

    async function handleSubmit(e){
        e.preventDefault();
        let res = await register(formData)
       
        if(res.success){
            navigate('/')
            setFormData(initialState);
        }
        else{
            setFormErrors(res.errors)
        }

       
    }

    return (
        <div className='RegisterForm'>
            <div className='container col-md-6 offset-md-3 col-lg-4 offset-lg-4'>
              <h2 style={{textShadow: "2px 2px 2px white" }}>Register</h2>
               <div className='card'>
                 <div className='card-body'>
                  <form onSubmit={handleSubmit}>
                    <div className='form-group'>
                <label htmlFor="username">Username</label>
                <input
                className='form-control'
                id="username"
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                />
                </div>

                <div className='form-group' >
                <label htmlFor="password">Password</label>
                <input
                className='form-control'
                id="password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                />
                </div>

        
                <div className='form-group'>
                <label htmlFor="firstName">First Name</label>
                <input
                className='form-control'
                id="firstName"
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                />
                </div>

                <div className='form-group'>
                <label htmlFor="lastName">Last Name</label>
                <input
                className='form-control'
                id="lastName"
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                />
                </div>     <div className='form-group'>
                <label htmlFor="email">Email</label>
                <input
                className='form-control'
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                />
                </div>

                {formErrors.length
                ? <Alert type="danger" messages={formErrors}/>
                : null
                }

                <button 
                className='btn btn-success float-right' 
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

export default RegisterForm;