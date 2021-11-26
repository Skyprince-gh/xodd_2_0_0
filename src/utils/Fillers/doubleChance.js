import findBestMatch from "../findBestMatch";

//this function simply fills in the entry in the selected object.
const fill = async (convertedBatch, events) => {

  console.log('converted Batch double chance activated:', convertedBatch, events);

  const extractedBatches = [];
  const mergedBatches = []; //stores the extracted batches array into a singlar array.

  const remainingBatches = convertedBatch.filter(batchObject => {
    if (batchObject.category === 'double-chance') {
      extractedBatches.push(batchObject)
      return false;
    }
    else return true;
  })

  //this section of code gets the extracted batch into a single array so reading can be easier
  extractedBatches.forEach(batch => {
    batch.storageBatch.forEach(b => {
      mergedBatches.push(b)
    })
  })

  console.log('remaining batches:', remainingBatches);

  console.log('extracted Batches:', extractedBatches);

  console.log('merged Batches:', mergedBatches);


  mergedBatches.forEach(entry => { // loop throgh the entire batch

    const bestMatchIndex = findBestMatch(entry, events);
    const current = events[bestMatchIndex];

    
    current.double_chance.percentage = +entry.percentage.split('%')[0]; //get the percentage in string format and then convert it to number after spliting the % sign from it
    current.double_chance.odds.home_or_draw = +entry.odds.home_or_draw;
    current.double_chance.odds.away_or_draw = +entry.odds.away_or_draw;
    current.double_chance.odds.home_or_away = +entry.odds.home_or_away;
    current.double_chance.prediction = entry.prediction.toLowerCase();

    if (entry.prediction.toLowerCase().includes('12')) {
      current.double_chance.prediction_code = '12';
      current.double_chance.prediction = 'home or away';
    }
    else if (entry.prediction.toLowerCase().includes('1X')) {
      current.double_chance.prediction_code = '1X';
      current.double_chance.prediction = 'home or draw';
    }
    else if (entry.prediction.toLowerCase().includes('X2')) {
      current.double_chance.prediction_code = 'X2';
      current.double_chance.prediction = 'away or draw';
    }

  })

  return {events , sorted: remainingBatches}
}

export default fill;