import { useDispatch } from 'react-redux'
import { useState, useEffect} from 'react'
import { deleteGoal, updateGoal, getGoals } from '../features/goals/goalSlice'
import { AiFillDelete, AiFillEdit } from 'react-icons/ai'
import Popup from './Popup'
import UpdateGoalForm from './UpdateGoalForm'

function GoalItem({ goal }) {
  const dispatch = useDispatch()
  
  const [isHovering, setIsHovering] = useState(false);
  const [buttonPopup, setButtonPopup] = useState(false);

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  // useEffect(() => {
  
  //   dispatch(getGoals())

  // }, []);

  const dateAndTime = new Date(goal.createdAt).toLocaleString('en-US').split(',');
  
  return (
    <div className='goal' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
      <div className='date'>{dateAndTime[0] + (isHovering ? dateAndTime[1] : "")}</div>
      <h2 className='goalText'>{goal.text}</h2>
      <button onClick={() => dispatch(deleteGoal(goal._id))} className='close'>
        <AiFillDelete />
      </button>
      <button onClick={() => setButtonPopup(true)} className='update'>
        <AiFillEdit />
      </button>
      <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
        <UpdateGoalForm setTrigger={setButtonPopup} goal={goal}/>
      </Popup>
    </div>
  )
}

export default GoalItem