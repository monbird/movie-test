import axios from 'axios';

// TODO: consider moving apiKey to .env (and document if so)
export const getImdbTitles = (phrase) =>
    axios.get(`http://www.omdbapi.com/?apikey=f8b13765&s=${phrase}`);

export const getImdbTitleDetails = (id) =>
    axios.get(`http://www.omdbapi.com/?apikey=f8b13765&i=${id}`)

const apis = {
    getImdbTitles,
    getImdbTitleDetails,
};

export default apis;
