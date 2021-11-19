import WinDrawWin from '../cards/Create/WinDrawWin'
import BothTeamsToScoreCard from '../cards/Create/BothTeamsToScore'
import DoubleChance from '../cards/Create/DoubleChance'
import DrawNoBet from '../cards/Create/DrawNoBet'
import BothTeamsToScoreAndWin from '../cards/Create/BothTeamsToScoreAndWin'
import OverZeroPointFive from '../cards/Create/OverZeroPointFive'
import OverOnePointFive from '../cards/Create/OverOnePointFive'
import OverTwoPointFive from '../cards/Create/OverTwoPointFive'
import OverThreePointFive from '../cards/Create/OverThreePointFive'
import OverFourPointFive from '../cards/Create/OverFourPointFive'
import OverFivePointFive from '../cards/Create/OverFivePointFive'
import TeamToScoreFirst from '../cards/Create/TeamToScoreFirst'

import style from './List.module.css'
import {AddCircleOutline} from '@material-ui/icons'
import React, {useContext} from 'react'
import {EventsContext} from '../context/EventsContext'


const EventsTable = () => {
  const {newTable, currentCategory} = useContext(EventsContext);
  
  // const newTable = getUnsavedTable();
  return (
    <ul className={style.table}>
      {
      newTable.length > 0 ?
        newTable.map(match => {
          //compute categroy
          let category = <WinDrawWin data={match}/>
          
        if(currentCategory === 'both-teams-to-score'){
          category = <BothTeamsToScoreCard data={match}/>
        }
        else if(currentCategory === 'both-teams-to-score-and-win'){
          category = <BothTeamsToScoreAndWin data={match}/>
        }
        else if(currentCategory === 'double-chance'){
          category = <DoubleChance data={match}/>
        }
        else if(currentCategory === 'draw-no-bet'){
          category = <DrawNoBet data={match}/>
        }
        else if(currentCategory === 'over-under-0.5'){
          category = <OverZeroPointFive data={match}/>
        }
        else if(currentCategory === 'over-under-1.5'){
          category = <OverOnePointFive data={match}/>
        }
        else if(currentCategory === 'over-under-2.5'){
          category = <OverTwoPointFive data={match}/>
        }
        else if(currentCategory === 'over-under-3.5'){
          category = <OverThreePointFive data={match}/>
        }
        else if(currentCategory === 'over-under-4.5'){
          category = <OverFourPointFive data={match}/>
        }
        else if(currentCategory === 'over-under-5.5'){
          category = <OverFivePointFive data={match}/>
        }
        else if(currentCategory === 'team-to-score-first'){
          category = <TeamToScoreFirst data={match}/>
        }
        else{
          category = <WinDrawWin data={match}/>          
        }

          return <li key={match.id}> {category} </li>
        }) : <p className={style.prompt}>
          Add Items to Edit click 
          <span> <AddCircleOutline/></span>to add a new event
          </p>
      }
    </ul>
  )
}

export default EventsTable