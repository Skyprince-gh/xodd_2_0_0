const convertDashesToUnderScore = (string) => {
  console.log('string is:', string, ' wants to be converted')
  let converted = ''
  
  switch (string.trim()) {
    case 'win-draw-win':
      converted = 'win_draw_win';
      break;
    case 'both-teams-to-score':
      converted = 'both_teams_to_score';
      break;
    case 'both-teams-to-score-and-win':
      converted = 'both_teams_to_score_and_win';
      break;
    case 'double-chance':
      converted = 'double_chance';
      break;
    case 'draw-no-bet':
      converted = 'draw_no_bet';
      break;
    case 'over-under-0.5':
      converted = 'over_zero_point_five';
      break;
    case 'over-under-1.5':
      converted = 'over_one_point_five';
      break;
    case 'over-under-2.5':
      converted = 'over_two_point_five';
      break;
    case 'over-under-3.5':
      converted = 'over_three_point_five';
      break;
    case 'over-under-4.5':
      converted = 'over_four_point_five';
      break;
    case 'over-under-5.5':
      converted = 'over_five_point_five';
      break;
    default:
      converted = '';
  }
  console.log('before returning:', converted)
  return converted;
}

export default convertDashesToUnderScore;