import WinDrawWinCard from '../cards/Main/WinDrawWinCard';
import BothTeamsToScoreCard from '../cards/Main/BothTeamsToScore';
import BothTeamsToScoreAndWin from '../cards/Main/BothTeamsToScoreAndWin';
import DoubleChance from '../cards/Main/DoubleChance';
import DrawNoBet from '../cards/Main/DrawNoBet';
import OverZeroPointFive from '../cards/Main/OverZeroPointFive';
import OverOnePointFive from '../cards/Main/OverOnePointFive';
import OverTwoPointFive from '../cards/Main/OverTwoPointFive';
import OverThreePointFive from '../cards/Main/OverThreePointFive';
import OverFourPointFive from '../cards/Main/OverFourPointFive';
import OverFivePointFive from '../cards/Main/OverFivePointFive';
import TeamToScoreFirst from '../cards/Main/TeamToScoreFirst';

import style from './List.module.css';
import React, {useContext} from 'react'
import {EventsContext} from '../context/EventsContext'
// import
const List = () => {
  // const currentTable = JSON.parse(localStorage.getItem('xoddCurrentTable'))
  const {currentCategory, currentTable} = useContext(EventsContext)
  return ( 
    
    <ul>
      {currentTable.table.length > 0 ?currentTable.table.map((item)=>{
        let category = <WinDrawWinCard data={item}/>

        if(currentCategory === 'both-teams-to-score'){
          category = <BothTeamsToScoreCard data={item}/>
        }
        else if(currentCategory === 'both-teams-to-score-and-win'){
          category = <BothTeamsToScoreAndWin data={item}/>
        }
        else if(currentCategory === 'double-chance'){
          category = <DoubleChance data={item}/>
        }
        else if(currentCategory === 'draw-no-bet'){
          category = <DrawNoBet data={item}/>
        }
        else if(currentCategory === 'over-under-0.5'){
          category = <OverZeroPointFive data={item}/>
        }
        else if(currentCategory === 'over-under-1.5'){
          category = <OverOnePointFive data={item}/>
        }
        else if(currentCategory === 'over-under-2.5'){
          category = <OverTwoPointFive data={item}/>
        }
        else if(currentCategory === 'over-under-3.5'){
          category = <OverThreePointFive data={item}/>
        }
        else if(currentCategory === 'over-under-4.5'){
          category = <OverFourPointFive data={item}/>
        }
        else if(currentCategory === 'over-under-5.5'){
          category = <OverFivePointFive data={item}/>
        }
        else if(currentCategory === 'team-to-score-first'){
          category = <TeamToScoreFirst data={item}/>
        }
        else {
          category = <WinDrawWinCard data={item}/>
        }
        
        return <li key={item.id} className={style.li}>
          {category} 
        </li>
      }): <p className={style.prompt}>There are no Items available</p>}
    </ul>
   );
}
 
export default List;

// {
//   id: '49ugf09',
//   home: 'Manchester',
//   away: 'Liverpool',
//   time: '2:00pm',
//   prediction: 'home win',
//   prediction_code: 1, //prediction code 1 for home 2 for away and x for draw
//   percentage: 76,
//   result: 2, //result must match prediction code
//   isWon: true,
//   matchStats: null,
//   odds: {
//     home: 2.1,
//     draw: 3.2,
//     away: 2.3
//   },
//   stats: {
//     home: {
//       score: 1,
//       goal_timeStamp: [12, 56]
//     },
//     away: {
//       score: 2, 
//       goal_timeStamp: [29, 45, 65]        
//     }
//   }
// }