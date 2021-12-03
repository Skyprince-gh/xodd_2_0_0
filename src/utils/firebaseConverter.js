import { Timestamp } from 'firebase/firestore';

//this function converts a normal array into a firebase object.
export const Convert = (array) => {
  const arr = JSON.parse(JSON.stringify(array))
  console.log(arr)

  const newArr = arr.map(item => {
    const stats = Object.assign({}, item.stats.goalEvents)
    const date = new Date(item.stats.general.time)
    const time = Timestamp.fromDate(date)


    item.stats.goalEvents = stats
    item.stats.general.time = time;
    item.stats.home.goal_timeStamps = ''
    item.stats.away.goal_timeStamps = ''
    return item
  })

  const obj = Object.assign({}, newArr)

  return obj;
}

//Convert the fireabase response objct back to array.
export const ConvertToArray = (object) => {
  console.log('object:', object)
  if (object === undefined || object === null) {
    console.log('passed in null object')
    return
  }
  else {
    const values = Object.values(object)
    const i = values.map(event => {
      event.stats.general.time = new Date(event.stats.general.time.toMillis()).toISOString();
      event.stats.goalEvents = Object.values(event.stats.goalEvents);
      return event
    })

    return i // i is the mapped iteration which contains the converted timestamps.
  }
}


