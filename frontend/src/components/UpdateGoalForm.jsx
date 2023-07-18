import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateGoal } from '../features/goals/goalSlice'

function UpdateGoalForm(props) {
  const [text, setText] = useState(props.goal.text)

  const dispatch = useDispatch()

  const onSubmit = (e) => {
    e.preventDefault()

    dispatch(updateGoal({ goalId : (props.goal._id), goalData : {text}}));
    setText('')

    props.setTrigger(false);

    window.location.reload(false);

  }

  return (
    <section className='form'>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='text'>Update the Goal</label>
          <input
            type='text'
            name='text'
            id='text'
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div className='form-group'>
          <button className='btn btn-block' type='submit'>
            Update Goal
          </button>
        </div>
      </form>
    </section>
  )
}

export default UpdateGoalForm;