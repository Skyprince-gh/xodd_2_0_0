import React from 'react'
import style from './OddsWindowMenu.module.css'
import { useContext } from 'react'
import { EventsContext } from '../context/EventsContext'
import { Search } from '@material-ui/icons'

const OddsWindowMenu = () => {
  const { toggleEventsWindow, eventsWindowIsActive, switchCategory, currentCategory, changeSearchTarget, search } = useContext(EventsContext)
  return (
    <div className={style.menu}>
      <form>
        <div className={style.menu_group}>
          <label htmlFor="category">Category: </label>
          <select
            name="category"
            onChange={switchCategory}
            value={currentCategory}
          >
            <option value="win-draw-win">1X2</option>
            <option value="both-teams-to-score">Both Teams To Score</option>
            <option value="both-teams-to-score-and-win">Both Teams To Score and Win</option>
            <option value="double-chance">Double-Chance</option>
            <option value="draw-no-bet">Draw-No-Bet</option>
            <option value="over-under-0.5">Over-Under-0.5</option>
            <option value="over-under-1.5">Over-Under-1.5</option>
            <option value="over-under-2.5">Over-Under-2.5</option>
            <option value="over-under-3.5">Over-Under-3.5</option>
            <option value="over-under-4.5">Over-Under-4.5</option>
            <option value="over-under-5.5">Over-Under-5.5</option>
            <option value="team-to-score-first">Team-To-Score-First</option>
          </select>
        </div>

        {
          !eventsWindowIsActive &&
          <div className={style.menu_group}>
            <label htmlFor="sort">Sort by: </label>
            <select name="sort">
              <option value="ascending">ascending</option>
              <option value="ascending">descending</option>
            </select>
          </div>
        }

        {
          !eventsWindowIsActive &&

          <div className={style.menu_group}>
            <label htmlFor="order">Order by: </label>
            <select name="order">
              <option value="name">Name</option>
              <option value="percentage">Percentage</option>
              <option value="time">Time</option>
              <option value="prediction">prediction</option>
            </select>
          </div>
        }

        <div className={style.menu_group}>
          <label htmlFor="date">Date</label>
          <div>

            <input
              onChange={e => { changeSearchTarget(e.target.value) }}
              onBlur={search}
              type="date" />
          </div>
        </div>

      </form>

      <div className={style.close}>
        {eventsWindowIsActive && <button onClick={toggleEventsWindow}>X</button>}
      </div>

    </div>
  )
}

export default OddsWindowMenu
