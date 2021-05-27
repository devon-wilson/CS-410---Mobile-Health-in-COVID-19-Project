import axios from 'axios';

class Backend{

    constructor(){}

    async getMonth(input) {
        const params = {
            params: {
                month: input
            }
        }
        let response = await axios.get("https://cy7orrz93f.execute-api.us-west-2.amazonaws.com/beta/month", params)
        //let response = await axios.get("https://cy7orrz93f.execute-api.us-west-2.amazonaws.com/beta/month", {params: {month : input}})
        let json_response = JSON.parse(response.data['body'])
        return(json_response['Items'])
    }
    
    async getDate(input) {
        const params = {
            params: {
                date: input
            }
        }
        let response = await axios.get("https://cy7orrz93f.execute-api.us-west-2.amazonaws.com/beta/date", params)
        return(response['data']['Item'])
    }

    async put(input) {
        const params = {
            date: input['date'],
            exposure: input['exposure'],
            heartrate: input['heartrate'],
            month: input['month'],
            symptoms: input['symptoms'],
            weight: input['weight'],
        }
        let response = await axios.post("https://cy7orrz93f.execute-api.us-west-2.amazonaws.com/beta/date", params)
        return(response)
    }
}

export default Backend;