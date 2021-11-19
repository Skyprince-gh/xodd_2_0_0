import firebase from 'firebase/app'
import 'firebase/firestore';

 export const Convert = (array) => {
   const arr  = JSON.parse(JSON.stringify(array)) 
   console.log(arr)
   
   const newArr = arr.map(item => {
      const stats = Object.assign({}, item.stats.goalEvents)
      const date = new Date(item.stats.general.time)
      const time =  firebase.firestore.Timestamp.fromDate(date)

      item.stats.goalEvents = stats
      item.stats.general.time = time;
      item.stats.home.goal_timeStamps = ''
      item.stats.away.goal_timeStamps = ''
      return item
   })

   const obj = Object.assign({}, newArr)   

   return obj;
 }


