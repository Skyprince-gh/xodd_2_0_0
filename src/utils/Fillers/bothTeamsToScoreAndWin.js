import findBestMatch from "../findBestMatch";

//this function simply fills in the entry in the selected object.
const fill = async (convertedBatch, events) => {

  console.log('converted Batch both teams to score and win activated:', convertedBatch, events);

  const extractedBatches = [];
  const mergedBatches = []; //stores the extracted batches array into a singlar array.

  const remainingBatches = convertedBatch.filter(batchObject => {
    if (batchObject.category === 'both-teams-to-score-and-win') {
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


    current.both_teams_to_score_and_win.percentage = +entry.percentage.split('%')[0]; //get the percentage in string format and then convert it to number after spliting the % sign from it
    current.both_teams_to_score_and_win.odds.home = +entry.odds.home;
    current.both_teams_to_score_and_win.odds.draw = +entry.odds.draw;
    current.both_teams_to_score_and_win.odds.away = +entry.odds.away;
    // current.both_teams_to_score_and_win.prediction = entry.prediction.toLowerCase();

    // if (entry.prediction.toLowerCase().includes('btts home')) {
    //   current.both_teams_to_score_and_win.prediction_code = '1';
    // }
    // else if (entry.prediction.toLowerCase().includes('btts away')) {
    //   current.both_teams_to_score_and_win.prediction_code = '2';
    // }
    // else if (entry.prediction.toLowerCase().includes('btts draw')) {
    //   current.both_teams_to_score_and_win.prediction_code = 'X';
    // }

  })

  return { events, sorted: remainingBatches}
}

export default fill;