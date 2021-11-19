import React from 'react'
import style from './OddsWindow.module.css'
import Menu from '../menus/WindowMenu'
import Table from '../Lists/EventsTable'
import Controls from '../controls/AddEventControls'

function AddTableWindow() {
  return (
    <div className={style.grid}>
      <Menu/>
      <div className={style.main}>
        <Table/>
      </div>
      <Controls/>
    </div>
  )
}

export default AddTableWindow