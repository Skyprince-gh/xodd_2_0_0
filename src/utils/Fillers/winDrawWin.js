import { MatchEventObject } from '../dataObjects';

//this function simply fills in the entry in the selected object.
const fill = async (convertedBatch, events, fileName) => {

  console.log('converted Batch win draw win activated:', convertedBatch)
  const extractedBatches = [];
  const mergedBatches = []; //stores the extracted batches array into a singlar array.
  const remainingBatches = convertedBatch.filter(batchObject => {
    if (batchObject.category === 'win-draw-win') {
      extractedBatches.push(batchObject)
      return false;
    }
    else {
      return true;
    }
  })

  //this section of code gets the extracted batch into a single array so reading can be easier
  extractedBatches.forEach(batch => {
    batch.storageBatch.forEach(b => {
      mergedBatches.push(b)
    })
  })
  
  
  console.log('extracted Batches:', extractedBatches);
  
  console.log('merged Batches:', mergedBatches);
  
  
  //this section of code simply fills in the batch in the selected object.
  mergedBatches.forEach(batch => {
    const event = new MatchEventObject();
    event.stats.general.home = batch.home; //get the home team and store it.
    event.stats.general.away = batch.away; // get the away team and store it
    // event.stats.general.time = "2021-03-04T17:00"; //create a time stamp using the date constructor
    // console.log('batch.time', batch.time)
    event.stats.general.time = fileName + "T" + batch.time; //create a time stamp using the date constructor
    event.win_draw_win.percentage = +batch.percentage.split('%')[0]; //get the percentage in string format and then convert it to number after spliting the % sign from it
    event.win_draw_win.odds.home = +batch.odds.home;
    event.win_draw_win.odds.draw = +batch.odds.draw;
    event.win_draw_win.odds.away = +batch.odds.away;
    event.win_draw_win.prediction = batch.prediction.toLowerCase();
    
    if (batch.prediction.toLowerCase().includes('home win')) {
      event.win_draw_win.prediction_code = '1'
    }
    else if (batch.prediction.toLowerCase().includes('away win')) {
      event.win_draw_win.prediction_code = '2'
    }
    else if (batch.prediction.toLowerCase().includes('draw')) {
      event.win_draw_win.prediction_code = 'X'
    }
    
    events.push(event)
  })
  
  
  return {events, sorted: remainingBatches }
}

export default fill;