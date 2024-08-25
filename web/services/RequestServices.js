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

const updateRequest = async (requestId, status, approvedBy) => {
    try {
        // Gửi yêu cầu POST để cập nhật yêu cầu
        const response = await axios.post(
            `http://localhost:8080/api/requests/ad/${requestId}?status=${status}&approvedBy=${approvedBy}`
        );

        // Log dữ liệu kết quả trả về từ API
        console.log(response.data);
    } catch (error) {
        console.error('Error updating request:', error);
    }
}

const ViewUserRequest = async (userId) => {
    let results;
    try {
        const response = await axios.get(
            `http://localhost:8080/api/requests/${userId}?`
        );
        results = response.data;

        console.log(results);  // Sau đó log dữ liệu ra console
    } catch (error) {
        console.error('Error fetching data from API Java:', error);

    }
    return results;
}

const SendUserRequest = async (userId) => {
    let results;
    const requestData = {
        requestId: 'REQ00123',
        employeeId: userId,
        requestType: 'Leave Application',
        status: 'Pending',
        details: {
            startDate: '2024-09-01',
            endDate: '2024-09-10',
            reason: 'Annual Leave'
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        approvedBy: null
    };
    try {
        const response = await axios.post(
            `http://localhost:8080/api/requests`,
            requestData // Dữ liệu yêu cầu gửi trong request body
        );
        results = response.data;

        console.log(results);  // Sau đó log dữ liệu ra console
    } catch (error) {
        console.error('Error fetching data from API Java:', error);
    }
    return results;
}


module.exports = {
    getRequest, updateRequest, ViewUserRequest, SendUserRequest
}