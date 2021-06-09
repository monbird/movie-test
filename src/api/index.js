import axios from 'axios';

// TODO: consider moving apiKey to .env (and document if so)
const getImdbTitles = (phrase) =>
    axios.get(`http://www.omdbapi.com/?apikey=f8b13765&s=${phrase}`);

const getImdbTitleDetails = (id) =>
    axios.get(`http://www.omdbapi.com/?apikey=f8b13765&i=${id}`)

const apis = {
    getImdbTitles,
    getImdbTitleDetails,
};

export default apis;
