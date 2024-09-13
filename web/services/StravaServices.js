const axios = require('axios');

const generateRequestId = (userId) => {
    const randomDigits = Math.floor(100 + Math.random() * 900); // Generate a random 3-digit number
    return `REQ${userId}${randomDigits}`;
};

const SendUserActivity = async (userId, clientID, clientSecret, code) => {
    let results;
    const activityId = generateRequestId(userId);
    const requestData = {
        employeeId: userId, // Employee ID
        clientID: clientID, // Client ID from form
        grant_type: "authorization-code",
        clientSecret: clientSecret, // Client Secret from form
        code: code, // Authorization code from form
    };
    console.log(results);
    try {
        const response = await axios.post(
            `http://localhost:8085/api/create`, // API endpoint
            requestData // Send request data in the request body
        );
        results = response.data;
        console.log(results);  // Log the result in console
    } catch (error) {
        console.error('Error sending data to API:', error); // Error handling
    }
    return results;
};

const getAllActivities = async () => {
    let results;
    try {
        const response = await axios.get('http://localhost:8085/api/getActivities');
        results = response.data;

        console.log(results);  // Sau đó log dữ liệu ra console
    } catch (error) {
        console.error('Error fetching data from API Java:', error);

    }
    return results;
}



const ViewUserActivities = async (userId) => {
    let results;
    try {
        const response = await axios.get(
            `http://localhost:8085/api/activities/${userId}?`
        );
        results = response.data;

        console.log(results);  // Sau đó log dữ liệu ra console
    } catch (error) {
        console.error('Error fetching data from API Java:', error);
    }
    return results;
}

module.exports = { SendUserActivity, getAllActivities, ViewUserActivities }