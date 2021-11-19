import style from '../Card.module.css'
import { EventsContext } from '../../context/EventsContext'
import React, { useContext} from 'react'
import Create from '../Create/TeamToScoreFirst'
import {format} from 'date-fns'

function TeamToScoreFirst({ data }) {
  // ////console.log('original data:', data);
  let newCard = {...data}

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


  return (
    <div>
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
            <p>{data.team_to_score_first.prediction}</p>
          </div>

          <div className={style.grp}>
            <h3>Percentage</h3>
            <p>{data.team_to_score_first.percentage}%</p>
          </div>

          <div className={style.grp + " " + style.odds_grp}>
            <h3>Odds</h3>
            <div className={style.odds}>
              <div className={style.odd}>
                <h4>Home</h4>
                <p>{data.team_to_score_first.odds.home}</p>
              </div>
              <div className={style.odd}>
                <h4>Away</h4>
                <p>{data.team_to_score_first.odds.away}</p>
              </div>
              <div className={style.odd}>
                <h4>None</h4>
                <p>{data.team_to_score_first.odds.none}</p>
              </div>
            </div>
          </div>

          <div className={style.grp_scores}>
            <div className={style.scores}>
              <h3>Scores</h3>
              <p>{data.stats.home.score} : {data.stats.away.score}</p>
            </div>

            {data.team_to_score_first.isWon && <div className={style.validation_green}></div>}

            {!data.team_to_score_first.isWon && <div className={style.validation_red}></div>}
          </div>
        </div>
      }

        { eventsWindowIsActive && 
          <Create data = {newCard} />
        }
    </div>
  ) 
}

export default TeamToScoreFirst
