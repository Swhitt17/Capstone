import React,{useState, useEffect} from "react";
import CapstoneApi from "../Api";
import ListAddForm from "../Forms/ListAddForm";
import ListGenerateForm from "../Forms/ListGenerateForm"



const ShoppingList = () => {
    const initialState = [];

    const [items, setItems] = useState(initialState);

    useEffect(function getItemsOnMount(){
        console.debug("ShoppingList useEffect getItemsOnMount")
        show();
    },[])

    async function show(){
        let items = await CapstoneApi.getList();
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
        <ListAddForm  addItem={addItem}/>
        <ListGenerateForm search={search}/>
        </>
        
    )  
    return (
        <div className="ShoppingList list">
            <h2>Shopping List</h2>

            {items.length  ? (
                <div className="ShoppingList list">
                
                    <ul className="list-group list-group-flush">
                     {items.map((item, i) => (
                        
                      <li className="list-group-item" key={i}><span>{item}</span><button onClick={() => remove(item)}>X</button></li>
                      
                ))}
                 </ul>
                 Add Item to List:  <ListAddForm  addItem={addItem}/>
                 Generate From Meal Plan: <ListGenerateForm search={search}/>
                </div>
            ):(
                <div>
              {/* <h4 className="lead">Click Add or Generate to start your list</h4> */}
             Add Item to List:  <ListAddForm  addItem={addItem}/>
             Generate From Meal Plan: <ListGenerateForm search={search}/>
             
             </div>
            )}

      
        </div>
    );
}

export default ShoppingList