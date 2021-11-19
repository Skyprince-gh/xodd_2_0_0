import stringSimilarity from 'string-similarity';

const findBestMatch = (entry, events) => {
  const teams = entry.home + ' v ' + entry.away;
  const arr = [];
  events.forEach(event => {
    arr.push(event.stats.general.home + ' v ' + event.stats.general.away);
  })

  const matches = stringSimilarity.findBestMatch(teams, arr)
  // const target = matches.bestMatch.target;
  const index = matches.bestMatchIndex;
  // console.log('match:', target, 'names in the array:', arr, 'current entry: ', entry)

  return index;
}

export const compareTwoStrings = (string1,string2) => {
   return  stringSimilarity.compareTwoStrings(string1, string2)
}

export default findBestMatch;