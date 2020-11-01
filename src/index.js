import React,{useState} from "react";
import ReactDOM from "react-dom";
import InputField from "./Components/InputField";
import StatusField from "./Components/StatusField";

const $appRoot = document.querySelector("#app-root")

    const App = () => {
        const [newtask,setnewtask] = useState("")
        const [newpriority,setnewpriority] = useState("Low")
        const [priorityCount,setpriorityCount] = useState({ "Low" : 1, "Medium" : 1, "High" : 1})
        const [pendingCount,setpendingCount] = useState({ "Completed" : 1, "Pending" : 2})
        const [filterTasks,setfilterTasks] = useState("All")

        const onInputChange = (event) => {
            setnewtask(event.target.value)
        }
        const [tasks,setTasks] = useState([
            { task:"Wash the car", isComplete: false, priority: "Medium"},
            { task:"Do Gardening", isComplete: true, priority: "Low"},
            { task:"Buy Groceries", isComplete: false, priority: "High"},
        ]);
        const [tasksAll,setTasksAll] = useState([...tasks])
        
        const pendingCountCalc = (data,operation) => {
            if(operation === "add")
            {
                if(data){
                    pendingCount["Completed"] += 1 
                }else{
                    pendingCount["Pending"] += 1 
                }
            } else{
                if(data){
                    pendingCount["Completed"] -= 1 
                }else{
                    pendingCount["Pending"] -= 1 
                }
            }
            const obj = {...pendingCount}
            setpendingCount(obj)
        }

        const addTask =   () => {
            if(newtask.trim().length <1){
                swal("Task Description","Enter a valid Task","warning")
                return
            }
            const data = {task: newtask,isComplete:false,priority:newpriority};
            const arrayData =  [...tasksAll,data]
            priorityCount[newpriority] += 1
            const taskCount = {...priorityCount }
            setpriorityCount(taskCount)
            setTasksAll(arrayData)
            pendingCountCalc(false,"add")
            filterChange("All",data)
         }
         const toggleTask = (index) => {
            let data = !tasksAll[index].isComplete
            tasksAll[index].isComplete = data
            const array  = [...tasksAll]
            setTasksAll(array)
            pendingCountCalc(data,"add")
            pendingCountCalc(!data,"sub")
            filterChange("All")
         }
         
         const deleteEntry = (index) => {
            let data = tasksAll[index]
            const priVal = data.priority
            pendingCountCalc(data.isComplete,"sub")
            priorityCount[priVal] -= 1
            const taskCount = {...priorityCount }
            setpriorityCount(taskCount)
            tasksAll.splice(index,1)
            const array  = [...tasksAll]
            setTasksAll(array)
            filterChange("All")
         }

         const handlePriotity = (index,event) => {
            const preValue = tasksAll[index].priority
            const value = event.target.value
            tasksAll[index].priority = value
            const oldCount = parseInt(priorityCount[preValue]) - 1
            const newCount = parseInt(priorityCount[value]) + 1
            priorityCount[value] = newCount
            priorityCount[preValue] = oldCount
            const taskCount = {...priorityCount }
            const array  = [...tasksAll]
            setTasksAll(array)
            setpriorityCount(taskCount)
            filterChange("All")
         }
         
         const priorityChange = (event) => {
            setnewpriority(event.target.value)
            filterChange("All")
         }

         const filterChange = (event,extradata) => {
            const data = (event === "All") ? "All" : event.target.value
            if( data == "All"){
                let array1= [...tasksAll]
                if( typeof extradata !== "undefined"){
                    array1= [...tasksAll,extradata]
                }else{
                    array1= [...tasksAll]
                }
                setTasks(array1)
            } else {
                const filter = (data === "Completed") ? true : false;
                const newArray = tasksAll.filter( element => {
                    if( element.isComplete === filter){
                        return element
                    }
                    return
                }) 
                setTasks(newArray)
            }
            setfilterTasks(data)
         }

        return (
            <div className="container my-5">
                <h1 className="text-center mb-5"> ToDolist </h1>
                <div className="form-group row my-3">
                    <label className="col-sm-2 col-form-label font-weight-bold text-center">Filter Criteria</label>
                    <div className="col-sm-10">
                    <select value={filterTasks} onChange={filterChange} className="form-control" >
                            <option value="All" >All</option>
                            <option value="Pending" >Pending</option>
                            <option value="Completed" >Completed</option>
                        </select>
                    </div>
                </div>
                
                <InputField
                    newTask={newtask}
                    onInputChange={onInputChange}
                    addTask={addTask}
                    priority={newpriority}
                    priorityChange = {priorityChange}
                />
                <ul className="list-group list-group-flush my-3 text-center">
                    {tasks.map( (taskObject,index) => {
                        const clickTask = () => {
                            toggleTask(index)
                        }
                        const deleteTask = () => {
                            deleteEntry(index)
                        }
                        const handlePriotityChange = () => {
                            handlePriotity(index,event)
                        }
                        const colorLi = (taskObject.priority === "Low") ? "list-group-item list-group-item-primary" 
                        : (taskObject.priority === "Medium") ? "list-group-item list-group-item-warning" : "list-group-item list-group-item-danger";

                        return <li key={index} className={colorLi}> 
                        <div className="row justify-content-center align-items-center">
                        <span onClick={clickTask} className="px-5 col-sm-5 my-1">{taskObject.task} - {taskObject.isComplete ? "✔️" : "🕒"}</span>
                        <span onClick={deleteTask} className="px-5 col-sm-2 my-1">🗑️</span>
                        <select value={taskObject.priority}  onChange={handlePriotityChange} className="form-control px-5 col-sm-3 my-1 ">
                            <option value="Low" >Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High" >High</option>
                        </select>
                        </div>
                        </li>
                    })}
                </ul>
                <div className="row justify-content-around my-5">
                <StatusField name="Priority Task Count" data={priorityCount} className="col-lg-6"/>
                <StatusField name="Task Status Count" data={pendingCount} className="col-lg-6"/>
                </div>
                </div>
        )
    }
        
    ReactDOM.render(<App />,$appRoot)