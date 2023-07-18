import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import GoalForm from '../components/GoalForm'
import GoalItem from '../components/GoalItem'
import Spinner from '../components/Spinner'
import Popup from '../components/Popup'
import { getGoals, reset } from '../features/goals/goalSlice'

function Dashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [buttonPopup, setButtonPopup] = useState(false);

  const { user } = useSelector((state) => state.auth)
  const { goals, isLoading, isError, message } = useSelector((state) => state.goals)

  useEffect(() => {
    if (isError) {
      console.log(message)
    }

    if (!user) {
      navigate('/login')
    }

    dispatch(getGoals())

    // return () => {
    //   dispatch(reset())
    // }
  }, [user, navigate, isError, message, dispatch])

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section className='heading'>
        <h1>Welcome {user && user.name}</h1>
        <p>Goals Dashboard</p>
      </section>

      <section className='content'>
        {goals.length > 0 ? (
          <div className='goals'>
            {goals.map((goal) => (
              <GoalItem key={goal._id} goal={goal} />
              ))}
          </div>
        ) : (
          <h3>You have not set any goals</h3>
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