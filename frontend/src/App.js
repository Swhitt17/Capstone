import React, { useEffect, useState } from 'react';
import {Routes, Route} from 'react-router-dom';
import './App.css';
import Home from './Home';
import RegisterForm from './Forms/RegisterForm';
import LoginForm from './Forms/LoginForm';
import CapstoneApi from './Api';
import { UserContext } from './UserContext';
import { jwtDecode } from 'jwt-decode';
import Profile from './Forms/Profile';
import NavBar from './NavBar';
import useLocalStorage from './Hooks/useLocalStorage';
import RecipeList from "./Recipe/RecipeList";
import RecipeDetail from "./Recipe/RecipeDetail";
import ShoppingList from "./Shopping List/ShoppingList";
import PlanCalendar from './Meal Plan/PlanCalendar';
import PrivateRoute from './PrivateRoute';
import PlanDay from './Meal Plan/PlanDay';
// import { CredentialContext } from './CredentialContext';
import NotFound from './NotFound';
// import './Calendar.css';

export const TOKEN_ID = "capstone-token";

function App() {
const [token,setToken] = useLocalStorage(TOKEN_ID);
// const [credentials, setCredentials] = useState(null)
const [currentUser,setCurrentUser] = useState(null);

async function register(registerData){
  console.log(registerData)
  let token = await CapstoneApi.register(registerData)
  setToken(token);
  return {success:true};
}


async function login(loginData){
  let token = await CapstoneApi.login(loginData)
  setToken(token);
  return {success:true};
}

async function logout(){
  setToken(null);
  setCurrentUser(null);
  
}

useEffect(function getUserData(){
  async function getCurrentUser(){
    let {username} = jwtDecode(token)
    CapstoneApi.token = token
    let currentUser = await CapstoneApi.getCurrentUser(username);
    setCurrentUser(currentUser)
  }
  getCurrentUser();
  },[token]);




  return (
    <div className="App">
      <UserContext.Provider value={{currentUser, setCurrentUser}}>
      {/* <CredentialContext.Provider value={{credentials, setCredentials}}> */}

     <NavBar logout={logout}/>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/recipes' element={<RecipeList />}></Route>
        <Route path='/recipes/:id' element={<RecipeDetail/>}></Route>

        <Route element= {<PrivateRoute />}>
         <Route path='/profile' element={<Profile />}></Route>
        <Route path='/mealplans' element={<PlanCalendar />}></Route>
        <Route path='/mealplans/:date' element={<PlanDay />}></Route>
        <Route path='/lists' element={<ShoppingList />}></Route>
        </Route>


        <Route path='/register' element={<RegisterForm register={register} />}></Route>
        <Route path='/login' element={<LoginForm login={login}/>}></Route>
        <Route path='*' element={<NotFound />}></Route>


      </Routes> 
      {/* </CredentialContext.Provider> */}
      </UserContext.Provider>
    
    </div>
  );
}

export default App;
