import findBestMatch from "../findBestMatch";

//this function simply fills in the entry in the selected object.
const fill = async (convertedBatch, events) => {

  console.log('converted Batch both teams to score activated:', convertedBatch, events);

  const extractedBatches = [];
  const mergedBatches = []; //stores the extracted batches array into a singlar array.

  const remainingBatches = convertedBatch.filter(batchObject => {
    if (batchObject.category === 'both-teams-to-score') {
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


    current.both_teams_to_score.percentage = +entry.percentage.split('%')[0]; //get the percentage in string format and then convert it to number after spliting the % sign from it
    current.both_teams_to_score.odds.yes = +entry.odds.yes;
    current.both_teams_to_score.odds.no = +entry.odds.no;
    current.both_teams_to_score.prediction = entry.prediction.toLowerCase();

    if (entry.prediction.toLowerCase().includes('yes')) {
      current.both_teams_to_score.prediction_code = '1';
    }
    else if (entry.prediction.toLowerCase().includes('no')) {
      current.both_teams_to_score.prediction_code = '2';
    }

  })

  return { events, sorted: remainingBatches }
}

export default fill;