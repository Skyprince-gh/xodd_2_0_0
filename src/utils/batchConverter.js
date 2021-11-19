import { MatchEventObject } from './dataObjects';
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
import sortObjectsArray from 'sort-objects-array'
// import { compareTwoStrings } from './findBestMatch';

let events = []; //remember to write a function that simply clears all in the events array.
// let fileName = '';
//this converts a batch and then adds it to the new table array.
export const batchConverter = async (data) => {
  events = [] //reset the events array
  const convertedBatch = data.map(entry => {
    return {
      fileName: entry.fileName,
      category: entry.category,
      storageBatch: convertIntoArray(entry.storageBatch)
    }
  })

  console.log('convertedBatch sorted:', sortObjectsArray(convertedBatch, 'category'))

  // const category = data.category;
  // fileName = data.fileName
  // console.log('new batch:', convertedBatch);

  // ProcessData(category, convertedBatch);

  events = await winDrawWinFiller(convertedBatch, events);
  console.log('current state of Events array:', events);

  // events = await bothTeamsToScoreFiller(convertedBatch, events);  

  // events = await bothTeamsToScoreAndWinFiller(convertedBatch, events);  

  // events = doubleChanceFiller(convertedBatch, events);

  // events = await drawNoBetFiller(convertedBatch, events);

  // events = await overZeroPointFiveFiller(convertedBatch, events);

  // events = await overOnePointFiveFiller(convertedBatch, events);

  // events = await overTwoPointFiveFiller(convertedBatch, events);

  // events = await overThreePointFiveFiller(convertedBatch, events);

  // events = await overFourPointFiveFiller(convertedBatch, events);

  // events = await overFivePointFiveFiller(convertedBatch, events);

  // events = await teamToScoreFirstFiller(convertedBatch, events);
  // storeNewTable();
}



//this function store the events array inside of local storage inside the xoddNewTable after all the data has been read.
const storeNewTable = () => {
  console.log('new Table:', events)
}
//this converts the batch object into an array that can be used by the program.
const convertIntoArray = (batch) => {
  const newBatch = Object.keys(batch).map(key => {
    return batch[key];
  })

  return newBatch;

}

