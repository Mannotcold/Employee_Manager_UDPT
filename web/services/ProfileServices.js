const axios = require('axios');

const getAllProfile = async () => {
    let results;
    try {
        const response = await axios.get('http://localhost:8760/api/profiles');
        results = response.data;

        console.log(results);  // Sau đó log dữ liệu ra console
    } catch (error) {
        console.error('Error fetching data from API Java:', error);

    }
    return results;
}

const getProfileUserbyID = async (Id) => {
    let results;
    console.log("sádsdasad",Id)
    try {
        const response = await axios.get(
            `http://localhost:8760/api/profiles/${Id}?`
        );
        results = response.data;

        console.log(results);  // Sau đó log dữ liệu ra console
    } catch (error) {
        console.error('Error fetching data from API Java:', error);

    }
    return results;
}


module.exports = {
    getAllProfile, getProfileUserbyID
}