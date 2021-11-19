import findBestMatch from "../findBestMatch";

//this function simply fills in the entry in the selected object.
const fill = async (convertedBatch, events) => {
  convertedBatch.forEach(entry => { // loop throgh the entire batch

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

  return events
}

export default fill;