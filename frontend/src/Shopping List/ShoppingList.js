import React,{useState, useEffect, useContext} from "react";
import CapstoneApi from "../Api";
import ListAddForm from "../Forms/ListAddForm";
import ListGenerateForm from "../Forms/ListGenerateForm"
import { UserContext } from "../UserContext";
import "./ShoppingList.css";



const ShoppingList = () => {

    const {username, userHash} = useContext(UserContext);
    const initialState = [];

    const [items, setItems] = useState(initialState);

    useEffect(function getItemsOnMount(){
        console.debug("ShoppingList useEffect getItemsOnMount")
        show();
    },[username,userHash])

    async function show(){
        
           let items = await CapstoneApi.getList(username, userHash);
           setItems(items);  
     
       
    }

    console.log(items)
    async function addItem (newItem){
        await CapstoneApi.postList(newItem)
        setItems(items => [...items, newItem])
    }



    // useEffect(function getPlansOnMount(){
    //     console.debug("ShoppingList useEffect getPlansOnMount")
    //     search();
    // }, [])

    async function search(date){
        let plans = await CapstoneApi.getPlanDay(date);
        setItems(plans);
    }

    function remove(item){
        setItems(items.filter(i => i !== item))
        console.log("removing:", item)
    }


    if(!items) return(
        <>
        <h3>Your List is Empty</h3>
        <ListAddForm  addItem={addItem}/>
        <ListGenerateForm search={search}/>
        </>
        
    )  
    return (
        <div className="ShoppingList list">
            <h2 style={{textShadow: "2px 2px 2px white" }}>Shopping List</h2>
           

            {items.length  ? (
                <div className="ShoppingList list">
                
                    <ul className="list-group list-group-flush">
                     {items.map((item, i) => (
                        
                      <li className="list-group-item" key={i}><span>{item}</span><button onClick={() => remove(item)}>X</button></li>
                ))}
                 </ul>
                  
                 <h4 className="ShoppingList-add" >Add Item to List: </h4> 
                 <ListAddForm  addItem={addItem}/>
                 <h4 className="ShoppingList-gen">Generate From Meal Plan:</h4> 
                 <ListGenerateForm search={search}/>
                 </div>
                
            ):(
                <div>
              {/* <h4 className="lead">Click Add or Generate to start your list</h4> */}
              <h4 className="ShoppingList-add">Add Item to List: </h4> 
              <ListAddForm  addItem={addItem}/>
             <h4 className="ShoppingList-gen">Generate From Meal Plan:</h4> 
             <ListGenerateForm search={search}/>
             
             </div>
            )}
        

        

            
      
        </div>
    );
}

export default ShoppingList