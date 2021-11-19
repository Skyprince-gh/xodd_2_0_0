import findBestMatch from "../findBestMatch";

//this function simply fills in the entry in the selected object.
const fill = async (convertedBatch, events) => {
  convertedBatch.forEach(entry => { // loop throgh the entire batch

    const bestMatchIndex = findBestMatch(entry, events);
    const current = events[bestMatchIndex];

    
    current.draw_no_bet.percentage = +entry.percentage.split('%')[0]; //get the percentage in string format and then convert it to number after spliting the % sign from it
    current.draw_no_bet.odds.home = +entry.odds.home;
    current.draw_no_bet.odds.away = +entry.odds.away;
    current.draw_no_bet.prediction = entry.prediction.toLowerCase();

    if (entry.prediction.toLowerCase().includes('home')) {
      current.draw_no_bet.prediction_code = '1';
    }
    else if (entry.prediction.toLowerCase().includes('away')) {
      current.draw_no_bet.prediction_code = '2';
    }

  })

  return events
}

export default fill;