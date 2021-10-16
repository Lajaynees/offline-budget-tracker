let db;

// create and connect
const request = indexedDB.open("budget", 1)

//errors
request.onerror = function(event) {
    console.log("TRY AGAIN! " + event.target.errorCode);
};

// connection ok
// request.onsuccess = function(event) {
//     db = event.target.result; 
//     if (navigator.onLine) {
//         checkDatabase();
//     }
// };
// connection ok-shortened
request.onsuccess = ({ target }) => {
    db = target.result;
    if (navigator.onLine) {
      checkDatabase();
    }
};
        
// Object -Upgrade
request.onupgradeneeded = ({ target }) => {
    let db = target.result;
    db.createObjectStore("new_budget_sheet", { autoIncrement: true });
  };

// collecting new sheet data
  function checkDatabase() {
    const transaction = db.transaction(["new_budget_sheet"], "readwrite");
    const store = transaction.objectStore("new_budget_sheet");
     
    // Save data
     function saveRecord(record) {
        const transaction = db.transaction(["new_budget_sheet"], "readwrite");
        const store = transaction.objectStore("new_budget_sheet");
        objStore.add(record);
      }


// collect all records-run function when true
    const getAll = store.getAll();
    
    getAll.onsuccess = function() {
      if (getAll.result.length > 0) {
        fetch("/api/transaction/bulk", {
          method: "POST",
          body: JSON.stringify(getAll.result),
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
          }
        })




