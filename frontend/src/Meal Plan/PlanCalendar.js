import React,{useState} from "react";
import Calendar from "react-calendar"
import PlanDay from "./PlanDay";
import "./PlanCalendar.css"



const PlanCalendar = () => {

    
    const [dateFormat, setDateFormat] = useState("");

 
    const months = {
        Jan: '01',
        Feb: '02', 
        Mar: '03',
        Apr: '04',
        May: '05',
        Jun: '06',
        Jul: '07',
        Aug: '08',
        Sep: '09',
        Oct: '10',
        Nov: '11',
        Dec: '12'
    }
 

    const handleOnClickDay = (value, event) => {
        const words = value.toString().split(" ")
        const date = words.slice(1,4)
        const day = date[1]
        const month = date[0]
        const year = date[2]
        const monthNumber = months[month]
        
        
       setDateFormat (`${year}-${monthNumber}-${day}`)
     
    }


   
    return(
        <div>
             <h2 className="PlanCalendar-title">Meal Plans</h2>
             <Calendar onClickDay={	handleOnClickDay} calendarType="gregory" />
             <PlanDay day={dateFormat}/>
     

        

        </div>
        




    )
}

export default PlanCalendar;


