import findBestMatch from "../findBestMatch";

//this function simply fills in the entry in the selected object.
const fill = async (convertedBatch, events) => {
  convertedBatch.forEach(entry => { // loop throgh the entire batch

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

  return events
}

export default fill;