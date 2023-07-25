let messageCount = 0;

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.type === "incrementCount") {
        messageCount++;
        console.log("Incremented count: " + messageCount); // Add this line
    }
});

setInterval(function() {
    console.log("Reset count"); // Add this line
    messageCount = 0;
}, 60000); // reset the count every 60 seconds
