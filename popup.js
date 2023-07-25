console.log("Popup opened"); // Add this line

chrome.runtime.sendMessage({type: "getCount"}, function(response) {
    console.log("Received count: " + response.count); // Add this line
    document.getElementById('messageCount').textContent = response.count;
});
