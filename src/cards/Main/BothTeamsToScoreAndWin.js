import style from '../Card.module.css'
import { EventsContext } from '../../context/EventsContext'
import React, { useContext} from 'react'
import Create from '../Create/BothTeamsToScoreAndWin'
import {format} from 'date-fns'

function BothTeamsToScoreAndWin({ data }) {
  // ////console.log('original data:', data);
  let newCard = {...data}
  let prediction = ''
  

  //convert time stamps to sets
  newCard.stats.home.goal_timeStamps = new Set();
  newCard.stats.away.goal_timeStamps = new Set();
  
  const { 
    eventsWindowIsActive, 
    editIsActive,
    toggleEditCardWindow
  } = useContext(EventsContext);
  
   
  let oddsWindowStyle = [style.grid];

  if(editIsActive === true){
    oddsWindowStyle = [style.grid, style.gridEdit].join(' ');
  }
  else if(editIsActive === false){
    oddsWindowStyle = [style.grid]
  }


  const formatPrediction = () => {
    const pred = data.both_teams_to_score_and_win.prediction.split(" ")
    //console.log("this is the prediction: ",prediction)
    prediction = `${pred[0]} ${data.both_teams_to_score.prediction} ${pred[1]}`
  }

  // formatPrediction();

  return (
    <div onLoad = {formatPrediction()}>
      { !eventsWindowIsActive &&
        <div className={oddsWindowStyle} id={newCard.id} onClick={(e) => toggleEditCardWindow(newCard.id)}>
          <div className={style.grp}>
            <h3>Teams</h3>
            <p>{data.stats.general.home} v {data.stats.general.away}</p>
          </div>
            
          <div className={style.grp}>
            <h3>Time</h3>
            <p>
              {format(new Date(newCard.stats.general.time), "dd/MM/yyyy HH:mm ")} 
            </p>
          </div>
          <div className={style.grp}>
            <h3>Prediction</h3>
            <p>{prediction}</p>
            {/* <p>{data.both_teams_to_score_and_win.prediction}</p> */}
          </div>

          <div className={style.grp}>
            <h3>Percentage</h3>
            <p>{data.both_teams_to_score_and_win.percentage}%</p>
          </div>

          <div className={style.grp + " " + style.odds_grp}>
            <h3>Odds</h3>
            <div className={style.odds}>
              <div className={style.odd}>
                <h4>Btts Home</h4>
                <p>{data.both_teams_to_score_and_win.odds.home}</p>
              </div>
              <div className={style.odd}>
                <h4> Btts Draw</h4>
                <p>{data.both_teams_to_score_and_win.odds.draw}</p>
              </div>
              <div className={style.odd}>
                <h4> Btts Away</h4>
                <p>{data.both_teams_to_score_and_win.odds.away}</p>
              </div>
            </div>
          </div>

          <div className={style.grp_scores}>
            <div className={style.scores}>
              <h3>Scores</h3>
              <p>{data.stats.home.score} : {data.stats.away.score}</p>
            </div>

            {data.both_teams_to_score_and_win.isWon && <div className={style.validation_green}></div>}

            {!data.both_teams_to_score_and_win.isWon && <div className={style.validation_red}></div>}
          </div>
        </div>
      }

        { eventsWindowIsActive && 
          <Create data = {newCard}/>
        }
    </div>
  ) 
}

export default BothTeamsToScoreAndWin
