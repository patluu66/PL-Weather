import React, { Component } from "react";
// import summer from "./images/summer.jpg";
import sunny from "./images/sunny3.png";
import rain from "./images/rain.jpg";
import cloudy from "./images/cloudy.png";
import mist from "./images/mist.png";
import thunderstorm from "./images/thunderstorm.png";
// import API from "../utils/API";
import axios from "axios";
// import { setup } from 'axios-cache-adapter';
import { setupCache } from 'axios-cache-adapter'
import { Grid, Row, Col, Image } from 'react-bootstrap';
import Results from './WeatherResults';
import Search from './NavSearch';



class SearchResultContainer extends Component {
  state = {
    search: "",
    results2: [],
    isLoaded: false,
    city: "Oakland",
    city2: null,
    temp: null,
    tempConverted: undefined,
    low: null,
    lowConverted: null,
    high: null,
    highConverted: null,
    windSpeed: null,
    humidity: null,
    description: null,
    error: null,
    grayButton: true,
    selectedButton: "Fehrenheit",
    pressure: null,
    visibility: null,
    weatherArr: [],
  };

  componentDidMount() {
    // this.weatherSearchCache(this.state.city);
    this.weatherSearchCache('Oakland');
    // this.weatherSearchCache(this.state.search);
  }


  weatherSearchCache = (city) => {
    const cache = setupCache({
      maxAge: 15 * 60 * 1000
    })

    const api = axios.create({
      adapter: cache.adapter
    })

    api({
      url: ('http://api.openweathermap.org/data/2.5/weather?q=' + city +'&APPID=6bf9870e82dcbe8003e32440f76c2775'),
      method: 'get'
    }).then(res =>

        this.setState({
        city2: res.data.name,
        temp: res.data.main.temp,
        tempConverted: parseInt(res.data.main.temp * 9/5 - 459.67, 10) + '℉',
        low: res.data.main.temp_min,
        lowConverted: parseInt(res.data.main.temp_min * 9/5 - 459.67, 10) + '℉',
        high: res.data.main.temp_max,
        highConverted: parseInt(res.data.main.temp_max * 9/5 - 459.67, 10) + '℉',
        windSpeed: res.data.wind.speed,
        humidity: res.data.main.humidity,
        description: res.data.weather[0].description,
        results2: res.data,
        isLoaded: true,
        pressure: parseInt((res.data.main.pressure * .02952998), 10),
        visibility: (res.data.visibility/1609.34),
        weatherArr: (res.data.weather[0].description).split(" "),
        })
      )
      .catch(err => alert("Enter a valid city"));

  }

  handleInputChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    // console.log(name)
    // console.log(value)
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    // this.weatherSearch2(this.state.city);
    // this.weatherSearchCache(this.state.city);
    this.weatherSearchCache(this.state.search);
    // console.log(this.state.weatherArr);
  };

  handleFehrenheit = event => {
    let key = event.target.id;
    event.preventDefault();
    // console.log(key);
    // console.log("state: " + this.state.selectedButton);

    this.setState({
      tempConverted: parseInt(this.state.temp * 9/5 - 459.67, 10) + '℉',
      lowConverted: parseInt(this.state.low * 9/5 - 459.67, 10) + '℉' ,
      highConverted: parseInt(this.state.high * 9/5 - 459.67, 10) + '℉',
      selectedButton: key,
    })
  }

  handleCelsius = event => {
    let key = event.target.id;
    event.preventDefault();
    // console.log(key);
    // console.log("state: " + this.state.selectedButton);

    this.setState({
      tempConverted: parseInt(this.state.temp - 273.15, 10) + '℃',
      lowConverted: parseInt(this.state.low - 273.15, 10) + '℃',
      highConverted: parseInt(this.state.high - 273.15, 10) + '℃',
      grayButton: !this.state.grayButton,
      selectedButton: key,
    })
  }

  handleImage = (weatherArr) => {
    // let weatherArr = weather.split(" ");

    if(weatherArr.indexOf("mist") !== -1) {
      return mist;
    } else if(weatherArr.indexOf("clouds") !== -1) {
      return cloudy;
    } else if(weatherArr.indexOf("sunny") !== -1) {
      return sunny;
    } else if(weatherArr.indexOf("rain") !== -1) {
      return rain;
    } else if(weatherArr.indexOf("thunderstorm") !== -1) {
      return thunderstorm;
    } else {
      return sunny;
    }
  }

  render() {
    // const print = function() {
    //   console.log(this.state.result);


    let grayStyle = {
      backgroundColor: 'gray',
      margin: '10px 10px 20px 0px',
    }

    let blueStyle = {
      backgroundColor: '#2177c2',
      margin: '10px 10px 20px 0px',
    }

    let currentWeatherStyle = {
      backgroundColor: '#2177c2',
      color: 'white',
    }

    let submitButtonStyle = {
      backgroundColor: '#2177c2',
      color: 'white',
      margin: '0 0 0 10px',
    }

    let navStyle = {
      backgroundColor: '#081c2e',
      color: 'white',
    }

    let whiteTextStyle = {
      color: 'white',
    }

    let wholeNavStyle = {
      margin: '0 0 50px 0',
    }

    let footerStyle = {
      backgroundColor: '#081c2e',
      color: 'white',
      margin: '200px 0 0 0',
      height: '50px'
    }

    let weatherInfoStyle = {
      padding: '50px 0 0 20px'
    }

    return (
      <div>
        <div style={wholeNavStyle}>
          <Search navStyle={navStyle} whiteTextStyle={whiteTextStyle}
          handleInputChange={this.handleInputChange}
          handleFormSubmit={this.handleFormSubmit} submitButtonStyle={submitButtonStyle}
          city2={this.state.city2} currentWeatherStyle={currentWeatherStyle}
          search={this.state.search} />
        </div>

      <Grid>
        <Row className="show-grid">
           <Col md={6} mdPush={6}>

             <div style={weatherInfoStyle}>

                 <Results results={this.state.results2} temp={this.state.tempConverted}
                 description={this.state.description} low={this.state.lowConverted}
                 high={this.state.highConverted} wind={this.state.windSpeed}
                 humidity={this.state.humidity} handleFehrenheit={this.handleFehrenheit}
                 selectedButton={this.state.selectedButton}  handleCelsius={this.handleCelsius}
                 blueStyle={blueStyle} grayStyle={grayStyle} pressure={this.state.pressure}
                 visibility={this.state.visibility} />

               </div>

           </Col>
           <Col md={6} mdPull={6}>

              <div>

                <Image src={this.handleImage(this.state.weatherArr)} height="600px" width="600px" responsive alt="summer" />
              </div>

           </Col>
         </Row>
       </Grid>



       <div style={footerStyle}>
        <center><p>Copyright Patrick Luu</p></center>

       </div>


      </div>
    );
  }
}

export default SearchResultContainer;





// <Image src={sunny} responsive alt="summer" />


// weatherSearch = (city) => {
//   axios.get('http://api.openweathermap.org/data/2.5/weather?q=' + city +'&APPID=6bf9870e82dcbe8003e32440f76c2775')
//     .then(response =>
//       console.log(response.data)
//       // this.setState({ results2: response.data.main })
//     )
//     .catch(function (error) {
//       console.log(error);
//   });
// }
