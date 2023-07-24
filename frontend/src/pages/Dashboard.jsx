import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import GoalForm from '../components/GoalForm'
import GoalItem from '../components/GoalItem'
import Spinner from '../components/Spinner'
import Popup from '../components/Popup'
import { getGoals, reset } from '../features/goals/goalSlice'
import { toast } from 'react-toastify'

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
  if(timeRemaining < 0) return -1;

  const priorityIncreaseFactor = 1;

  const updatedPriority = (originalPriority * Math.exp(1 / (priorityIncreaseFactor * timeRemaining))).toFixed(2);

  // Return the updated priority with a maximum of 100.
  // return Math.min(updatedPriority, 100);
  return Math.max(updatedPriority, originalPriority);
}


function Dashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [buttonPopup, setButtonPopup] = useState(false);
  const [sortParameter, setSortParameter] = useState(null)
  
  const { user } = useSelector((state) => state.auth)
  const { goals, isLoading, isError, message } = useSelector((state) => state.goals)

  // object = { ...object, property1: value1, property2: value2 }
  
  const [sortedGoals, setSortedGoals] = useState(goals);

  useEffect(() => {

    if (!user) {
      navigate('/login')
    }
    
    if (isError) {
      if(message !== "Cannot read properties of null (reading 'token')")
        toast.error(message);
    }

    dispatch(getGoals())


  }, [user, navigate, isError, message, dispatch])
 
  useEffect(() => {

    setSortedGoals(goals.slice().sort((a,b) => {
      if(sortParameter === "completeTime"){
        return (new Date(a[sortParameter]) - new Date(b[sortParameter]));
      }
      else if(sortParameter === "Age"){
        return getDaysLeft(b.createdAt) - getDaysLeft(a.createdAt);
      }
      else if(sortParameter === "daysLeft"){
        return getAge(b.completeTime) - getAge(a.completeTime);
      }
      else if(sortParameter === "agedPriority"){
        return getAgedPriority(b.completeTime, b.priority) - getAgedPriority(a.completeTime, a.priority);
      }
      else{
        return b[sortParameter] - a[sortParameter];
      }
    }));
    // console.log(sortParameter);
  }, [sortParameter, goals]);


  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section className='heading'>
        <h1>Welcome {user && user.name}</h1>
        <p>Goals Dashboard</p>
      </section>

      <section className="sort">
        <label for="sort" className='sortLabel'>Sort on the basis of </label>
        <select className="dropdown" name="sortParam" value={sortParameter} onChange={(e) => {setSortParameter(e.target.value)}}>
          <option value="createdAt">Create Time</option>
          <option value="priority">Priority</option>
          <option value="completeTime">Complete Time</option>
          <option value="daysLeft">Days Left</option>
          <option value="Age">Age</option>
          <option value="agedPriority">Aged Priority</option>
        </select>
      </section>

      <section className='content'>
        {sortedGoals.length > 0 ? (
          <div className='goals'>
            {sortedGoals.map((goal) => (
              <GoalItem key={goal._id} goal={goal} pastDate={getDaysLeft(goal.completeTime) < 0}/>
              ))}
          </div>
        ) : (
          <>
            <p>Journey towards success begin with one small goal</p>
            <p> Create a goal ⬇️ and get started now</p>
          </>
          )}
      </section>

      <br></br>
      <br></br>

      <button onClick={() => setButtonPopup(true)} className='btn btn-trigger'> Add a Goal </button>

      <Popup trigger={buttonPopup} setTrigger={setButtonPopup}> <GoalForm setTrigger={setButtonPopup}/> </Popup>

      {/* <GoalForm /> */}
    </>
  )
}

export default Dashboard