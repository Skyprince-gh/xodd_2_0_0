import {v4 as uuid} from 'uuid'

export class MatchEventObject{
  constructor(){
    this.id = uuid()
    
    //win draw win 1X2
    this.win_draw_win = {
      prediction: 'home win',
      prediction_code: '1', //prediction code 1 for home 2 for away and x for draw
      percentage: '',
      result: '', //result must match prediction code
      isWon: '',
      odds: {
        home: '',
        draw: '',
        away: ''
      }
    }
  
    //Both teams to score
    this.both_teams_to_score = {
      prediction: 'yes',
      prediction_code: '1', //prediction code 1 for yes and 2 for no
      percentage: '',
      result: '', //result must match prediction code
      isWon: '',
      odds: {
        yes: '',
        no: ''
      }
    }

    this.both_teams_to_score_and_win= {
      prediction: 'btts home',
      prediction_code: '1', //prediction code 1 for yes and 2 for no
      percentage: '',
      result: '', //result must match prediction code
      isWon: '',
      odds: {
        home: '',
        draw: '',
        away: ''
      }
    };

    this.double_chance= {
      prediction: 'home or draw',
      prediction_code: '1X', //prediction code 1 for yes and 2 for no
      percentage: '',
      result: '', //result must match prediction code
      isWon: '',
      odds: {
        home_or_draw: '',
        away_or_draw: '',
        home_or_away: ''
      }
    };

    this.draw_no_bet= {
      prediction: 'home',
      prediction_code: '1', //prediction code 1 for home 2 for away and x for draw
      percentage: '',
      result: '', //result must match prediction code
      isWon: '',
      odds: {
        home: '',
        away: ''
      }
    };

    this.over_zero_point_five= { 
      prediction: 'over 0.5',
      prediction_code: '1', //prediction code 1 for home 2 for away and x for draw
      percentage: '',
      result: '', //result must match prediction code
      isWon: '',
      odds: {
        over: ' ',
        under: ' '
      }
    };

    this.over_one_point_five= {
      prediction: 'over 1.5',
      prediction_code: '1', //prediction code 1 for home 2 for away and x for draw
      percentage: '',
      result: '', //result must match prediction code
      isWon: '',
      odds: {
        over: ' ',
        under: ' '
      }
    };

    this.over_two_point_five= {
      prediction: 'over 2.5',
      prediction_code: '1', //prediction code 1 for home 2 for away and x for draw
      percentage: '',
      result: '', //result must match prediction code
      isWon: '',
      odds: {
        over: ' ',
        under: ' '
      }
    };

    this.over_three_point_five= {
      prediction: 'over 3.5',
      prediction_code: '1', //prediction code 1 for home 2 for away and x for draw
      percentage: '',
      result: '', //result must match prediction code
      isWon: '',
      odds: {
        over: ' ',
        under: ' '
      }
    };

    this.over_four_point_five= {
      prediction: 'over 4.5',
      prediction_code: '1', //prediction code 1 for home 2 for away and x for draw
      percentage: '',
      result: '', //result must match prediction code
      isWon: '',
      odds: {
        over: ' ',
        under: ' '
      }
    };

    this.over_five_point_five= {
      prediction: 'over 5.5',
      prediction_code: '1', //prediction code 1 for home 2 for away and x for draw
      percentage: '',
      result: '', // result must match prediction code
      isWon: '',
      odds: {
        over: ' ',
        under: ' '
      }
    };

    this.team_to_score_first = {
      prediction: 'home first',
      prediction_code: '1', //prediction code 1 for home 2 for away and x for draw
      percentage: '',
      result: '', //result must match prediction code 
      isWon: '',
      odds: {
        home: '',
        away: '',
        none: ''
      }
    };

    this.stats= {
        home: {
        score: 0,
        goal_timeStamps: []
      },
      away: {
        score: 0,
        goal_timeStamps: []
      },
      general: {
        home: '',
        away: '',
        time: '',
      },
      goalEvents: [],      
    }

  }
}

