import React from "react";
import { Button, Navbar, Grid, Row, Col } from 'react-bootstrap';

const Search = props =>
    <Navbar style={props.navStyle}>
    <Navbar.Header>
      <Navbar.Brand>
        <p style={props.whiteTextStyle}>
          PL Weather
        </p>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Navbar.Form pullLeft>

      <form>
        <div className="form-group">
          <input
            onChange={props.handleInputChange}
            value={props.search}
            name="search"
            type="text"
            className="form-control"
            placeholder="City"
            id="search"
          />

           <Button onClick={props.handleFormSubmit} style={props.submitButtonStyle} type="submit">Search</Button>
        </div>
      </form>



      </Navbar.Form>
    </Navbar.Collapse>

    <Grid>
    <Row className="show-grid">
       <Col md={6} mdPush={6}>
          <div>City of {props.city2}</div>
       </Col>
       <Col md={6} mdPull={6}>

          <Button style={props.currentWeatherStyle}>Current Weather</Button>
          <Button style={props.navStyle}>Weekend</Button>
          <Button style={props.navStyle}>Extended</Button>
       </Col>
     </Row>
    </Grid>
    </Navbar>;


export default Search;








// <Button onClick={props.handleFormSubmit} style={props.submitButtonStyle} type="submit" className="btn btn-primary">
//   Search
// </Button>


// <FormGroup>
//   <FormControl type="text" placeholder="City" name="city" onChange={props.handleInputChange}/>
// </FormGroup>{' '}
// <Button onClick={props.handleFormSubmit} style={props.submitButtonStyle} type="submit">Search</Button>
