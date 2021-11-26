import findBestMatch from "../findBestMatch";

//this function simply fills in the entry in the selected object.
const fill = (convertedBatch, events) => {

  console.log('converted Batch team to score first activated:', convertedBatch, events);

  const extractedBatches = [];
  const mergedBatches = []; //stores the extracted batches array into a singlar array.

  const remainingBatches = convertedBatch.filter(batchObject => {
    if (batchObject.category === 'team-to-score-first') {
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

    
    current.team_to_score_first.percentage = +entry.percentage.split('%')[0]; //get the percentage in string format and then convert it to number after spliting the % sign from it
    current.team_to_score_first.odds.home = +entry.odds.home;
    current.team_to_score_first.odds.away = +entry.odds.away;
    current.team_to_score_first.odds.none = +entry.odds.none;
    current.team_to_score_first.prediction = entry.prediction.toLowerCase();

    if (entry.prediction.toLowerCase().includes('home first')) {
      current.team_to_score_first.prediction_code = '1';
    }
    else if (entry.prediction.toLowerCase().includes('away first')) {
      current.team_to_score_first.prediction_code = '2';
    }
    else if (entry.prediction.toLowerCase().includes('none')) {
      current.team_to_score_first.prediction_code = '0';
    }

  })

  return {events , sorted: remainingBatches}
}

export default fill;