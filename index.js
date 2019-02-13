const gcal = require("./gcal-events.js");
const slack = require("./slack-update-status.js");

function findOngoingEvent(events) {
    if (events.length == 0) {
        console.log('No upcoming events found.');
        return;
    }

    const eventHappeningNow = events.find(e => {
        var start = new Date(e.start.dateTime);
        var end = new Date(e.end.dateTime);
        var now = new Date();

        if (!start || !end) {
            // ignore all-day events
            return false;
        }

        var self = e.attendees && e.attendees.find(attendee => attendee.self);
        if (self && self.responseStatus === 'declined') {
            // ignore events where I responded as 'no'
            return false;
        }

        return start < now && end > now;
    });

    return eventHappeningNow;
}

function updateSlack(event) {
    if (event) {
        return slack.updateMeeting(event.summary)
    } else {
        return slack.updateAvailable();
    }
}

gcal.getNextEvents()
    .then(findOngoingEvent)
    .then(updateSlack)
    .then((info) => console.log("Updated status: ", info.profile.status_text))
    .catch(err => console.log("Error", err));



