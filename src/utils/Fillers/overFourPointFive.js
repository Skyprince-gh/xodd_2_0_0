import findBestMatch from "../findBestMatch";

//this function simply fills in the entry in the selected object.
const fill = async (convertedBatch, events) => {

  console.log('converted Batch over four point five activated:', convertedBatch, events);

  const extractedBatches = [];
  const mergedBatches = []; //stores the extracted batches array into a singlar array.

  const remainingBatches = convertedBatch.filter(batchObject => {
    if (batchObject.category === 'over-under-4.5') {
      extractedBatches.push(batchObject)
      return false;
    }
    else return true;
  })

  //this section of code gets the extracted batch into a single array so reading can be easier
  extractedBatches.forEach(batch => {
    batch.storageBatch.forEach(b => {
      mergedBatches.push(b);
    })
  })

  console.log('remaining batches:', remainingBatches);

  console.log('extracted Batches:', extractedBatches);

  console.log('merged Batches:', mergedBatches);

  mergedBatches.forEach(entry => { // loop throgh the entire batch

    const bestMatchIndex = findBestMatch(entry, events);
    const current = events[bestMatchIndex];
    
    current.over_four_point_five.percentage = +entry.percentage.split('%')[0]; //get the percentage in string format and then convert it to number after spliting the % sign from it
    current.over_four_point_five.odds.over = +entry.odds.over;
    current.over_four_point_five.odds.under = +entry.odds.under;
    current.over_four_point_five.prediction = entry.prediction.toLowerCase();

    if (entry.prediction.toLowerCase().includes('over 4.5')) {
      current.over_four_point_five.prediction_code = '1';
    }
    else if (entry.prediction.toLowerCase().includes('under 4.5')) {
      current.over_four_point_five.prediction_code = '0';
    }

  })

  return {events , sorted: remainingBatches}
}

export default fill;