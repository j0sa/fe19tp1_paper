let notesList = JSON.parse(localStorage.getItem('note'));
let notesString = JSON.stringify(localStorage.getItem('note'));

function getUnusedSpaceOfLocalStorageInBytes() {
  // Retrieves the unused space (in bytes) that Local Storage supports in current browser
  let maxByteSize = 10485760;
  let minByteSize = 0;
  let tryByteSize = 0;
  let testQuotaKey = 'testQuota';
  let timeout = 20000;
  let startTime = new Date().getTime();
  let unusedSpace = 0;
  // Injects test key in Local Storage for comparison
  do {
    runtime = new Date().getTime() - startTime;
    try {
      tryByteSize = Math.floor((maxByteSize + minByteSize) / 2);
      localStorage.setItem(testQuotaKey, new Array(tryByteSize).join('1'));
      minByteSize = tryByteSize;
    } catch (e) {
      maxByteSize = tryByteSize - 1;
    }
  } while ((maxByteSize - minByteSize > 1) && runtime < timeout);
  // Removes the test key
  localStorage.removeItem(testQuotaKey);
  if (runtime >= timeout) {
    console.log('Unused space calculation may be off due to timeout.');
  }
  // Compensate for the byte size of the key that was used, then subtract 1 byte because the last value of the tryByteSize threw the exception
  unusedSpace = tryByteSize + testQuotaKey.length - 1;
  return unusedSpace;
}

function getUsedSpaceOfLocalStorageInBytes() {
  // Retrieves the current amount of space (in bytes) in Local Storage
  let usedSpace = 0;
  for (let key in window.localStorage) {
    if (window.localStorage.hasOwnProperty(key)) {
      usedSpace += key.length + localStorage.getItem(key).length;
    }
  }
  return usedSpace;
}

/* function formatBytes(bytes, decimals) {
  // Formats the bytes into human readable, compensates for decimals (not used, for future use)
  if(bytes == 0) return '0 Bytes';
  let sizeLimit = 1024;
  let dm = decimals <= 0 ? 0 : decimals || 2;
  let sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  calculation = Math.floor(Math.log(bytes) / Math.log(sizeLimit));
  return parseFloat((bytes / Math.pow(sizeLimit, calculation)).toFixed(dm)) + ' ' + sizes[sizeLimit];
} */

function formatBytesNoDecimals(bytes) {
  let sizeLimit = Math.floor(Math.log(bytes) / Math.log(1024));
  let sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  return (bytes / Math.pow(1024, sizeLimit)).toFixed(2) * 1 + ' ' + sizes[sizeLimit];
}

function getLocalStorageQuotaInBytes() {
  // Collects numbers from getUnusedSpaceOfLocalStorageInBytes() and getUsedSpaceOfLocalStorageInBytes()
  let unused = getUnusedSpaceOfLocalStorageInBytes();
  let used = getUsedSpaceOfLocalStorageInBytes();
  let quota = 'Unused bytes: ' + unused + ' Used Bytes: ' + used;
  console.log(quota)
  return quota;
}

function getLocalStorageQuotaInFormattedSize() {
  //let unused = formatBytes(getUnusedSpaceOfLocalStorageInBytes(), 0);
  //let used = formatBytes(getUsedSpaceOfLocalStorageInBytes(), 0);
  let unused = formatBytesNoDecimals(getUnusedSpaceOfLocalStorageInBytes());
  let used = formatBytesNoDecimals(getUsedSpaceOfLocalStorageInBytes());
  let quota = 'You have used ' + used + ' of space.' + ' You have ' + unused + ' of space left.';
  return quota;
}

function getNumberOfKeysInLocalStorage() {
  let keyNumber = Object.keys('note').length;
  let numberString = 'Number of Notes: ' + keyNumber;
  return numberString;
}

function getDateOfFirstAndLastNote() {
  let firstNote = notesList[0].created;
  let lastNost = notesList.slice(-1)[0].created;
  //let lastNote = notesList.slice(-1).pop.created;
  let dateString = 'You wrote your first note ' + firstNote + '. ' + 'You wrote your last note ' + lastNost + '.';
  return dateString;
}

function extractSubstr(str, regexp) {
  // Clean and match sub-strings in a string.
  return str.replace(/[^\w\s]|_/g, '').replace(/\s+/g, ' ').toLowerCase().match(regexp) || [];
}

function getWordsByNonWhiteSpace(str) {
  // Find words by searching for sequences of non-whitespace characters.
  return extractSubstr(str, /\S+/g);
}

function getWordsByWordBoundaries(str) {
  // Find words by searching for valid characters between word-boundaries.
  return extractSubstr(str, /\b[a-z\d]+\b/g);
}

function wordMap(str) {
  // Recieves the modified string and then maps it
  return getWordsByWordBoundaries(str).reduce(function (map, word) {
    map[word] = (map[word] || 0) + 1;
    return map;
  }, {});
}

function mapToTuples(map) {
  // Matches word and freq
  return Object.keys(map).map(function (key) {
    return [key, map[key]];
  });
}

function mapToSortedTuples(map, sortFn, sortOrder) {
  // Sorts them
  return mapToTuples(map).sort(function (a, b) {
    return sortFn.call(undefined, a, b, sortOrder);
  });
}

function getWordFrequency(str) {
  return mapToSortedTuples(wordMap(str), function (a, b, order) {
    if (b[1] > a[1]) {
      return order[1] * -1;
    } else if (a[1] > b[1]) {
      return order[1] * 1;
    } else {
      return order[0] * (a[0] < b[0] ? -1 : (a[0] > b[0] ? 1 : 0));
    }
  }, [1, -1]);
}

function printTuples(tuples) {
  return tuples.map(function (tuple) {
    return padStr(tuple[0], ' ', 12, 1) + ' -> ' + tuple[1];
  }).join('\n');
}

function padStr(str, ch, width, dir) {
  return (width <= str.length ? str : padStr(dir < 0 ? ch + str : str + ch, ch, width, dir)).substr(0, width);
}

function getWordCount(str) {
  return getWordsByWordBoundaries(str).length;
}

function getStatsOnNotes() {
  let wordCnt = getWordCount(notesString);
  let wordFreq = getWordFrequency(notesString);
  let uniqueWords = wordFreq.length;
  let mostCommonWord = wordFreq[0][0];
  let leastCommonWord = wordFreq.slice(-2)[0][0];
  console.log(wordFreq);
  return 'You have written ' + wordCnt + ' words. ' + uniqueWords + ' of them are unique.' + 'Your most common word is: ' + mostCommonWord + ' and your least common word is ' + leastCommonWord;
}








// Temporary DOM writer
function writeStats() {
  document.write(getLocalStorageQuotaInFormattedSize() + ' ' + getNumberOfKeysInLocalStorage() + ' ' + getDateOfFirstAndLastNote() + ' ' + getStatsOnNotes());
  console.log(getLocalStorageQuotaInFormattedSize());
  console.log(getNumberOfKeysInLocalStorage());
  //console.log(getDateOfFirstNote());
  //console.log(getDateOfLastNote());
  console.log(getDateOfFirstAndLastNote());
}
