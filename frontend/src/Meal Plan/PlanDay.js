import React,{useState, useEffect} from "react";
// import {useParams} from "react-router-dom";
import CapstoneApi from "../Api";
import PlanAddForm from "../Forms/PlanAddForm";


const PlanDay = ({date}) => {
    console.log(date)

    // const {date} = useParams();

    // const initialState = []

 const [plan, setPlan] = useState([]);

    useEffect(function getPlanOnMount(){
        console.debug("PlanDay useEffect getPlanOnMount")
    //     // console.log(date)
        async function getPlanDay(){
            setPlan(await CapstoneApi.getPlanDay(date))
        }
           getPlanDay();
    },[date])


    // console.log(typeof(date))
    // console.log(plan)
        
    // async function show(date){
    //     let plan  = await CapstoneApi.getPlanDay(date)
    //     console.log(plan)
    //     setPlan(plan);
    // }
    // show()

      const addMeal = (newPlan) => {
        setPlan(plan => [...plan,newPlan])
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
                    <h2>{p.date} {p.day}</h2>
                    <ul>
                        <li>{p.item}</li><button onClick={() => remove(p)}>X</button>
                    </ul>
                    <ul>
                        <li>{p.nutrients}</li>
                    </ul>

                </div>   
                
              )
                
             ) : (
                <div>
               <h5>Use the form to start your plan</h5>
               <PlanAddForm addMeal={addMeal}/>
               {/* <button  className="btn btn-success float-right" >Add</button> */}
               </div>
              )}

     </div>
    );
     

}

export default PlanDay;
