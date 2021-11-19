import style from './OddsWindow.module.css'
import Menu from '../menus/WindowMenu'
import List from '../Lists/List'
import React, {useContext} from 'react'
import Controls from '../controls/OddsWindowControls'
import {EventsContext} from '../context/EventsContext'
import EditCardWindow from '../windows/EditCardWindow'

const  OddsWindow = () => {
  
    const {editCardWindowIsActive} = useContext(EventsContext);

    return ( 
      <React.Fragment>
        <div className={style.grid}>
          <Menu/>
          <div className={style.main}>
            <List/>
          </div>
          <Controls/>
        </div>
          {editCardWindowIsActive && <EditCardWindow/>}
      </React.Fragment>
   );
  

}
  
  
  export default OddsWindow;