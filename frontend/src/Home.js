import React, {useContext} from 'react';
import {Link} from "react-router-dom";
import { UserContext } from './UserContext';
import "./Home.css"



const Home = () => {

    const {currentUser} = useContext(UserContext);

    return (
        <div className='Home'>
            <div className='container text-center'>
              <h1 className='mb-4 fw-bold text-light'>Recipe Garden</h1>
                 <h4 className=' text-info'> Find, Plan, Prepare, and Enjoy </h4>
            
            {currentUser ?
            <h2 style={{ color: "white",textShadow: "2px 2px 2px  #4370d1" }} >Welcome Back, {currentUser.username}!</h2>
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