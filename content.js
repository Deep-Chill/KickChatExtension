let messagesTimestamps = [];

function createChatActivityBar() {
    let activityBar = document.createElement('div');
    activityBar.id = 'chatActivityBar';
    activityBar.style.cssText = 'position: fixed; right: 680px; top: 90%; transform: translateY(-50%); background: white; color: black; padding: 10px; z-index: 9999; border: 2px solid #000; border-radius: 10px; font-family: Arial, sans-serif; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);';

    // Header
    let header = document.createElement('div');
    header.textContent = 'Chat Velocity';
    header.style.cssText = 'font-weight: bold; margin-bottom: 0px; text-align: center;';
    activityBar.appendChild(header);

    let chatVelocities = ['15s', '1m', '5m'];
    chatVelocities.forEach(function(velocity) {
        let velocityElement = document.createElement('div');
        velocityElement.id = 'chatVelocity_' + velocity;
        velocityElement.style.cssText = 'background: #f0f0f0; margin-bottom: 5px; padding: 5px; border-radius: 5px;';
        activityBar.appendChild(velocityElement);
    });

    document.body.appendChild(activityBar);
    return activityBar;
}

let chatActivityBar = createChatActivityBar();

function updateChatActivityBar() {
    let now = Date.now();
    let counts = {
        '15s': 0,
        '1m': 0,
        '5m': 0
    };

    for (let i = messagesTimestamps.length - 1; i >= 0; i--) {
        let age = now - messagesTimestamps[i];

        if (age > 5 * 60 * 1000) {
            // This and all older messages are more than 5 minutes old, remove them
            messagesTimestamps.splice(0, i + 1);
            break;
        }

        if (age <= 15 * 1000) counts['15s']++;
        if (age <= 60 * 1000) counts['1m']++;
        if (age <= 5 * 60 * 1000) counts['5m']++;
    }

    // Update each velocity display
    for (let velocity in counts) {
        let velocityElement = document.getElementById('chatVelocity_' + velocity);
        velocityElement.textContent = velocity + ': ' + counts[velocity] + ' messages';
    }
}

setInterval(updateChatActivityBar, 1000);

let lastCountedEntry = null;

function checkNewMessages() {
    let chatMessages = document.querySelectorAll('div[data-chat-entry]');
    let newMessages = false;

    chatMessages.forEach(function(message) {
        if(message === lastCountedEntry) {
            newMessages = true;
        }

        if(newMessages) {
            messagesTimestamps.push(Date.now());
        }
    });

    if(chatMessages.length > 0) {
        lastCountedEntry = chatMessages[chatMessages.length - 1];
    }
}

checkNewMessages();
setInterval(checkNewMessages, 1000);
