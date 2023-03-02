async function readTag() {
    if ("NDEFReader" in window) {
      const ndef = new NDEFReader();
      try {
        await ndef.scan();
        ndef.onreading = event => {
          const decoder = new TextDecoder();
          for (const record of event.message.records) {
            if (record.recordType === "Apple.com") {
                const circle = document.querySelector(".circle"); // Replace ".circle" with the selector for the circle element you want to change
                circle.style.backgroundColor = "yellow";
                break; // Stop iterating through records since a match has been found
              }
            consoleLog("Record type:  " + record.recordType);
            consoleLog("MIME type:    " + record.mediaType);
            consoleLog("=== data ===\n" + decoder.decode(record.data));
          }
        }
      } catch(error) {
        consoleLog(error);
      }
    } else {
      consoleLog("Web NFC is not supported.");
    }
  }
  
  async function writeTag() {
    if ("NDEFReader" in window) {
      const ndef = new NDEFReader();
      try {
        await ndef.write("What Web Can Do Today");
        consoleLog("NDEF message written!");
      } catch(error) {
        consoleLog(error);
      }
    } else {
      consoleLog("Web NFC is not supported.");
    }
  }
  
  function consoleLog(data) {
    var logElement = document.getElementById('log');
    logElement.innerHTML += data + '\n';

  }