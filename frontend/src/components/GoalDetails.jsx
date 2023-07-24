import React from 'react'

function getAge(createdAt) {
    const msDiff2 = new Date().getTime() - new Date(createdAt).getTime();    //current date - created date
    const age = Math.floor(msDiff2 / (1000 * 60 * 60 * 24)) ;
    return age;
  }
  
function getDaysLeft(completeTime){
    const msDiff1 = new Date(completeTime).getTime() - new Date().getTime();    //Future date - current date
    const daysLeft = Math.floor(msDiff1 / (1000 * 60 * 60 * 24)) + 1;
    return daysLeft;
}

function getAgedPriority(completeTime, originalPriority){

    // const currentDate = new Date();
    // const deadline = new Date(completeTime);
    const timeRemaining = getDaysLeft(completeTime);

    const priorityIncreaseFactor = 1;
  
    const updatedPriority = (originalPriority * Math.exp(1 / (priorityIncreaseFactor * timeRemaining))).toFixed(2);
  
    return Math.max(updatedPriority, originalPriority);
}

function GoalDetails(props) {
    const {text,completeTime,priority,createdAt} = props.goal;

    return (
        <div className='goalDetail'>
            <div className='heading'>
                <h1>Goal Details</h1>
            </div>
            <div className="text">
                <div className="heading">
                    Goal
                </div>
                <div className="content">
                    {text}
                </div>
            </div>
            {/* <br></br> */}
            <div className="created">
                <div className="heading">
                    Created At
                </div>
                <div className="content">
                    {new Date(createdAt).toLocaleDateString('in-IN')}
                </div>
            </div>
            
            <div className="complete">
                <div className="heading">
                    To be completed till
                </div>
                <div className="content">
                    {new Date(completeTime).toLocaleDateString('in-IN')}
                </div>
            </div>
            
            <div className="priority">
                <div className="heading">
                    Priority
                </div>
                <div className="content">
                    {priority}
                </div>
            </div>
           
            <div className="daysLeft">
                <div className="heading">
                    Days Left
                </div>
                <div className="content">
                    {getDaysLeft(completeTime)}
                </div>
            </div>

            <div className="age">
                <div className="heading">
                    Age
                </div>
                <div className="content">
                    {getAge(createdAt)}
                </div>
            </div>

            <div className="agedPriority">
                <div className="heading">
                    Aged Priority
                </div>
                <div className="content">
                    {(getDaysLeft(completeTime) > 0) ? getAgedPriority(completeTime,priority) : "You are past deadline, please update the completion time"}
                </div>
            </div>
        </div>
    )
}

export default GoalDetails
