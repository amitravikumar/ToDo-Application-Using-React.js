import React from 'react';
import ReactDOM from 'react-dom';
import InputField from './Components/InputField';
import StatusField from './Components/StatusField';

const $appRoot = document.querySelector('#app-root');

const App = () =>{
    const[newTask, setNewTask] = useState();
    const [newPriority, setPriority] = useState('Low');
    const [priorityCount, setPriorityCount] = useState({'Low':1, 'Medium':1, 'High':1});
    const [pendingCount, setPendingCount] = useState({'Completed':1, 'Pending':2});
    const [filterTasks, setFilterTasks] = useState('All');
}

const onInputChange = (event) => {
    setNewTask(event.target.value)
}

const [tasks, setTasks] = useState([
    { task:"Wash the car", isComplete: false, priority: "Medium"},
    { task:"Do Gardening", isComplete: true, priority: "Low"},
    { task:"Buy Groceries", isComplete: false, priority: "High"},
])

const [tasksAll, setTasksAll] = useState([...tasks]);

const pendingCountCalc = (data,operation) => {
    if(operation === 'add'){
        if(data){
            pendingCount("Completed") += 1
        }else{
            pendingCount("Pending") += 1
        }
    }else{
        if(data){
            pendingCount("Completed") -= 1
        }else{
            pendingCount("Pending") -= 1
        }
    }const obj = {...pendingCount}
    setPendingCount(obj);
}

const addTask =   () => {
    if(newTask.trim().length <1){
        swal("Task Description","Enter a valid Task","warning")
        return
    }
    const data = {task: newTask, isComplete: false, priority: newPriority}
    const arrayData = [...tasksAll, data];
    priorityCount[newPriority] += 1;
    const taskCount = {...priorityCount}
    setPriorityCount(taskCount)
    setTasksAll(arrayData)
    pendingCountCalc(false, 'add')
    filterChange("All", data)
}

const toggleTask = () => {
    
}