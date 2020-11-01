import React, { Fragment } from "react";

const StatusField = (props) => {
  return (
    <Fragment>
        
        <dl className="list-group">
        <dt> <h4>{props.name}</h4></dt>
        {Object.keys(props.data).map(element => {
          return <dt key={element} className="list-group-item d-flex justify-content-between align-items-center px-3"> {element} 
           <span className="badge badge-primary badge-pill"> {props.data[element]} </span></dt>
        })
        }
        </dl>
    </Fragment>
  );
};

export default StatusField;