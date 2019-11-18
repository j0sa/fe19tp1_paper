// Local Storage Statistics:
function getUsedSpaceOfLocalStorageInBytes() {
  // Returns the total number of used space (in Bytes) of the Local Storage
  let usedSpace = 0;
  for (let key in window.localStorage) {
    if (window.localStorage.hasOwnProperty(key)) {
      usedSpace += key.length + localStorage.getItem(key).length;
    }
  }
  return usedSpace;
}

function getUnusedSpaceOfLocalStorageInBytes() {
  // Returns the total number of unused space (in bytes) of the Local Storage
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

function formatBytes(bytes, decimals) {
  // Formats the bytes into human readable, compensates for decimals (not used, for future use)
  if(bytes == 0) return '0 Bytes';
  let sizeLimit = 1024;
  let dm = decimals <= 0 ? 0 : decimals || 2;
  let sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  calculation = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(sizeLimit, calculation)).toFixed(dm)) + ' ' + sizes[sizeLimit];
}

function getLocalStorageQuotaInBytes() {
  // Returns the total Bytes of Local Storage Space that the browser supports
  let unused = getUnusedSpaceOfLocalStorageInBytes();
  let used = getUsedSpaceOfLocalStorageInBytes();
  let quota = "Unused bytes: " + unused + " Used Bytes: " +  used;
  console.log(quota)
  return quota;
}

function getLocalStorageQuotaInFormattedSize() {
  // Returns the total Bytes (in formatted size) of Local Storage Space that the browser supports
  let unused = formatBytes(getUnusedSpaceOfLocalStorageInBytes(), 0);
  let used = formatBytes(getUsedSpaceOfLocalStorageInBytes(), 0);
  let quota = "Unused bytes: " + unused + " Used Bytes: " +  used;
  console.log(quota)
  return quota;
}

// Notes Statistics
function getNumberOfKeysInLocalStorage() {
  let keyNumber = Object.keys('note').length;
  let numberString = "Number of Notes: " + keyNumber;
  return numberString;
}

// Temporary DOM writer
function writeStats() {
  document.write(getLocalStorageQuotaInFormattedSize() + " " + getNumberOfKeysInLocalStorage());
}