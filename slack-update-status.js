const fs = require('fs');
const WebClient = require('@slack/client').WebClient;

function getSecrets() {
    return JSON.parse(fs.readFileSync("slack_secret.json"));
}

function updateStatus(text, emoji) {
    const secrets = getSecrets();
    const web = new WebClient(secrets.token);
    
    const profileData = {
        "user": secrets.user,
        "profile": {
            "status_text": text,
            "status_emoji": emoji
        }
    };

    return new Promise((resolve, reject) => {
        web.users.profile.set(profileData, function(err, info) {
            if (err) {
                reject(err);
            } else {
                resolve(info);
            }
        });
    });
}

function updateMeeting(title) {
    return updateStatus(`Meeting: ${title}`, ":calendar:");
}

function updateAvailable() {
    return updateStatus("Available", ":green_heart:");
}

module.exports = {
    updateStatus,
    updateMeeting,
    updateAvailable
}