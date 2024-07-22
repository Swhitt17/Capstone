import React, {useContext} from 'react';
import {Link} from "react-router-dom";
import { UserContext } from './UserContext';
import "./Home.css"



const Home = () => {

    const {currentUser} = useContext(UserContext);

    return (
        <div className='Home'>
            <div className='container text-center'>
              <h2 className='mb-4 fw-bold text-light'>Recipe Garden</h2>
                 <p className='lead text-warning'> Find,Plan, Prepare, and Enjoy</p>
            
            {currentUser ?
            <h3>Welcome Back, {currentUser.username}!</h3>
            :(
                <div> 
                  <h3 className='text-success'>Please log in or register to continue</h3>
                  <button className='btn btn-light font-weight-bold me-3'>
                   <Link to="/login"> 
                   Log in 
                   </Link>
                 </button>
                 <button className="btn btn-dark font-weight-bold me-3">
                  <Link to="/register"> 
                  Register 
                  </Link>
                </button>
               
                </div>
            )}
            </div>
        </div>
        
    );
}

export default Home;