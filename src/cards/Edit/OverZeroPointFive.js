import React, {useContext, useState} from 'react'
import Stats from '../../windows/EventStatsWindow'
import style from './Style.module.css'
import { validateScores } from '../../utils/validation'
import { EventsContext } from '../../context/EventsContext'

function OverZeroPointFive({data}) {

  const { removeIsActive, removeCard,  updateEditedEvent} = useContext(EventsContext);
  const [statsIsActive, setStatsIsActive] = useState(false)
  
  //deep cloning card;
  let newCard = JSON.parse(JSON.stringify(data))
  
  //console.log('edit info over 0.5 data: ',data)
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
    //console.log('goals prediction code assigned')
    const code = e.target.value
    
    if(code === "1"){
      newCard.over_zero_point_five.prediction = 'over 0.5'
    }
    if(code === "0"){
      newCard.over_zero_point_five.prediction = 'under 0.5'
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
                  updateEditedEvent(validatedCard);
              }} 
              onBlur={()=> updateEditedEvent(newCard)} 
              type="text"
              value = {newCard.stats.general.home} 
              placeholder="home" />
            v
            <input 
            onChange={e=>{
              newCard.stats.general.away = e.target.value
              const validatedCard = validateScores(newCard);
              updateEditedEvent(validatedCard);
            }}
            onBlur={()=> updateEditedEvent(newCard)}
            type="text" 
            value= {newCard.stats.general.away}
            placeholder="away" />
            </p>
          </div>

          <div className={style.form_time}>
            <h3>Time</h3>
            <input 
            type="datetime-local"
            onBlur={()=> updateEditedEvent(newCard)}
            value={newCard.stats.general.time}
            onChange={e=>{
              newCard.stats.general.time = e.target.value
              updateEditedEvent(newCard)
              }}/>
          </div>

          <div className={style.form_prediction}>
            <h3>Prediction</h3>
            <select
            onChange={e=>{
              newCard.over_zero_point_five.prediction_code = e.target.value;
              const validatedCard = validateScores(newCard);
              updateEditedEvent(validatedCard)
              handlePredictionCode(e)
              // checkResult(newCard);
           }}
            onBlur={()=> {
              const validatedCard = validateScores(newCard);
              updateEditedEvent(validatedCard)
              }
            } 
            name="prediction_code" 
            value={newCard.over_zero_point_five.prediction_code}
            placeholder="prediction"
            >
              <option value="1">Over 0.5</option>
              <option value="0">Under 0.5</option>     
            </select>
          </div>

          <div className={style.form_percentage}>
            <h3>Percentage</h3>
            <input
            onChange={e=>{
              newCard.over_zero_point_five.percentage = +e.target.value
              const validatedCard = validateScores(newCard);
              updateEditedEvent(validatedCard)
            }} 
            onBlur={()=> updateEditedEvent(newCard)}
            type="text" 
            value={newCard.over_zero_point_five.percentage}
            placeholder="percentage" />
          </div>

          <div className={style.form_odds}>
            <h3>Odds</h3>
            <div className={style.odds}>
              <div className={style.odd}>
                <h4>Over 0.5</h4>
                <input 
                onChange={e=> {
                  newCard.over_zero_point_five.odds.over = +e.target.value
                  const validatedCard = validateScores(newCard);
                  updateEditedEvent(validatedCard)
                }}
                onBlur={()=> updateEditedEvent(newCard)}
                type="number" 
                step="2"
                value={newCard.over_zero_point_five.odds.over}
                placeholder="over 0.5" />
              </div>
              
              <div className={style.odd}>
                <h4>Under 0.5</h4>
                <input 
                onChange={e=> {
                  newCard.over_zero_point_five.odds.under = +e.target.value
                  const validatedCard = validateScores(newCard);
                  updateEditedEvent(validatedCard)
                }}
                onBlur={()=> updateEditedEvent(newCard)}
                type="number"
                step="2" 
                value={newCard.over_zero_point_five.odds.under}
                placeholder="under 0.5" />
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
                updateEditedEvent(validatedCard);
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
                updateEditedEvent(validatedCard);
              }}
              />
            </p>
          </div>
          {statsIsActive && 
          <Stats 
            data = {newCard}
            id={newCard.id} 
            handleStatsToggle = {handleStatsToggle}
          />}
        </form>
     
  )
}

export default OverZeroPointFive
