import React, { useState } from "react";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { getWeatherForecast } from "../service/WeatherService";
function Home() {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState([]);
    const [error, setError] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
       
        // Validate city input
        if (!city.trim()) {
          setError('Please enter a city name');
          return;
        }
    
        try {
          const data = await getWeatherForecast(city);
          setWeatherData(data);
          setError('');
        } catch (err) {
          setError('Failed to fetch weather data. Please check the city name.');
          setWeatherData([]);
        }
      };
      const theadStyle = {
        backgroundColor: '#f8f9fa'  // Change this to your desired color
      };
  return (
    <>
      <Container className="mt-5 ">
      <form onSubmit={handleSubmit}>
        <Row>
          <Col>
            <p className="header-content">Weather in your city</p>
          </Col>
          
          <Col xs="auto">
            <Form.Control
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter city name"
            />
          </Col>
          <Col xs="auto">
            <Button type="submit" className="custom-button" >
              Search
            </Button>
          </Col>
          
          <Col></Col>
        </Row>
        </form>
      </Container>
      {error && <p>{error}</p>}
      <Container className="mt-5" >
      <Row className="table-content" >
        {weatherData.map((item, index) => {
         
          if (index % 8 === 0) {
            const date = new Date(item.dt * 1000).toLocaleDateString();
            const minTemp = item.main.temp_min;
            const maxTemp = item.main.temp_max;
            const pressure = item.main.pressure;
            const humidity = item.main.humidity;

            return (
              <Col key={item.dt} sm={2} className="mb-3">
                <Table bordered className="table-border" >
                  <thead className="custom-thead">
                    <tr>
                      <th colSpan={2}>Date: {date}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td colSpan={2}>Temperature</td>
                    </tr>
                    <tr>
                      <td>Min</td>
                      <td>Max</td>
                    </tr>
                    <tr>
                      <td>{minTemp}°C</td> 
                      <td>{maxTemp}°C</td> 
                    </tr>
                    <tr>
                      <td>Pressure</td>
                      <td>{pressure}</td>
                    </tr>
                    <tr>
                      <td>Humidity</td>
                      <td>{humidity}</td>
                    </tr>
                  </tbody>
                </Table>
              </Col>
            );
          }
          return null;
        })}
      </Row>
    </Container>
    </>
  );
}

export default Home;
