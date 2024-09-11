import React,{useState, useEffect} from "react";
import CapstoneApi from "../Api";
import ListAddForm from "../Forms/ListAddForm";
import ListGenerateForm from "../Forms/ListGenerateForm"
import "./ShoppingList.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";



const ShoppingList = () => {


   const [items, setItems] = useState("");
    const [start, setStart ] = useState("")
    const [end, setEnd] = useState("")
    
console.log(items, "before mount")
    useEffect(function getItemsOnMount(){
        console.debug("ShoppingList useEffect getItemsOnMount")
        show();
    },[])

    async function show(){
           let itemsRes = await CapstoneApi.getList();
           setItems(itemsRes);  
        console.log(items,"items during mount")
    }
   
    
    async function addItem (newItem){
        await CapstoneApi.postList(newItem)
        setItems(items => [...items, newItem])
    }

   
    async function generate({startDate, endDate}){
         console.log(startDate, "start")
         console.log(endDate, "end")
        setStart(startDate)
        setEnd(endDate)
        let plans = await CapstoneApi.generateList(startDate, endDate);
        console.log(plans)
        setItems(plans);
    }

     async function remove(id){
        console.log("removing:", id)
        await CapstoneApi.removeFromList(+id)
        setItems(items.filter((_,index) => index !== id))
    }


     
    return (
        <div className="ShoppingList">
            <h2 className="ShoppingList-title">Shopping List</h2>
           
            {items.length > 0 ? (
                <>
                <div className="ShoppingList-list">
                    <ul className="list">
                        <div className="vertical"></div>  
                     {items.aisles.map((item, index) => (
                        <div key={index}>
                        {item.items.map((t, i) => (
                            <> 
                         <li className="list-item" key={i}><span> {t.name} Metric: {t.measures.metric.amount}{t.measures.metric.unit} Imperial: {t.measures.us.amount}{t.measures.us.unit}</span><button onClick={() => remove(t.id)}><FontAwesomeIcon icon="fa-solid fa-rectangle-xmark" /></button></li>
                         </>
                        ))}
                     
                      </div>
                ))}
                 </ul>
                 </div>

                 <div>
                  
                 <h4 className="ShoppingList-add" >Add Item to List: </h4> 
                 <ListAddForm  addItem={addItem}/>
                 <h4 className="ShoppingList-gen">Generate From Meal Plan:</h4> 
                 <ListGenerateForm generate={generate} />
                 </div>
                </>
            ):(
                <div>
              <h3 className="ShoppingList-top">Your List is Empty</h3>
              <h4 className="ShoppingList-add">Add Item to List: </h4> 
              <ListAddForm  addItem={addItem}/>
              <h4 className="ShoppingList-or">Or</h4>
             <h4 className="ShoppingList-gen">Generate From Meal Plan:</h4> 
             <ListGenerateForm generate={generate}/>
             
             </div>
            )}
    
        </div>
    );
}

export default ShoppingList