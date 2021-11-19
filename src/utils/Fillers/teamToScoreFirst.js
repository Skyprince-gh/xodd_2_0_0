import findBestMatch from "../findBestMatch";

//this function simply fills in the entry in the selected object.
const fill = (convertedBatch, events, fileName) => {
  convertedBatch.forEach(entry => { // loop throgh the entire batch

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

  return events
}

export default fill;