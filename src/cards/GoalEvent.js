import React, {useContext } from 'react'
import style from './GoalEvent.module.css';
import {EventsContext} from '../context/EventsContext'

const GoalEvent = (props) =>{

  //console.log('data in Goal Events ', props.data)
    const {saveEventStats} = useContext(EventsContext)
    const newEvent = { ...props.event }

    const handleTeamInput = (e) => {
      const ev = { ...newEvent }
      ev.team = e.target.value
      newEvent.team = ev.team
      props.update(ev)
    }


    const handleTimeStampInput = (e) => {
      const ev = { ...newEvent }
      // ////console.log(ev)
      ev.timeStamp = +e.target.value
      newEvent.timeStamp = ev.timeStamp
      props.update(ev)
    }

  return (       
          <div
            className={`${style.form_stats_goal} ${props.mode ? style.deleteMode : null}`}
            onClick={e => {
              saveEventStats(e, props.goalEvents, props.data)
              props.deleteGoalEvent(props.mode, newEvent.id)
            }}
          >
            <select value={newEvent.team} 
            onChange={e=>{
              handleTeamInput(e)
              saveEventStats(e, props.goalEvents, props.data)
            }} 
              onBlur={handleTeamInput} 
              name="stats_team_scored">
              <option defaultValue value="home">Home</option>
              <option value="away">Away</option>
            </select>
            <input value={newEvent.timeStamp} onChange={handleTimeStampInput} type="number" placeholder="time" />
          </div>
        )
  }
export default GoalEvent
