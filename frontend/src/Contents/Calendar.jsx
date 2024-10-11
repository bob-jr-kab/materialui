// Calendar.js
import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Box, Typography, List, ListItem, Button } from "@mui/material";
import { gapi } from "gapi-script";

const CalendarComponent = () => {
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const CLIENT_ID =
    "701319142310-0iqgq03pldb7pupggj5kbqn8cj2lones.apps.googleusercontent.com"; // Replace with your client ID
  const API_KEY = "AIzaSyDKmZjKFwcgkueBBeYF4m-1MjpQZ4Fkce4"; // Replace with your API key
  const DISCOVERY_DOCS = [
    "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
  ];
  const SCOPES = "https://www.googleapis.com/auth/calendar.readonly";

  const handleDateChange = (newDate) => {
    setDate(newDate);
    if (isSignedIn) {
      fetchEvents(newDate); // Fetch events if user is signed in
    }
  };

  const fetchEvents = async (selectedDate) => {
    const dateString = selectedDate.toISOString().split("T")[0]; // Format date as YYYY-MM-DD
    const endDate = new Date(selectedDate);
    endDate.setDate(endDate.getDate() + 1); // End date is the next day

    try {
      const response = await gapi.client.calendar.events.list({
        calendarId: "primary",
        timeMin: new Date(dateString).toISOString(),
        timeMax: endDate.toISOString(),
        singleEvents: true,
        orderBy: "startTime",
      });

      const eventsList = response.result.items;
      setEvents(eventsList.length > 0 ? eventsList : []);
    } catch (error) {
      console.error("Error fetching events: ", error);
    }
  };

  useEffect(() => {
    const initClient = () => {
      gapi.client
        .init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
          discoveryDocs: DISCOVERY_DOCS,
          scope: SCOPES,
        })
        .then(() => {
          const authInstance = gapi.auth2.getAuthInstance();
          authInstance.isSignedIn.listen(handleAuthChange);
          handleAuthChange(authInstance.isSignedIn.get());
        });
    };

    gapi.load("client:auth2", initClient);
  }, []);

  const handleAuthChange = (isSignedIn) => {
    setIsSignedIn(isSignedIn);
    if (isSignedIn) {
      fetchEvents(date); // Fetch events if signed in
    } else {
      setEvents([]); // Clear events if not signed in
    }
  };

  const handleLogin = () => {
    gapi.auth2.getAuthInstance().signIn();
  };

  const handleLogout = () => {
    gapi.auth2.getAuthInstance().signOut();
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" p={2}>
      <Button
        variant="contained"
        color="primary"
        onClick={isSignedIn ? handleLogout : handleLogin}
        sx={{ mb: 2 }}
      >
        {isSignedIn ? "Logout" : "Login"}
      </Button>
      <Calendar onChange={handleDateChange} value={date} />
      <Box mt={2} textAlign="center">
        <Typography variant="h6">Events for {date.toDateString()}</Typography>
        <List>
          {isSignedIn && events.length > 0 ? (
            events.map((event, index) => (
              <ListItem key={index}>
                {event.summary} -{" "}
                {new Date(
                  event.start.dateTime || event.start.date
                ).toLocaleTimeString()}
              </ListItem>
            ))
          ) : (
            <ListItem>
              {isSignedIn
                ? "No events scheduled"
                : "Please log in to see events."}
            </ListItem>
          )}
        </List>
      </Box>
    </Box>
  );
};

export default CalendarComponent;
