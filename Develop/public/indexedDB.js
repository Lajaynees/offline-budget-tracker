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

