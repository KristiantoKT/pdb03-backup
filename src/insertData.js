const axios = require('axios');
const fs = require('fs');

let create_index = async () => {
    const URL = 'http://localhost:9200/crash'
    const body = {
        "settings": {
            "number_of_shards": 3,
            "number_of_replicas": 1
        }
    }
    await axios.put(URL, body)
    .then((response) => {
        console.log(response);
    })
    .catch((error) => {
        console.log(error);
    });
}

let read_data = () => {
    let raw = fs.readFileSync('data/crashes.json');
    let data = JSON.parse(raw);
    return data
}

let post_data = async (data) => {
    const URL = 'http://localhost:9200/crash/_doc/'    
    for(let i = 0; i < data.length; i++) {
        let data_i = data[i];
        await axios.post(URL + i, data_i)
        .catch((error) => {
            console.log(error);
        });
        console.log(i)
    }
    console.log('All datas were posted!')
}

let data = read_data()
create_index()
post_data(data)