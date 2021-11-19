import React, {useContext, useState} from 'react'
import Stats from '../../windows/EventStatsWindow'
import style from '../Create/Style.module.css'
import { validateScores } from '../../utils/validation'
import { EventsContext } from '../../context/EventsContext'

function BothTeamsToScore({data}) {

  const { removeIsActive, removeCard,  updateEvent } = useContext(EventsContext);
  const [statsIsActive, setStatsIsActive] = useState(false)
  
  //deep cloning card; 
  let newCard = JSON.parse(JSON.stringify(data))
  
  //convert time stamps to sets
  newCard.stats.home.goal_timeStamps = new Set();
  newCard.stats.away.goal_timeStamps = new Set();

  let styleList = [style.form];
  
  if(removeIsActive === true){
    styleList =  [style.form, style.formDelete].join(' ')
  }
  else if(removeIsActive === false){
    styleList = [style.form]
  }


  const handlePredictionCode = (e) =>{
    const code = e.target.value
    
    if(code === "1"){
      newCard.both_teams_to_score.prediction = 'yes'
    }
    else if(code === "2"){
      newCard.both_teams_to_score.prediction = 'no'
    }
  }

  const handleStatsToggle = (e) => {
    e.preventDefault()
    e.stopPropagation();
    setStatsIsActive(!statsIsActive);
  }

  return (
    
       
        <form onClick={e=> removeCard(newCard.id)} className={styleList}>
          <div className={style.form_teams}>
            <h3>Teams</h3>
            <p>
              <input 
              onChange={e=>{
                  newCard.stats.general.home = e.target.value
                  const validatedCard = validateScores(newCard);
                  updateEvent(validatedCard);
              }} 
              onBlur={()=> updateEvent(newCard)} 
              type="text"
              value = {newCard.stats.general.home} 
              placeholder="home" />
            v
            <input 
            onChange={e=>{
              newCard.stats.general.away = e.target.value
              const validatedCard = validateScores(newCard);
              updateEvent(validatedCard);
            }}
            onBlur={()=> updateEvent(newCard)}
            type="text" 
            value= {newCard.stats.general.away}
            placeholder="away" />
            </p>
          </div>

          <div className={style.form_time}>
            <h3>Time</h3>
            <input 
            type="datetime-local"
            onBlur={()=> updateEvent(newCard)}
            value={newCard.stats.general.time}
            onChange={e=>{
                newCard.stats.general.time = e.target.value
                const validatedCard = validateScores(newCard);
                updateEvent(validatedCard);
              }}/>
          </div>

          <div className={style.form_prediction}>
            <h3>Prediction</h3>
            <select
            onChange={e=>{
              newCard.both_teams_to_score.prediction_code = e.target.value;
              const validatedCard = validateScores(newCard);
              updateEvent(validatedCard);
              handlePredictionCode(e)
           }}
            onBlur={()=> {
              const validatedCard = validateScores(newCard);
              updateEvent(validatedCard)
            }} 
            name="prediction_code" 
            value={newCard.both_teams_to_score.prediction_code}
            placeholder="prediction"
            >
              <option value="1">Yes</option>
              <option value="2">No</option>
            </select>
          </div>

          <div className={style.form_percentage}>
            <h3>Percentage</h3>
            <input
            onChange={e=>{
                newCard.both_teams_to_score.percentage = +e.target.value
                const validatedCard = validateScores(newCard);
                updateEvent(validatedCard);
            }} 
            onBlur={()=> updateEvent(newCard)}
            type="text" 
            value={newCard.both_teams_to_score.percentage}
            placeholder="percentage" />
          </div>

          <div className={style.form_odds}>
            <h3>Odds</h3>
            <div className={style.odds}>
              <div className={style.odd}>
                <h4>Yes</h4>
                <input 
                onChange={e=> {
                  newCard.both_teams_to_score.odds.yes = +e.target.value
                  const validatedCard = validateScores(newCard);
                  updateEvent(validatedCard);
                }}
                onBlur={()=> updateEvent(newCard)}
                type="number" 
                step="2"
                value={newCard.both_teams_to_score.odds.yes}
                placeholder="yes" />
              </div>
              <div className={style.odd}>
                <h4>No</h4>
                <input 
                onChange={e=> {
                  newCard.both_teams_to_score.odds.no = +e.target.value
                  const validatedCard = validateScores(newCard);
                  updateEvent(validatedCard); 
                }}
                onBlur={()=> updateEvent(newCard)}
                type="number"
                step="2" 
                value={newCard.both_teams_to_score.odds.no}
                placeholder="no" />
              </div>
            </div>
          </div>

          <div className={style.form_scores}>
            <h3>Scores</h3>
            <p>
              <input 
              onFocus={handleStatsToggle}
              type="text" 
              placeholder="home"
              value={newCard.stats.home.score}
              onChange={e=> {
                const validatedCard = validateScores(newCard);
                updateEvent(validatedCard);
              }}
              />
              
              <span> : </span>
              <input 
              onFocus={handleStatsToggle}
              type="text" 
              placeholder="away"
              value={newCard.stats.away.score} 
              onChange={e=> {
                const validatedCard = validateScores(newCard);
                updateEvent(validatedCard)
              }}
              />
            </p>
          </div>
          {statsIsActive && 
          <Stats 
            data = {newCard}
            id= {newCard.id}
            handleStatsToggle={handleStatsToggle}
          />}
        </form>
     
  )
}

export default BothTeamsToScore
