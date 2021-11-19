import findBestMatch from "../findBestMatch";

//this function simply fills in the entry in the selected object.
const fill = async (convertedBatch, events) => {
  convertedBatch.forEach(entry => { // loop throgh the entire batch

    const bestMatchIndex = findBestMatch(entry, events);
    const current = events[bestMatchIndex];
    
    current.over_two_point_five.percentage = +entry.percentage.split('%')[0]; //get the percentage in string format and then convert it to number after spliting the % sign from it
    current.over_two_point_five.odds.over = +entry.odds.over;
    current.over_two_point_five.odds.under = +entry.odds.under;
    current.over_two_point_five.prediction = entry.prediction.toLowerCase();

    if (entry.prediction.toLowerCase().includes('over 2.5')) {
      current.over_two_point_five.prediction_code = '1';
    }
    else if (entry.prediction.toLowerCase().includes('under 2.5')) {
      current.over_two_point_five.prediction_code = '0';
    }

  })

  return events
}

export default fill;