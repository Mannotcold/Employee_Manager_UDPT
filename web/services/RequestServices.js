const axios = require('axios');
const getRequest = async () => {
    let results;
    try {
        const response = await axios.get('http://localhost:8080/api/requests');
        results = response.data;

        console.log(results);  // Sau đó log dữ liệu ra console
    } catch (error) {
        console.error('Error fetching data from API Java:', error);

    }
    return results;
}

module.exports = {
    getRequest
}