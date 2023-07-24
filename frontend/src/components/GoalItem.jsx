import { useDispatch } from 'react-redux'
import { useState, useEffect} from 'react'
import { deleteGoal } from '../features/goals/goalSlice'
import { AiFillDelete, AiFillEdit } from 'react-icons/ai'
import Popup from './Popup'
import UpdateGoalForm from './UpdateGoalForm'
import GoalDetails from './GoalDetails'

function GoalItem({ goal, pastDate }) {
  const dispatch = useDispatch()

  const [buttonPopup, setButtonPopup] = useState(false);
  const [buttonPopupDetails, setButtonPopupDetails] = useState(false);

  const dateAndTime = new Date(goal.createdAt).toLocaleString('id-ID').split(',');
  
  return (
    <div className={'goal ' + (pastDate ? 'redBorder' : ' ')}>
      <div className='date'>{dateAndTime[0]}</div>
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
      <button onClick={() => setButtonPopupDetails(true)} className='btn btn-item'>
        View Details
      </button>
      <Popup trigger={buttonPopupDetails} setTrigger={setButtonPopupDetails}>
        <GoalDetails setTrigger={setButtonPopupDetails} goal={goal}/>
      </Popup>
    </div>
  )
}

export default GoalItem