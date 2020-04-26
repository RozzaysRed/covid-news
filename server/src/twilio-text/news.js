import fetch from 'node-fetch';

const getNationalNews = () => {
    const newUrl = 'https://covidtracking.com/api/press'

    return new Promise((resolve, reject) => {
        fetch(newUrl)
        .then(res => resolve(res.json()))
        .catch((error) => {
            return console.log(error);
        });
    });   
}

const getCovidStats = (stateAbbrv) => {
    const covidStatsURL = 'https://covidtracking.com/api/states?state=' + stateAbbrv;
    return new Promise((resolve, reject) => {
         fetch(covidStatsURL)
        .then(res => resolve(res.json()))
        .catch((error) => {
            return console.log(error);
        });
    });
}

export { getNationalNews, getCovidStats }