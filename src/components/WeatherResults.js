import React from "react";

const Results = props =>
  <div>
      <button onClick={props.handleFehrenheit} style={props.selectedButton === "Fehrenheit" ? props.blueStyle : props.grayStyle} id='Fehrenheit' className="btn btn-primary">
        Fehrenheit
      </button>

      <button onClick={props.handleCelsius} style={props.selectedButton === "Celsius" ? props.blueStyle : props.grayStyle} id='Celsius' className="btn btn-primary">
        Celsius
      </button>


      <ul className="list-group">
        <h1>{ props.temp }</h1>
        <h3>{ props.description }</h3>
        <h5>{ props.low } / { props.high }</h5>
        <p>{ props.wind } mph wind</p>
        <p>{ props.humidity }% humidity</p>
        <p>{ props.pressure } inches pressure</p>
        <p>{ parseInt(props.visibility, 10) } miles visibility</p>
      </ul>

  </div>;

export default Results;
