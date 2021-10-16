let db;

// create and connect
const request = indexedDB.open("budget", 1)

//errors
request.onerror = function(event) {
    console.log("Error! " + event.target.errorCode);
};

// connection ok
request.onsuccess = function(event) {
    db = event.target.result; 
    if (navigator.onLine) {
        checkDatabase();
    }
};

