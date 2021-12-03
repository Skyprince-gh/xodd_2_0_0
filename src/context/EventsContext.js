import React, { createContext, useState, useEffect } from 'react';
import { MatchEventObject } from '../utils/dataObjects';
import { validateScores } from '../utils/validation';
import { queryData, setDocument, getData, addDocument } from '../Firebase/firebase';
import { Convert, ConvertToArray } from '../utils/firebaseConverter';
import { batchConverter } from '../utils/batchConverter';
import sortObjectsArray from 'sort-objects-array';
// import {get}

export const EventsContext = createContext();


const EventsDataProvider = (props) => {


  const [events, setEvents] = useState([]) //All the data that has been recorded since the beginning. This will be modified later when firebase is connected
  const [currentTable, setCurrentTable] = useState(JSON.parse(localStorage.getItem('xoddCurrentTable'))); //The current saved table of data stored in local storage
  const [newTable, setNewTable] = useState(JSON.parse(localStorage.getItem('xoddNewTable'))); //New Table created when the add event button is clicked
  const [editInfo, setEditInfo] = useState({})
  const [eventsWindowIsActive, seteventsWindowIsActive] = useState(false); //activated when the add event button is clicked. This changes the mode of the app from read to write.
  const [removeIsActive, setRemoveIsActive] = useState(false);
  const [editIsActive, setEditActive] = useState(false);
  const [editCardWindowIsActive, setEditCardWindowIsActive] = useState(false);
  const [currentCategory, setCurrentCategory] = useState('win-draw-win');
  const [searchTarget, setSearchTarget] = useState(new Date().toDateString());
  const [searchEditTarget, setSearchEditTarget] = useState(new Date().toDateString());
  const [sortObject, setSortObject] = useState({ order: 'ascending', sort: 'percentage' })

  useEffect(() => {
    getCurrentTable()
  }, [])

  const toggleEditCardWindow = (id) => {
    //console.log("edit id: ", id)
    if (editIsActive) {
      setEditCardWindowIsActive(!editCardWindowIsActive);
    }
    //console.log(currentTable.table)
    currentTable.table.forEach(card => {
      if (card.id === id) {
        setEditInfo(card)
        //console.log('this is the card: ', card)
      }
    })

    return
  }

  const switchCategory = (e) => {
    const current = e.target.value
    //console.log('current category: ', current)
    setCurrentCategory(current)
  }

  const toggleEventsWindow = () => {
    // sets the event window to active or inactive this changes the mode of the app. 
    seteventsWindowIsActive(!eventsWindowIsActive);
  }

  const toggleEditMode = () => {
    setEditActive(!editIsActive);
  }


  const toggleCardRemove = () => {
    setRemoveIsActive(!removeIsActive);
    // alert('toggle card');
  }


  const removeCard = (id) => {
    if (removeIsActive === true) {

      const List = newTable.filter(card => {
        if (card.id === id) {
          return false
        }
        else {
          return true;
        }
      })

      localStorage.setItem('xoddNewTable', JSON.stringify(List))
      setNewTable(List);
    }
    else {
      return
    }
  }

  const getCurrentTable = () => {
    const table = JSON.parse(localStorage.getItem('xoddCurrentTable'))
    if (table === null || table === '') {
      setCurrentTable([])
    }
    else if (table.length > 0) {
      setCurrentTable(table)
    }

    return table //get the entire current table and set it.
  }

  const addMatchEvent = () => {
    const table = [...newTable];
    table.push(new MatchEventObject());

    setNewTable(table)

    localStorage.setItem('xoddNewTable', JSON.stringify(table))
  }

  const saveNewTable = async () => {
    alert('Table will be saved')
    const anotherTable = [...newTable]
    // console.log('this the data that I want to convert: ',newTable)
    //Covert the data first beforn e passing to firebase

    const convertedTable = Convert(anotherTable)

    console.log('converted Table: ', convertedTable)
    // Save the table that you have created. You can also create a feature to edit the table as well.\
    // const response = await addDocument('match_event_tables', convertedTable);
    //store the table in firebase with a custom ID.
    const response = await setDocument('match_event_tables', searchTarget, convertedTable)

    localStorage.setItem('xoddCurrentTable', JSON.stringify({ id: response, table: newTable }));
    localStorage.setItem('xoddPackagePorter', JSON.stringify({ id: response, table: newTable }));
    localStorage.setItem('xoddNewTable', JSON.stringify([]));//reset storage location      
    setNewTable([]);
    window.location.reload();

  }

  const loadNewTable = (table) => {
    setNewTable(table);
    localStorage.setItem('xoddNewTable', JSON.stringify(table))
  }

  //this function is triggered anytime the date in the seach parameters is changed
  const changeSearchTarget = (date) => {
    setSearchTarget(date);
  }

  const changeSearchEditTarget = (date) => {
    setSearchEditTarget(date);
  }

  //this function is triggered when the search button is pressed.
  const search = async () => {
    const batchArray = [];
    const snapshot = await queryData('batch_data', 'fileName', '==', searchTarget);
    console.log('snapshot:', snapshot);
    snapshot.docs.map(doc => {
      batchArray.push(doc.data())
    })

    const loadedTable = await batchConverter(batchArray) //get the data batches and then add them to local storage no data is returned 
    loadNewTable(loadedTable);
  }

  const searchEdit = async () => {
    console.log('search edit target activated.')
    // const batchArray = [];
    const response = await getData('match_event_tables', searchEditTarget);

    const converted = ConvertToArray(response.data())
    if (response.data() !== null) {
      console.log("Document data:", converted);
      localStorage.setItem('xoddCurrentTable', JSON.stringify({ id: searchEditTarget, table: converted }));
      window.location.reload(false);
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
    // const loadedTable = await batchConverter(batchArray) //get the data batches and then add them to local storage no data is returned 
    // loadNewTable(loadedTable);
  }

  //this one orders files in ascending or descending order.
  const orderFiles = (order) => {
    if (order === 'ascending') {
      //arrange everything in ascending order
      setSortObject({
        ...sortObject,
        order: 'ascending'
      })
    }
    else if (order === 'descending') {
      //arrange everything in descending order
      setSortObject({
        ...sortObject,
        order: 'descending'
      })
    }

    sortFiles(sortObject)
  }

  //this function sorts files based on a property type
  const sortFiles = (sortProperty) => {
    if (sortObject.order === 'ascending') {
      // //run sorts without any order parameter.
      // let currentTable = JSON.parse(localStorage.getItem('xoddCurrentTable'))
      // const sortedTablesortObject = sortObjectsArray(currentTable.table, 'percentage');
      
      // currentTable.table = sortedTablesortObject;
      // localStorage.setItem('xoddCurrentTable', JSON.stringify(currentTable))
      
      const countries = [
        { name: {firstName: 'Ahenkan', lastName:'Asante'}, age: 25, height: 5.10 },
        { name: {firstName: 'Maxwell', lastName:'Biden'}, age: 20, height: 5.6 },
        { name: {firstName: 'Yaa', lastName:'Jackson'}, age: 20, height: 5.4 },
        { name: {firstName: 'Pomaa', lastName:'Kodua'}, age: 23, height: 5.5 },
      ]
      
      const sortedTablesortObject = sortObjectsArray(countries, ['name','firstName']);
      console.log('just sorted test:', sortedTablesortObject)

    }
    else if (sortObject.order === 'descending') {
      //run sorts with the descending order parameter.
    }

    // window.location.reload(false)
  }



  //Update the Card in the new Table
  const updateEvent = (data) => {
    //console.log('checking timestamps: ', data)
    let homeTimestamps = [...data.stats.home.goal_timeStamps]
    let awayTimestamps = [...data.stats.away.goal_timeStamps]

    data.stats.home.goal_timeStamps = homeTimestamps;
    data.stats.away.goal_timeStamps = awayTimestamps;

    console.log('current update ', data)
    const eventInFocus = newTable.map(event => {
      if (event.id === data.id) {
        return event = data
      }
      return event
    })
    console.log('event in focus: ', data.id, eventInFocus);

    setNewTable(eventInFocus)
    localStorage.setItem('xoddNewTable', JSON.stringify(eventInFocus))
  }

  //Update Edit Cards in the Current Table 
  const updateEditedEvent = (data) => {
    //console.log('checking time stamps : ', data)
    let homeTimestamps = [...data.stats.home.goal_timeStamps]
    let awayTimestamps = [...data.stats.away.goal_timeStamps]

    data.stats.home.goal_timeStamps = homeTimestamps;
    data.stats.away.goal_timeStamps = awayTimestamps;


    const eventInFocus = currentTable.table.map(event => {
      if (event.id === data.id) {
        return event = data
      }
      return event
    })
    //console.log('event in focus: ', data.id, eventInFocus);

    setCurrentTable({ id: currentTable.id, table: eventInFocus })
    localStorage.setItem('xoddCurrentTable', JSON.stringify({ id: currentTable.id, table: eventInFocus }))
  }

  const addEventsTable = (data) => {
    /* add another events table to the events data */
    setEvents(
      [...events,
      { ...data }]
    )
  }

  const saveEventStats = (e, goalEvents, newCard) => {
    // const id = newCard.id


    e.preventDefault();
    e.stopPropagation();
    newCard.stats.goalEvents = goalEvents;

    //console.log('incoming goal events): ', goalEvents);
    //console.log('check if this is a set', typeof newCard.stats.home.goal_timeStamps, newCard.stats.home.goal_timeStamps)

    goalEvents.forEach(goalEvent => {
      //extract the timestamps from each goal event object and alocate them
      if (goalEvent.team === 'home') {
        const d = { ...newCard } //spreading the newcard state into a new object

        d.stats.home.goal_timeStamps.add(goalEvent.timeStamp);
        newCard = { ...d }
      }
      else if (goalEvent.team === 'away') {
        const d = { ...newCard }

        d.stats.away.goal_timeStamps.add(goalEvent.timeStamp);
        newCard = { ...d }
      }
    })

    //sort the timestamps in order
    const homeTimeStamps = [...newCard.stats.home.goal_timeStamps].sort((a, b) => a - b);
    const awayTimeStamps = [...newCard.stats.away.goal_timeStamps].sort((a, b) => a - b);

    //console.log('after sorting: ', newCard)

    newCard.stats.home.goal_timeStamps = homeTimeStamps;
    newCard.stats.away.goal_timeStamps = awayTimeStamps;

    const d = { ...newCard }
    //check if there are home timestamps
    if (homeTimeStamps.length > 0) {
      d.stats.home.score = homeTimeStamps.length;
      newCard = { ...d }
    }
    else {
      d.stats.home.score = 0;
    }

    //check if there are away timestamps
    if (awayTimeStamps.length > 0) {
      d.stats.away.score = awayTimeStamps.length;
      newCard = { ...d }
    }
    else {
      d.stats.away.score = 0;
      //console.log('d: ', d)
    }

    const validatedCard = validateScores(newCard, 'both_teams_to_score');
    updateEvent(validatedCard)

    if (editCardWindowIsActive) {
      updateEditedEvent(validatedCard)
    }
  }




  const variables = {
    events: { ...events },
    currentTable,
    eventsWindowIsActive,
    newTable,
    removeIsActive,
    editIsActive,
    editCardWindowIsActive,
    editInfo,
    currentCategory
  }
  const functions = {
    // getUnsavedTable
    getCurrentTable,
    addEventsTable,
    toggleEventsWindow,
    addMatchEvent,
    updateEvent,
    saveNewTable,
    toggleCardRemove,
    removeCard,
    toggleEditMode,
    toggleEditCardWindow,
    updateEditedEvent,
    switchCategory,
    saveEventStats,
    changeSearchTarget,
    search,
    loadNewTable,
    changeSearchEditTarget,
    searchEdit,
    sortFiles,
    orderFiles
  }

  return (
    <EventsContext.Provider value={{ ...variables, ...functions }}>
      {props.children}
    </EventsContext.Provider>
  )
}

export default EventsDataProvider


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