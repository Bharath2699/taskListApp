import {Component} from "react"
import {v4} from "uuid"
import Header from "../Header"
import "./index.css"

const statusData=[
    {id:"inProgress",
     name:"In-Progress"},

     {
       id:"pending",
       name:"Pending"
     },

     {
       id:"completed",
       name:"Completed"
     }
]

class TaskList extends Component{
    state={taskName:"",taskDesc:"",dueDate:"",assignedTo:"",status:"",taskList:[]}
    
    onChangeTask=(event)=>{
        this.setState({taskName:event.target.value})
    }

    onChangeTaskDesc=(event)=>{
        this.setState({taskDesc:event.target.value})
    }

    onChangeDate=(event)=>{
        this.setState({dueDate:event.target.value})
    }

    onChangeUser=(event)=>{
        this.setState({assignedTo:event.target.value})
    }

    onChangeStatusData=(event)=>{
        this.setState({status:event.target.value})
    }

    onEnterAddButton=()=>{
        const {taskName,taskDesc,dueDate,assignedTo,status}=this.state 
        if(taskName==="" || taskDesc==="" || dueDate==="" || assignedTo===""){
            alert("Enter all the input fields")
        }else{
        console.log(taskName)
        console.log(taskDesc)
        const newList={
               id:v4(),
               taskName:taskName,
               taskDescription:taskDesc,
               isCompleted:"false",
               status:status,
               dueDate:dueDate,
               assignedTo: assignedTo
        }

       this.setState(prevState=>({taskList:[...prevState.taskList,newList],
       taskName:"",
       taskDesc:"",
       dueDate:"",
       assignedTo:"",
       status:""
       
    }))
       
}  
    }

    onChangeStatus=(id)=>{
       
      this.setState(prevState=>({taskList:prevState.taskList.map(task=>{
        if (task.id===id){
            return {...task,isCompleted:!task.isCompleted}
        }
        return task
       
      }
    
      )}))
       
        
    }

    onDeleteTask=(id)=>{
        const {taskList}=this.state 
        const filteredList=taskList.filter(each=>each.id!==id)
        this.setState({taskList:filteredList})
    }

    render(){
        const {taskName,taskDesc,dueDate,assignedTo,status,taskList}=this.state
      console.log(status)
        return(
            <div className="list-card">
                <Header/>
                <div className="top-field">
                    <div className="input-fields">
                    <>
                    <label htmlFor="taskName" className="label">Task Name</label>
                    <input 
                    type="text"
                    value={taskName}
                    placeholder="Enter the TaskName"
                    onChange={this.onChangeTask}
                    className="taskInput"
                    id="taskName"
                    />
                    </>
                    <>
                    <label htmlFor="taskDesc" className="label">Task Description</label>
                   <input 
                    type="text"
                    value={taskDesc}
                    placeholder="Enter the TaskDescription"
                    onChange={this.onChangeTaskDesc}
                    className="taskInput"
                    id="taskDesc"
                    />
                    </>
                    <>
                    <label htmlFor="duedate" className="label">Due Date</label>
                   <input 
                    type="date"
                    value={dueDate}
                    placeholder="Select the Due Date"
                    onChange={this.onChangeDate}
                    className="taskInput"
                    id="duedate"
                    />
                    </>
                    </div>
                  
                    <div className="user">
                    <label htmlFor="user" className="label">Assigned To</label>
                   <input 
                    type="text"
                    value={assignedTo}
                    placeholder="Select the user"
                    onChange={this.onChangeUser}
                    className="taskInput"
                    id="user"
                    />
                    </div>

                    <button 
                    type="button"
                    className="addButton"
                    onClick={this.onEnterAddButton}
                    >Add</button>

                </div>
                <div className="bottom-card">
                    <h1>Task Summary</h1>
                    {taskList.map(task=>(
                        <li key={task.id} className={task.isCompleted===false?"completed":"notCompleted"}>
                        <p className="count">{taskList.indexOf(task)}</p>
                        <div>
                        <p className="task-name">Task Name : <span>{task.taskName}</span></p>
                        <p className="task-name"> Task Description : <span>{task.taskDescription}</span></p>
                        </div>
                        <div>
                        <p>Target Date : <span>{task.dueDate}</span></p>
                        <p>Assigned to : <span>{task.assignedTo}</span></p>
                        </div>
                       <select value={status} onChange={this.onChangeStatusData}>
                        {statusData.map(data=>(
                            <option key={data.id} >{data.name}</option>
                        ))}
                       </select>

                        <input 
                        type="checkbox"
                        className="check-box"
                         onChange={()=>this.onChangeStatus(task.id)}
     
                        />
                        <button 
                        type="button"
                        onClick={()=>this.onDeleteTask(task.id)}
                        className="delete-button">Delete</button>
                        </li>
                    ))}
                </div>
            </div>
        )
    }
}


export default TaskList
