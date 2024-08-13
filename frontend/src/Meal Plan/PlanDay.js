import React,{useState, useEffect} from "react";
// import {useParams} from "react-router-dom";
import CapstoneApi from "../Api";
import PlanAddForm from "../Forms/PlanAddForm";
import { CredentialContext } from "../CredentialContext";


const PlanDay = ({date}) => {
    console.log(date, "date")

    const [da, setDate] = useState("");
    const [rId, setId] = useState("");
    const [ml, setMeal] = useState("");
    const [po, setPosition] = useState("")
    const [ti, setTitle] = useState("");
    const [se, setServings] = useState("");



 const [plan, setPlan] = useState([]);

    useEffect(function getPlanOnMount(){
        console.debug("PlanDay useEffect getPlanOnMount")
           getPlanDay();
    },[])


 async function getPlanDay(){
    const response = await CapstoneApi.getPlanDay(date)
    console.log(response.data, "data")
            setPlan(response.data)
        }

    //   const addMeal = (newPlan) => {
    //     setPlan(plan => [...plan,newPlan])
    // }

    //
    async function post({date, meal, position, id,servings,title } ){
        console.log(date, "date");
        console.log(id, "id");
        console.log(meal, "meal");
        console.log(position, "position");
        console.log(title, "title");
        console.log(servings, "servings");

        setDate(date);
        setId(id);
        setMeal(meal);
        setPosition(position);
        setTitle(title);
        setServings(servings);

        let planRes = await CapstoneApi.postPlan({date, meal, position,id, servings, title })
        setPlan(planRes)
        console.log(planRes)
     
    }

    function remove(item){
        setPlan(plan.filter(p => p !== item))
        console.log("removing:", item)
    }

    if(!plan) return <h3>Cannot find any plans</h3>

    return (
        <div className="PlanDetail">
           
            {plan.length ? (p => (
              <div>
                    <h2 className="PlanDetail-date">{date} {p.day}</h2>
                    <ul>
                        <li className="PlanDetail-item">{p.item}</li><button onClick={() => remove(p)}>X</button>
                    </ul>
                    <ul>
                        <li className="PlanDetail-ns">{p.nutrients}</li>
                    </ul>

                </div>   
                
              )
                
             ) : (
                <div>
               <h4 style={{color: "white", textShadow: "2px 2px 2px #d9675d" }}>Use the form to start your plan</h4>
               <PlanAddForm  post={post}/>
               {/* <button  className="btn btn-success float-right" >Add</button> */}
               </div>
              )}

     </div>
    );
     

}

export default PlanDay;
