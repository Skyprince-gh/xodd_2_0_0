
export const checkPercentage = (string1, string2) => {
  console.log('matches:', string1, string2)
  string1.toLowerCase();
  string2.toLowerCase();

  let shortLength = 0;
  let longLength = 0;

  let long = '';
  let short = '';
  let matches = 0;
  let percentage = 0;

  //loop through the one with the shortest length
  if (string1.length > string2.length || string1.length === string2.length) { //the first parameter string length is greater than the second
    long = string1;
    short = string2
  }

  else if (string1.length < string2.length) { //the second parameter string length is greater than the first
    long = string2;
    short = string1;
  }

  shortLength = short.length;
  longLength = long.length;

  for (let i = 0; i < long.length; i++) {
    for (let x = 0; x < short.length; x++) {
      if (long[i] === short[x]) { //if there is a character match
        // console.log(short);
        short = short.replace(short[x], '') //replace the string;
        matches++; //increase the match count
        break;
      }
    }
  }

  percentage = (matches / shortLength) * 100;

  console.log(percentage);
  return percentage;
}

