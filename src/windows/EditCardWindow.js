import WinDrawWin from '../cards/Edit/WinDrawWin'
import BothTeamsToScoreCard from '../cards/Edit/BothTeamsToScore';
import BothTeamsToScoreAndWin from '../cards/Edit/BothTeamsToScoreAndWin'
import DoubleChance from '../cards/Edit/DoubleChance'
import DrawNoBet from '../cards/Edit/DrawNoBet';
import OverZeroPointFive from '../cards/Edit/OverZeroPointFive';
import OverOnePointFive from '../cards/Edit/OverOnePointFive';
import OverTwoPointFive from '../cards/Edit/OverTwoPointFive';
import OverThreePointFive from '../cards/Edit/OverThreePointFive';
import OverFourPointFive from '../cards/Edit/OverFourPointFive';
import OverFivePointFive from '../cards/Edit/OverFivePointFive';
import TeamToScoreFirst from '../cards/Edit/TeamToScoreFirst';

import {Animated} from "react-animated-css";
import React, { useContext} from 'react'
import { EventsContext } from '../context/EventsContext'
import style from './EditCardWindow.module.css'


function EditCardWindow() {
  const { editCardWindowIsActive, editInfo, currentCategory} = useContext(EventsContext);
  //console.log("edited info: ", editInfo )
  const validateToggle = (e) => {
    const list = Array.from(e.target.classList).join(' ')
    if (list.includes(style.grid)){
      toggleEditCardWindow()
    }
  }
  let category = <WinDrawWin data={editInfo}/>
  
  if(currentCategory === 'both-teams-to-score'){
    category = <BothTeamsToScoreCard data={editInfo}/>
  }
  else if(currentCategory === 'both-teams-to-score-and-win'){
    category = <BothTeamsToScoreAndWin data={editInfo}/>
  }
  else if(currentCategory === 'double-chance'){
    category = <DoubleChance data={editInfo}/>
  }
  else if(currentCategory === 'draw-no-bet'){
    category = <DrawNoBet data={editInfo}/>
  }
  else if(currentCategory === 'over-under-0.5'){
    category = <OverZeroPointFive data={editInfo}/>
  }
  else if(currentCategory === 'over-under-1.5'){
    category = <OverOnePointFive data={editInfo}/>
  }
  else if(currentCategory === 'over-under-2.5'){
    category = <OverTwoPointFive data={editInfo}/>
  }
  else if(currentCategory === 'over-under-3.5'){
    category = <OverThreePointFive data={editInfo}/>
  }
  else if(currentCategory === 'over-under-4.5'){
    category = <OverFourPointFive data={editInfo}/>
  }
  else if(currentCategory === 'over-under-5.5'){
    category = <OverFivePointFive data={editInfo}/>
  }
  else if(currentCategory === 'team-to-score-first'){
    category = <TeamToScoreFirst data={editInfo}/>
  }
  else{
    category = <WinDrawWin data={editInfo}/>
  }
  
  const {toggleEditCardWindow} = useContext(EventsContext)

  return (
    <div className={style.grid} onClick={e => validateToggle(e)}>
      <Animated  
        animationIn="fadeInDown" 
        animationOut="fadeInDown" 
        isVisible={true}
      >
        { editCardWindowIsActive && 
          category 
        }
      </Animated>
    </div>
  )
  
  
}

export default EditCardWindow