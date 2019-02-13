const fs = require('fs');
const WebClient = require('@slack/client').WebClient;

function getSecrets() {
    return JSON.parse(fs.readFileSync("slack_secret.json"));
}

function updateStatus(text, emoji, presence) {
    const secrets = getSecrets();
    const web = new WebClient(secrets.token);
    
    const profileData = {
        "user": secrets.user,
        "profile": {
            "status_text": text,
            "status_emoji": emoji
        }
    };

    
    /*web.users.list(function(err, res) {
        res.members.forEach(m => console.log(m.id, m.real_name))
    });*/ 

    web.users.setPresence(presence);

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
    return updateStatus(`In a meeting: ${title}`, ":calendar:", "away");
}

function updateAvailable() {
    return updateStatus("Available", ":green_heart:", "auto");
}

module.exports = {
    updateStatus,
    updateMeeting,
    updateAvailable
}