import axios from "axios";

const BASEURL = "http://api.openweathermap.org/data/2.5/weather?q=";
const APIKEY = "&APPID=6bf9870e82dcbe8003e32440f76c2775";


export default {
  search: function(query) {
    // console.log(axios.get(BASEURL + query + APIKEY));
    return axios.get(BASEURL + query + APIKEY);
  }
};
