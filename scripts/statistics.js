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
  // Compensate for the byte size of the key that was used
  // then subtract 1 byte because the last value of the tryByteSize threw the exception
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
  //let unused = formatBytes(getUnusedSpaceOfLocalStorageInBytes(), 0); <--IF WITH DECIMALS
  //let used = formatBytes(getUsedSpaceOfLocalStorageInBytes(), 0); <--IF WITH DECIAMALS
  let unused = formatBytesNoDecimals(getUnusedSpaceOfLocalStorageInBytes());
  let used = formatBytesNoDecimals(getUsedSpaceOfLocalStorageInBytes());
  if (notesList === null || !notesList) {
    let quota = 'You have ' + unused + ' of space left';
    return quota;
  } else {
    let quota = 'You have used ' + used + ' of space.' + ' You have ' + unused + ' of space left.';
    return quota;
  }
}

function getNumberOfKeysInLocalStorage() {
  let keyNumber = notesList.length;
  let numberString = 'Number of Notes: ' + keyNumber;
  return numberString;
}

function getDateOfFirstAndLastNote() {
  let firstNote = notesList[0].created;
  let lastNost = notesList.slice(-1)[0].created;
  //let lastNote = notesList.slice(-1).pop.created;
  if (notesList.length === 1) {
    return 'You wrote your note ' + firstNote;
  } else {
    let dateString = 'You wrote your first note ' + firstNote + '. ' + 'You wrote your last note ' + lastNost + '.';
    return dateString;
  }
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
  return Object.keys(map).map(function (key) {
    return [key, map[key]];
  });
}

function mapToSortedTuples(map, sortFn, sortOrder) {
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
  let wordCntSentence = 'You have written ' + wordCnt + ' words. ';
  let uniqueWordsSentence = uniqueWords + ' of them are unique.';
  let mostCommonWordSentence = ' Your most common word is: ' + mostCommonWord + '.';
  let leastCommonWordSentence = ' Your least common word is: ' + leastCommonWord + '.';
  return wordCntSentence + uniqueWordsSentence + mostCommonWordSentence + leastCommonWordSentence;
}

function getWordFrequencyList() {
  let wordFreq = getWordFrequency(notesString);
  return wordFreq;
}

function toTable(data, headers) {
  return $('<table>').append($('<thead>').append($('<tr>').append(headers.map(function (header) {
    return $('<th>').html(header);
  })))).append($('<tbody>').append(data.map(function (row) {
    return $('<tr>').append(row.map(function (cell) {
      return $('<td>').html(cell);
    }));
  })));
}

function addRowsBefore(table, data) {
  table.find('tbody').prepend(data.map(function (row) {
    return $('<tr>').append(row.map(function (cell) {
      return $('<td>').html(cell);
    }));
  }));
  return table;
}

/* $(function () {
  $('#countWordsBtn').on('click', function (e) {
    let str = notesString;
    let wordFreq = getWordFrequency(str);
    let wordCount = getWordCount(str);
    let uniqueWords = wordFreq.length;
    let summaryData = [
      ['TOTAL', wordCount],
      ['UNIQUE', uniqueWords]
    ];
    let table = toTable(wordFreq, ['Word', 'Frequency']);
    addRowsBefore(table, summaryData);
    $('#wordFreq').html(table);
  });
}); */

function writeTable() {
  let str = notesString;
  let wordFreq = getWordFrequency(str);
  let wordCount = getWordCount(str);
  let uniqueWords = wordFreq.length;
  let summaryData = [
    ['TOTAL', wordCount],
    ['UNIQUE', uniqueWords]
  ];
  let table = toTable(wordFreq, ['Word', 'Frequency']);
  addRowsBefore(table, summaryData);
  $('#wordFreq').html(table);
}

// Temporary DOM writer
function writeStats() {
  if (notesList === null || !notesList) {
    document.querySelector('#localstoragequota').innerHTML = getLocalStorageQuotaInFormattedSize();
    document.querySelector('#keysinlocalstorage').innerHTML = ' You do not have any notes to extract statistics from.';
    console.log(getLocalStorageQuotaInFormattedSize());
  } else if (JSON.stringify(notesList).length < 500) {
    document.querySelector('#localstoragequota').innerHTML = getLocalStorageQuotaInFormattedSize();
    document.querySelector('#keysinlocalstorage').innerHTML = getNumberOfKeysInLocalStorage();
    document.querySelector('#dateoffirstandlastnote').innerHTML = getDateOfFirstAndLastNote();
    document.querySelector('#statsonnotes').innerHTML = 'You have not written enough words to extract any statistics';
  } else {
    document.querySelector('#localstoragequota').innerHTML = getLocalStorageQuotaInFormattedSize();
    document.querySelector('#keysinlocalstorage').innerHTML = getNumberOfKeysInLocalStorage();
    document.querySelector('#dateoffirstandlastnote').innerHTML = getDateOfFirstAndLastNote();
    document.querySelector('#statsonnotes').innerHTML = getStatsOnNotes();
    console.log(getLocalStorageQuotaInFormattedSize());
    console.log(getNumberOfKeysInLocalStorage());
    console.log(getDateOfFirstAndLastNote());
  }
}

if (window.attachEvent) {
  window.attachEvent('onload', writeStats());
} else {
  if (window.onload) {
    var curronload = window.onload;
    var newonload = function (evt) {
      curronload(evt);
      writeStats(evt);
    };
    window.onload = newonload;
  } else {
    window.onload = writeStats();
  }
}

function onReady(callback) {
  var intervalID = window.setInterval(checkReady, 1000);
  function checkReady() {
    if (document.getElementsByTagName('body')[0] !== undefined) {
      window.clearInterval(intervalID);
      callback.call(this);
    }
  }
}

function show(id, value) {
  document.getElementById(id).style.display = value ? 'block' : 'none';
}

onReady(function () {
  show('page', true);
  show('loading', false);
});

// Charts
let ctx = document.getElementById('localstoragechart').getContext('2d');

let usedStat = getUsedSpaceOfLocalStorageInBytes();
let unusedStat = getUnusedSpaceOfLocalStorageInBytes();

let localstoragechart = new Chart(ctx, {
  type: 'pie',
  data: {
    labels: ['Used', 'Unused'],
    datasets: [{
      label: 'Memory in Local Storage',
      backgroundColor: ["#3e95cd", "#8e5ea2"],
      data: [usedStat, unusedStat]
    }]
  },
  options: {
    title: {
      display: true,
      text: 'Memory in Local Storage'
    },},
});


// new Chart(document.getElementById("localstoragechart"), {
//   type: 'pie',
//   data: {
//     labels: ["Africa", "Asia", "Europe", "Latin America", "North America"],
//     datasets: [{
//       label: "Population (millions)",
//       backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850"],
//       data: [2478, 5267, 734, 784, 433]
//     }]
//   },
//   options: {
//     title: {
//       display: true,
//       text: 'Predicted world population (millions) in 2050'
//     },
//     responsive: true
//   }
// });