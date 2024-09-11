import React,{useState, useEffect} from "react";
import CapstoneApi from "../Api";
import PlanAddForm from "../Forms/PlanAddForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./PlanDay.css"



const PlanDay = ({day}) => {
    console.log(day, "day")

    const initialState = [];
    const [plan, setPlan] = useState(initialState);
    const [da, setDate] = useState("");
    const [rId, setId] = useState("");
    const [sl, setSlot] = useState("");
    const [po, setPosition] = useState("")
    const [ti, setTitle] = useState("");
    const [se, setServings] = useState("");
    const [ty, setType] = useState("RECIPE")

   

    useEffect(function getPlanOnMount(){
        console.debug("PlanDay useEffect getPlanOnMount")
           getPlanDay(day);
    },[day])


 async function getPlanDay(day){
    try{
        const response = await CapstoneApi.getPlanDay(day)
        console.log(response, "response")
        initialState.push(response)
            setPlan(initialState)
        }
        catch(err){
            return <h3>No plan on that date</h3>
        }
    }
        console.log(plan, "plan")
 
    async function post({date, slot, position, id,servings,title, type } ){
        console.log(date, "date");
        console.log(id, "id");
        console.log(slot, "meal");
        console.log(position, "position");
        console.log(title, "title");
        console.log(servings, "servings");
        console.log(type, "type")

        setDate(date);
        setId(id);
        setSlot(slot);
        setPosition(position);
        setTitle(title);
        setServings(servings);
        setType(type);

        let planRes = await CapstoneApi.postPlan(date, slot, position, id, servings, title, type )
        console.log(typeof(planRes))
        setPlan(planRes)
        console.log(planRes)
     
    }

     async function remove(id){
        console.log("removing:", id)
        await CapstoneApi.removePlanItem(+id)
        setPlan(plan.filter((_,index) => index !== id))
       
    }


    return (
        <div className="PlanDetail">
           
            {plan.length === 1  ? (
                <div>
                  
                      <div className="PlanDetail-title">
                     <h2 className="PlanDetail-date">{day} {plan[0].day}</h2>
                     </div>
                  
                     <ul>
                        {plan[0].items.map((item,i) => (
                            <>
                         <li className="PlanDetail-item" key={item.id} > Meal: {item.slot} Recipe Id:{item.value.id} Servings: {item.value.servings} Title: {item.value.title} </li><button onClick={() => remove(item.id)}><FontAwesomeIcon icon="fa-solid fa-rectangle-xmark" /></button>
                         </>
                        ))}
                        
                    </ul>


                    <div className="table-container">
                      <table className="PlanDetail-nutrition-table">
                        <thead className="table-head">
                          <tr>
                            <th className="table-head-title"> Daily Nutrition </th>
                          </tr>
                        </thead>
                        <tbody className="table-body">
                         <tr className="table-empty"> Empty </tr>
                           {plan[0].nutrient.map((nrt, i) => ( 
                         <tr index={i}>
                           <td className="PlanDetail-ns" key={i}>{nrt}</td>
                         </tr>
                           ))}
                        </tbody>
                      </table>
                    </div>
            
                </div>   
            
    
             ) : (
                <div>
                  <h3>No plan on that date</h3>
               <h4 className="form-header" >Use the form to start your plan</h4>
               <PlanAddForm  post={post}/>
               
               </div>
              )}

     </div>
    );
     

}

export default PlanDay;
