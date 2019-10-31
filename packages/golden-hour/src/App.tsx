import React, { useState } from 'react';
// @ts-ignore
import SunCalc from 'suncalc2';
import moment from 'moment';
import { FormGroup, Label, Col, Input, Container, Button } from 'reactstrap';
import Navbar from './Navbar';

interface Geolocation {
  lat: number,
  lng: number,
}

function time(date: Date): string {
  return moment(date).format('LTS');
}

const Times: React.FC<{date: Date, geolocation: Geolocation}> = (props) => {
  const sunCalc = SunCalc.getTimes(props.date, props.geolocation.lat, props.geolocation.lng);

  return (
    <>
      <ul>
        <li>Dawn: {time(sunCalc.dawn)}</li>
        <li>Nautical Dawn: {time(sunCalc.nauticalDawn)}</li>
        <li>Sunrise (Begins): {time(sunCalc.sunrise)}</li>
        <li>Sunrise (Ends): {time(sunCalc.sunriseEnd)}</li>
        <li>Morning Golden Hour (Ends): {time(sunCalc.goldenHourEnd)}</li>
      </ul>
      <ul>
        <li>Evening Golden Hour (Begins): {time(sunCalc.goldenHour)}</li>
        <li>Sunset (Begins): {time(sunCalc.sunsetStart)}</li>
        <li>Sunset (Ends): {time(sunCalc.sunset)}</li>
        <li>Dusk: {time(sunCalc.dusk)}</li>
        <li>Nautical Dusk: {time(sunCalc.nauticalDusk)}</li>
      </ul>
    </>
  );
}

const App: React.FC = () => {
  const [date] = useState(new Date());
  const [latitude, setLatitude] = useState(() => {
    const latitude = localStorage.getItem('latitude');
    if (!latitude) {
      return 0;
    }

    return parseFloat(latitude);
  });
  const [longitude, setLongitude] = useState(() => {
    const longitude = localStorage.getItem('longitude');
    if (!longitude) {
      return 0;
    }

    return parseFloat(longitude);
  });

  const setLatitudeInLocalStorage = (value: number): void => {
    setLatitude(value);
    localStorage.setItem('latitude', `${value}`);
  }

  const setLongitudeInLocalStorage = (value: number): void => {
    setLongitude(value);
    localStorage.setItem('longitude', `${value}`);
  }

  const onClick = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLatitudeInLocalStorage(position.coords.latitude);
      setLongitudeInLocalStorage(position.coords.longitude);
    });
  }

  return (
    <div className="App">
      <Navbar />
      <Container>
        <FormGroup check row>
          <Col sm={{ size: 10, offset: 2 }}>
            <Button onClick={onClick}>
              Geolocate me
            </Button>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="latitude" sm={2}>
            Latitude
          </Label>
          <Col sm="10">
            <Input 
              name="latitude"
              type="number"
              value={latitude}
              onChange={(e) => setLatitudeInLocalStorage(parseFloat(e.target.value))}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="latitude" sm={2}>
            Longitude
          </Label>
          <Col sm="10">
            <Input 
              name="latitude"
              type="number"
              value={longitude}
              onChange={(e) => setLongitudeInLocalStorage(parseFloat(e.target.value))}
            />
          </Col>
        </FormGroup>

        <Times date={date} geolocation={{lat: latitude, lng: longitude}} />

        Alternatives:
        <ul>
          <li><a href="http://www.golden-hour.com/">http://www.golden-hour.com/</a></li>
          <li><a href="https://app.photoephemeris.com/">The Photographer's Ephemersis</a></li>
          <li><a href="http://suncalc.net/">SunCalc</a></li>
          <li><a href="https://apps.apple.com/us/app/sol-sun-clock/id491537291">iOS: Sol: Sun Clock</a></li>
        </ul>

        References:
        <ul>
          <li><a href="https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API">Geolocation API</a></li>
        </ul>

        Wikipedia:
        <ul>
          <li><a href="https://en.wikipedia.org/wiki/Golden_hour_(photography)">Golden hour (photography)</a></li>
          <li><a href="https://en.wikipedia.org/wiki/Sunrise_equation">Sunrise Equation</a></li>
        </ul>
      </Container>
    </div>
  );
}

export default App;
