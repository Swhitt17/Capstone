import React, {useContext} from 'react';
import {Link} from "react-router-dom";
import { UserContext } from './UserContext';
import "./Home.css"
import HomeCards from './HomeCards';




const Home = () => {

    const {currentUser} = useContext(UserContext);

    return (
        <div className='Home'>
            <div className='container text-center'>
              <h1 className='title'>Recipe Garden</h1>
                 <h4 className="subtitle"> Find, Plan, Prepare, and Enjoy </h4>
                 

                
            
            {currentUser ?
            <div>
            <h2 className='Home-subtitle' >Welcome Back, {currentUser.username}!</h2>

            
              <HomeCards />
             </div>
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