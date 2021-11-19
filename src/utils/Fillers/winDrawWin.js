import findBestMatch from "../findBestMatch";

//this function simply fills in the entry in the selected object.
const fill = async (convertedBatch, events) => {
  console.log('wdw: converted:',convertedBatch)
  
  // convertedBatch.forEach(entry => { // loop throgh the entire batch

  //   const bestMatchIndex = findBestMatch(entry, events);
  //   const current = events[bestMatchIndex];

  //   current.stats.general.home = entry.home; //get the home team and store it.
  //   current.stats.general.away = entry.away; // get the away team and store it
  //   // current.stats.general.time = new Date(fileName + "T" + entry.time + ":00"); //create a time stamp using the date constructor
  //   current.win_draw_win.percentage = +entry.percentage.split('%')[0]; //get the percentage in string format and then convert it to number after spliting the % sign from it
  //   current.win_draw_win.odds.home = +entry.odds.home;
  //   current.win_draw_win.odds.draw = +entry.odds.draw;
  //   current.win_draw_win.odds.away = +entry.odds.away;
  //   current.win_draw_win.prediction = entry.prediction.toLowerCase();

  //   if (entry.prediction.toLowerCase().includes('home win')) {
  //     current.win_draw_win.prediction_code = '1'
  //   }
  //   else if (entry.prediction.toLowerCase().includes('away win')) {
  //     current.win_draw_win.prediction_code = '2'
  //   }
  //   else if (entry.prediction.toLowerCase().includes('draw')) {
  //     current.win_draw_win.prediction_code = 'X'
  //   }

  // })

  return events
}

export default fill;