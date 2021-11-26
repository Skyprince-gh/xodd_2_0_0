import winDrawWinFiller from './Fillers/winDrawWin';
import bothTeamsToScoreFiller from './Fillers/bothTeamsToScore';
import bothTeamsToScoreAndWinFiller from './Fillers/bothTeamsToScoreAndWin';
import doubleChanceFiller from './Fillers/doubleChance';
import drawNoBetFiller from './Fillers/drawNoBet'
import overZeroPointFiveFiller from './Fillers/overZeroPointFive';
import overOnePointFiveFiller from './Fillers/overOnePointFive';
import overTwoPointFiveFiller from './Fillers/overTwoPointFive';
import overThreePointFiveFiller from './Fillers/overThreePointFive';
import overFourPointFiveFiller from './Fillers/overFourPointFive';
import overFivePointFiveFiller from './Fillers/overFivePointFive';
import teamToScoreFirstFiller from './Fillers/teamToScoreFirst';
import sortObjectsArray from 'sort-objects-array';


// import { compareTwoStrings } from './findBestMatch';

let events = []; //remember to write a function that simply clears all in the events array.
// let fileName = '';
//this converts a batch and then adds it to the new table array.
export const batchConverter = async (data) => {
  events = [] //reset the events array
  let eventDate = ''
  const convertedBatch = data.map(entry => {
    eventDate = entry.fileName
    return {
      fileName: entry.fileName,
      category: entry.category,
      storageBatch: convertIntoArray(entry.storageBatch)
    }
  })

  let sorted = sortObjectsArray(convertedBatch, 'category');

  // const category = data.category;
  // fileName = data.fileName
  // console.log('new batch:', convertedBatch);

  // ProcessData(category, convertedBatch);

  ({ events, sorted } = await winDrawWinFiller(sorted, events,eventDate));
  console.log('current state of Events array after win-draw-win:', events, sorted);

  ({ events, sorted } = await bothTeamsToScoreFiller(sorted, events));
  console.log('current state of Events array after both-teams-to-score:', events, sorted);

  ({ events, sorted } = await bothTeamsToScoreAndWinFiller(sorted, events));
  console.log('current state of Events array after both-teams-to-score:', events, sorted);

  ({ events, sorted } = await doubleChanceFiller(sorted, events));
  console.log('current state of Events array after double-chance:', events, sorted);

  ({ events, sorted } = await drawNoBetFiller(sorted, events));
  console.log('current state of Events array after draw-no-bet:', events, sorted);

  ({ events, sorted } = await overZeroPointFiveFiller(sorted, events));
  console.log('current state of Events array after over-zero-point-five:', events, sorted);

  ({ events, sorted } = await overOnePointFiveFiller(sorted, events));
  console.log('current state of Events array after over-one-point-five:', events, sorted);

  ({ events, sorted } = await overTwoPointFiveFiller(sorted, events));
  console.log('current state of Events array after over-two-point-five:', events, sorted);

  ({ events, sorted } = await overThreePointFiveFiller(sorted, events));
  console.log('current state of Events array after over-three-point-five:', events, sorted);

  ({ events, sorted } = await overFourPointFiveFiller(sorted, events));
  console.log('current state of Events array after over-four-point-five:', events, sorted);

  ({ events, sorted } = await overFivePointFiveFiller(sorted, events));
  console.log('current state of Events array after over-five-point-five:', events, sorted);

  ({ events, sorted } = await teamToScoreFirstFiller(sorted, events));
  console.log('current state of Events array after team-to-score:', events, sorted);

  return events;
}



//this function store the events array inside of local storage inside the xoddNewTable after all the data has been read.
// const storeNewTable = (events, fileName) => {
//   let table = JSON.parse(localStorage.getItem('xoddNewTable'));
//   table = events;

//   localStorage.setItem( 'xoddNewTable',JSON.stringify(table))


// }

//this converts the batch object into an array that can be used by the program.
const convertIntoArray = (batch) => {
  const newBatch = Object.keys(batch).map(key => {
    return batch[key];
  })

  return newBatch;

}

