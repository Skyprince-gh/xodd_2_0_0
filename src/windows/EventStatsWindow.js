import React, { useState, useContext } from 'react'
import style from './EventStatsWindow.module.css'
import { Add, Close, Save, Delete } from '@material-ui/icons'
import GoalEvent from '../cards/GoalEvent'
import { v4 as uuid } from 'uuid';
import { EventsContext } from '../context/EventsContext'

const EventStatsWindow = ({data, handleStatsToggle}) => {

  const {saveEventStats} = useContext(EventsContext)
  const [goalEvents, setGoalEvents] = useState(data.stats.goalEvents);
  const [deleteMode, setDeleteMode] = useState(false);

  let card = {...data}
  const toggleDeleteMode = (e) => {
    e.preventDefault();
    // const deleteMode = this.state.deletMode; 
    setDeleteMode(!deleteMode);
  }

  const AddGoalEvent = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const id = uuid();
    const arr = [...goalEvents];

    const data = {
      id,
      team: 'home',
      timeStamp: ''
    }

    arr.push(data);
    ////console.log('event added: ',arr)
    setGoalEvents(arr);
  }


  //updates the goal event array with new values
  const updateGoalEvent = (data) => {
    ////console.log('updated single data: ',data, 'updated data id: ', data.id)
    const events = [...goalEvents];

    const updatedEvents = events.map(event => {
      if (event.id === data.id) {
        event = data;
      }
      return event
    });

    //console.log('updated Events:', updatedEvents)
    setGoalEvents(updatedEvents)
  }

  const deleteGoalEvent = (mode, id) => {
    if (mode === false) {
      return
    }
    ////console.log('deleted single data: ', id , 'delete data id: ', id)
    const events = [...goalEvents];

    const updatedEvents = events.filter(event => {
      if (event.id === id) {
        return false
      }
      return true
    });

    ////console.log('updated Events: ', updatedEvents)
    setGoalEvents(updatedEvents)
  }

  return (
    <div className={style.form_stats}>
      <div className={style.form_stats_window}>
        <h3>Scores Stats (id: {card.id.slice(0, 20)}...) </h3>
        <div className={style.form_stats_scores}>
          {goalEvents.length > 0 ? goalEvents.map(goalEvent => {
            return <GoalEvent
              key={goalEvent.id}
              event={goalEvent}
              goalEvents={goalEvents}
              update={updateGoalEvent}
              mode={deleteMode}
              data={card}
              deleteGoalEvent={deleteGoalEvent}
            />
          }) : null}
        </div>
        <div className={style.stats_controls}>
          <button onClick={AddGoalEvent}> <Add /> </button>
          <button onClick={toggleDeleteMode }> <Delete /> </button>
          <button onClick={e => {
            e.preventDefault()
            saveEventStats(e, goalEvents, card);
            //console.log('In event stats component :', goalEvents , card)
            handleStatsToggle(e)
          }
          }> <Save/> </button>
          <button onClick={handleStatsToggle}> <Close /> </button>
        </div>
      </div>
    </div>
  )
}


export default EventStatsWindow
