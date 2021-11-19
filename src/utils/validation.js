export const validateScores = (newCard) => {
  /* this method checks the newCard object and then allocates the scores properly. It also makes sure that
  the isWon setting is set to true or false  */
  let data = {...newCard}



  
  //WIN DRAW WIN
  if(data.win_draw_win.prediction_code !== null)
  {

      if (data.stats.home.score > data.stats.away.score) {
        data.win_draw_win.result = "1"
      }
      else if (data.stats.home.score < data.stats.away.score) {
        data.win_draw_win.result = "2"
      }
      else {
        data.win_draw_win.result = "X"
      }
      
      data.win_draw_win.isWon = checkIfIsWonIsTrueOrFalse(data, 'win_draw_win')
  }
    //BOTH TEAMS TO SCORE
  if (data.both_teams_to_score.prediction_code !== null)
  {
      if(newCard.stats.home.score > 0 && newCard.stats.away.score > 0){
        data.both_teams_to_score.result = "1"
      }
      else{
        data.both_teams_to_score.result = "2"
      }    

      data.both_teams_to_score.isWon = checkIfIsWonIsTrueOrFalse(data, 'both_teams_to_score')
  }
    
  //BOTH TEAMS TO SCORE AND WIN
  if (data.both_teams_to_score_and_win.prediction_code !== null)
  {
      if(data.both_teams_to_score_and_win.prediction_code === "1" && data.both_teams_to_score.isWon && (data.stats.home.score > data.stats.away.score)){
        data.both_teams_to_score_and_win.result = "1"
      }
      else if (data.both_teams_to_score_and_win.prediction_code === "2" && data.both_teams_to_score.isWon && (data.stats.home.score < data.stats.away.score)){
        data.both_teams_to_score_and_win.result = "2"
      }
      else if (data.both_teams_to_score_and_win.prediction_code === "X" && data.both_teams_to_score.isWon && (data.stats.home.score === data.stats.away.score)){
        data.both_teams_to_score_and_win.result = "X"
      } 
      else {
        data.both_teams_to_score_and_win.result = "lost"
      }   

      data.both_teams_to_score_and_win.isWon = checkIfIsWonIsTrueOrFalse(data, 'both_teams_to_score_and_win')
  }


  //DOUBLE CHANCE
  if(data.double_chance.prediction_code !== null){
    if(
        data.double_chance.prediction_code === '1X' && 
        (
          (data.stats.home.score > data.stats.away.score) || 
          (data.stats.home.score === data.stats.away.score)
        )
    )
    {
        data.double_chance.result = '1X'
    }
    else if (
        data.double_chance.prediction_code === 'X2' && 
        (
          (data.stats.home.score < data.stats.away.score) || 
          (data.stats.home.score === data.stats.away.score)
        )
    )
    {
        data.double_chance.result = 'X2'
    }
    else if(
      data.double_chance.prediction_code === '12' && 
      (
        (data.stats.home.score < data.stats.away.score) || 
        (data.stats.home.score > data.stats.away.score)
      )
    ) {
      data.double_chance.result = "12"
    }

    data.double_chance.isWon = checkIfIsWonIsTrueOrFalse(data, 'double_chance')
  }


  //DRAW NO BET
  if(data.draw_no_bet.prediction_code !== null)
  {

      if ( data.draw_no_bet.prediction_code === "1" &&  data.stats.home.score > data.stats.away.score) {
        data.draw_no_bet.result = "1"
      }
      else if ( data.draw_no_bet.prediction_code === "2" && data.stats.home.score < data.stats.away.score) {
        data.draw_no_bet.result = "2"
      }
      else if ((data.draw_no_bet.prediction_code === "1" || data.draw_no_bet.prediction_code === "2") && (data.stats.home.score === data.stats.away.score)){
        data.draw_no_bet.result = "draw"
      }      
      
      data.draw_no_bet.isWon = checkIfIsWonIsTrueOrFalse(data, 'draw_no_bet')
  }

  //OVER 0.5
  if(data.over_zero_point_five.prediction_code !== null)
  {

      if (data.stats.home.score + data.stats.away.score >= 1) {
        data.over_zero_point_five.result = "1"
      }
      else if (data.stats.home.score + data.stats.away.score < 1) {
        data.over_zero_point_five.result = "0"
      }
      
      
      data.over_zero_point_five.isWon = checkIfIsWonIsTrueOrFalse(data, 'over_zero_point_five')
  }

  //OVER 1.5
  if(data.over_one_point_five.prediction_code !== null)
  {

      if (data.stats.home.score + data.stats.away.score >= 2) {
        data.over_one_point_five.result = "1"
      }
      else if (data.stats.home.score + data.stats.away.score < 2) {
        data.over_one_point_five.result = "0"
      }      
      
      data.over_one_point_five.isWon = checkIfIsWonIsTrueOrFalse(data, 'over_one_point_five')
  }

  //OVER 2.5
  if(data.over_two_point_five.prediction_code !== null)
  {

      if (data.stats.home.score + data.stats.away.score >= 3) {
        data.over_two_point_five.result = "1"
      }
      else if (data.stats.home.score + data.stats.away.score < 3) {
        data.over_two_point_five.result = "0"
      }      
      
      data.over_two_point_five.isWon = checkIfIsWonIsTrueOrFalse(data, 'over_two_point_five')
  }

  //OVER 3.5
  if(data.over_three_point_five.prediction_code !== null)
  {

      if (data.stats.home.score + data.stats.away.score >= 4) {
        data.over_three_point_five.result = "1"
      }
      else if (data.stats.home.score + data.stats.away.score < 4) {
        data.over_three_point_five.result = "0"
      }      
      
      data.over_three_point_five.isWon = checkIfIsWonIsTrueOrFalse(data, 'over_three_point_five')
  }

  //OVER 4.5
  if(data.over_four_point_five.prediction_code !== null)
  {

      if (data.stats.home.score + data.stats.away.score >= 5) {
        data.over_four_point_five.result = "1"
      }
      else if (data.stats.home.score + data.stats.away.score < 5) {
        data.over_four_point_five.result = "0"
      }      
      
      data.over_four_point_five.isWon = checkIfIsWonIsTrueOrFalse(data, 'over_four_point_five')
  }

  //OVER 5.5
  if(data.over_five_point_five.prediction_code !== null)
  {

      if (data.stats.home.score + data.stats.away.score >= 6) {
        data.over_five_point_five.result = "1"
      }
      else if (data.stats.home.score + data.stats.away.score < 6) {
        data.over_five_point_five.result = "0"
      }      
      
      data.over_five_point_five.isWon = checkIfIsWonIsTrueOrFalse(data, 'over_five_point_five')
  }

  //TEAM TO SCORE FIRST
  if(data.team_to_score_first.prediction_code !== null)
  {
    let homeTimeStamps = new Set()
    let awayTimeStamps = new Set()

    data.stats.goalEvents.forEach(event => {
      if(event.team === "home"){
        homeTimeStamps.add(event.timeStamp)
      }
      if(event.team === "away"){
        awayTimeStamps.add(event.timeStamp)
      }
    })

    let sorted_Home = [...homeTimeStamps].sort();
    let sorted_Away = [...awayTimeStamps].sort();
    let first_number_home = 200;
    let first_number_away = 200;

    if(sorted_Home.length > 0){
      first_number_home = sorted_Home[0];
    }
    if(sorted_Away.length > 0){
      first_number_away = sorted_Away[0]
    }

    if(first_number_home < first_number_away){
      data.team_to_score_first.result = "1"
    }
    else if (first_number_away < first_number_home){
      data.team_to_score_first.result = "2"
    }
    else if(first_number_home === 200 && first_number_away === 200){
      data.team_to_score_first.result = "0"      
    }

    data.team_to_score_first.isWon = checkIfIsWonIsTrueOrFalse(data, 'team_to_score_first')
  }
    
    //console.log('saved data after validation: ', data)  
    return data
}


const checkIfIsWonIsTrueOrFalse = (data, category) => {
  /* This function return true or false based on the result in the data category */
  if(data[category].prediction_code === data[category].result){
    return true;
  }
  else {
    return false
  }
}

// export const extractTimeStamps = (data) => {
//   let h = []
//   let a = []
//   let homeTimeStamps = new Set()
//   let awayTimeStamps = new Set()

//   data.stats.goalEvents.forEach(event => {
//     if(event.team === "home"){
//       homeTimeStamps.add(event.timeStamp)
//     }
//     if(event.team === "away"){
//       awayTimeStamps.add(event.timeStamp)
//     }
//   })
  
//   h = [...homeTimeStamps];
//   a = [...awayTimeStamps];
//   data.stats.home.goal_timeStamps = h
//   data.stats.away.goal_timeStamps = a

//   //console.log('data from extracted timeStamps: ', data)
//   return data;
// }



