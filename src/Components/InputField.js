import React,{Fragment} from "react";

const InputField = (props) => {
  return (
    <div className="form-inline justify-content-center">
      <div className="form-group mx-sm-3 mb-2">
      <input
        type="text"
        value={props.newTask}
        onChange={props.onInputChange}
        placeholder="Add new task"
        className="form-control"
      />
      </div>
      <div className="form-group mx-sm-3 mb-2">
      <select value={props.newpriority} onChange={props.priorityChange} className="form-control">
                            <option value="Low" >Low</option>
                            <option value="Medium" >Medium</option>
                            <option value="High" >High</option>
                        </select>
      </div>                        
      <button className="btn btn-primary mx-sm-3 mb-2 px-4" onClick={props.addTask}>Add</button>
    </div>
  );
};

export default InputField;