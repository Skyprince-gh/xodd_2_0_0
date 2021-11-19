import React ,{useContext} from 'react'
import style from './AddEventControls.module.css'
import {Add, Save, Delete} from '@material-ui/icons'
import {EventsContext} from '../context/EventsContext'

const AddEventControls = () => {
  const {addMatchEvent, saveNewTable, toggleCardRemove, removeIsActive} = useContext(EventsContext)
  let color = [];
  if(removeIsActive){
    color = [style.red]
  }
  else{
    color = []
  }

  return (
    <div className={style.grid}>
      <button onClick={addMatchEvent}> <Add/> </button>
      <button onClick={saveNewTable}> <Save/> </button>
      <button className= {color} onClick={toggleCardRemove}> <Delete/> </button>
    </div>
  )
}

export default AddEventControls
