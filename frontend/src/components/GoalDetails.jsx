import React from 'react'

function GoalDetails(props) {
    const {text,completeTime,priority,createdAt} = props.goal;

    const msDiff1 = new Date(completeTime).getTime() - new Date().getTime();    //Future date - current date
    const daysLeft = Math.floor(msDiff1 / (1000 * 60 * 60 * 24)) + 1;

    const msDiff2 = new Date().getTime() - new Date(createdAt).getTime();    //current date - created date
    const age = Math.floor(msDiff2 / (1000 * 60 * 60 * 24)) + 1;

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
                    {daysLeft}
                </div>
            </div>

            <div className="age">
                <div className="heading">
                    Age
                </div>
                <div className="content">
                    {age}
                </div>
            </div>
        </div>
    )
}

export default GoalDetails
