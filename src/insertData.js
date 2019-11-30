const axios = require('axios');
const fs = require('fs');

let read_data = () => {
    let raw = fs.readFileSync('data/crashes.json');
    let data = JSON.parse(raw);
    return data
}

let post_data = async (data) => {
    URL = 'http://localhost:9200/nypd/crash/'
    console.log(data.length)
    for(let i = 0; i < data.length; i++) {
        data_i = data[i];
        await axios.post(URL + i, data_i)
        .catch((error) => {
            console.log(error);
        });
        console.log(i)
    }
    console.log('All datas were posted!')
}

let data = read_data()
post_data(data)