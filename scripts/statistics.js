let notesList = JSON.parse(localStorage.getItem("note"));

function getUnusedSpaceOfLocalStorageInBytes() {
  // Retrieves the unused space (in bytes) that Local Storage supports in current browser
  let maxByteSize = 10485760; // 10MB
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
    alert("Timeout");
    console.log("Unused space calculation may be off due to timeout.");
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
  let quota = "Unused bytes: " + unused + " Used Bytes: " +  used;
  console.log(quota)
  return quota;
}

function getLocalStorageQuotaInFormattedSize() {
  //let unused = formatBytes(getUnusedSpaceOfLocalStorageInBytes(), 0);
  //let used = formatBytes(getUsedSpaceOfLocalStorageInBytes(), 0);
  let unused = formatBytesNoDecimals(getUnusedSpaceOfLocalStorageInBytes());
  let used = formatBytesNoDecimals(getUsedSpaceOfLocalStorageInBytes());
  let quota = "You have used " + used + " of space." + " You have " + unused + " of space left.";
  return quota;
}

function getNumberOfKeysInLocalStorage() {
  let keyNumber = Object.keys('note').length;
  let numberString = "Number of Notes: " + keyNumber;
  return numberString;
}

/* function getDateOfFirstNote() {
  return "Your first note was created " + notesList[0].created;
}

function getDateOfLastNote() {
  return "Your last note was created " + notesList.slice(-1)[0].created;
} */

function getDateOfFirstAndLastNote() {
  let firstNote = notesList[0].created;
  let lastNost = notesList.slice(-1)[0].created;
  //let lastNote = notesList.slice(-1).pop.created;
  let dateString = "You wrote your first note " + firstNote + ". " + "You wrote your last note " + lastNost + ".";
  return dateString;
}

function loopThroughObject() {
  for (let key in notesList) {
    if (notesList.hasOwnProperty(key)) {
      let obj = notesList[key];
      for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) {
          //alert(prop + " = " + obj[prop]);
          console.log(prop + " = " + obj[prop]);
        }
      }
    }
  }
}

function lookDeepInObject(object) {
  let collection = [], index = 0, next, item;
  for (item in object) {
    if (object.hasOwnProperty(item)) {
      next = object[item];
      if (typeof next == 'object' && next != null) {
        collection[index++] = item +
          ':{ ' + lookdeep(next).join(', ') + '}';
      }
      else collection[index++] = [item + ':' + String(next)];
    }
  }
  return collection;
}


// Temporary DOM writer
function writeStats() {
  document.write(getLocalStorageQuotaInFormattedSize() + " " + getNumberOfKeysInLocalStorage() + " " + getDateOfFirstAndLastNote());
  console.log(getLocalStorageQuotaInFormattedSize());
  console.log(getNumberOfKeysInLocalStorage());
  //console.log(getDateOfFirstNote());
  //console.log(getDateOfLastNote());
  console.log(getDateOfFirstAndLastNote());
}