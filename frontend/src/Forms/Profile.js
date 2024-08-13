import React, {useContext, useState} from "react";
import {UserContext} from "../UserContext";
import CapstoneApi from "../Api";
import Alert  from "../Alert";

const Profile = () => {
    const {currentUser, setCurrentUser} = useContext(UserContext);

    const initialState = {
        username: currentUser.username,
        email: currentUser.email,
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        password:""

    }

    const [formData,setFormData] = useState(initialState);
    const [formErrors,setFormErrors]= useState([]);
    const [changesSaved, setChangesSaved] = useState([]);

    const handleChange = e => {
        const {name, value} = e.target;
        setFormData(data => ({
            ...data,[name]: value
        }));

        setFormErrors([]);
    }

    async function handleSubmit(e){
        e.preventDefault();

        let profileData = {
            password: formData.password,
            email: formData.email,
            firstName: formData.firstName,
            lastName: formData.lastName
        }

        let username = formData.username;
        let updatedUser;
        try{
            updatedUser = await CapstoneApi.updateCurrentUser(username, profileData)
        }
        catch(errors){
            setFormData(errors);
            return;
        }

        setFormErrors(data => ({
            ...data,password:""
        }));
        setFormErrors([])
        setChangesSaved(true);
        setCurrentUser(updatedUser);
    }

    return (
        <div className="Profile" >
            <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
            <h2 style={{textShadow: "2px 2px 2px white" }} >Profile</h2>
              <div className="card">
                <div className="card-body">
                 <form onSubmit={handleSubmit}>
                    <div className="form-group">
                  <label  htmlFor="username">Username</label>
                <input
                className="form-control"
                id="username"
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                />
                </div>

                <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                className="form-control"
                id="password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                />
                </div>

                <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                className="form-control"
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                />
                </div>

                <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input
                className="form-control"
                id="firstName"
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                />
                </div>

                <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input
                className="form-control"
                id="lastName"
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                />
                </div>

                {formErrors.length
                ? <Alert type="danger" messages={formErrors}/>
                : null
                }

                {/* {changesSaved
                ? <Alert type="success" messages={"Updated Successfully"}/>
                : null
                } */}

                <button
                className="btn btn-success btn-block mt-4"
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

export default Profile;