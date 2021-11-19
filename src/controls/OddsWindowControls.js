import React, {useContext} from 'react'
import style from './AddEventControls.module.css'
import {Edit} from '@material-ui/icons'
import {EventsContext} from '../context/EventsContext'

function OddsWindowControls() {
  const {toggleEditMode} = useContext(EventsContext); 

  return (
    <div className={style.grid}>
      <button onClick= {()=> toggleEditMode()}><Edit/></button>
    </div>
  )
}

export default OddsWindowControls
