import style from './Home.module.css'
import {Add} from '@material-ui/icons'
import OddsWindow from '../windows/OddsWindow'
import AddTable from '../windows/AddTableWindow'
import React,{useContext} from 'react'
import {EventsContext} from '../context/EventsContext'

const Home = () => {
  const {eventsWindowIsActive, toggleEventsWindow, editCardWindowIsActive} = useContext(EventsContext)
  
  const results = 24;
  return ( 
    <React.Fragment>
      <div className={style.grid}>
        <p className={style.results}>{results} results shown</p>
        <div className={style.container}>
          {!eventsWindowIsActive && <OddsWindow/>}
          {eventsWindowIsActive && <AddTable/>}
        </div>      
      </div>

      { !editCardWindowIsActive &&
        <div className={style.controls}>
         <button onClick={toggleEventsWindow} disabled={eventsWindowIsActive}><Add/></button>
        </div>
      }
    </React.Fragment>
   );
}


export default Home; 