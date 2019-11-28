import React from 'react';
import Titles from './components/Titles';
import Form from './components/Form';
import Weather from './components/Weather';
import Joke from './components/Joke';

const API_KEY = 'b22619fd187e3343c3f120051e88c3c8';

class App extends React.Component {
  state = {
    temperature: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    error: undefined,
    jokeTitle: undefined,
    jokePunchile: undefined
  };
  componentDidMount() {
    this.getJoke();
  }
  getJoke = async e => {
    // e.preventDefault()
    let api_call = await fetch(
      'https://official-joke-api.appspot.com/random_joke'
    );
    let data = await api_call.json();
    let jokeTitle = await data.setup;
    let jokeRes = await data.punchline;
    console.log(jokeTitle, jokeRes);
    this.setState({
      jokeTitle: jokeTitle,
      jokePunchile: jokeRes
    });
  };

  getWeather = async e => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    const api_call = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`
    );
    const data = await api_call.json();
    if (city && country) {
      console.log(data);
      this.setState({
        temperature: data.main.temp,
        city: data.name,
        country: data.sys.country,
        humidity: data.main.humidity,
        description: data.weather[0].description,
        error: ''
      });
    } else {
      this.setState({
        temperature: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        error: 'Please enter the value',
        joke: undefined
      });
    }
  };
  render() {
    return (
      <div>
        <div className="wrapper">
          <div className="main">
            <div className="title">
              <Titles getJoke={this.getJoke} />
            </div>
            <div className="content">
              <div className="left">
                <Form getWeather={this.getWeather} />
                <div className="weather">
                  <Weather
                    temperature={this.state.temperature}
                    humidity={this.state.humidity}
                    city={this.state.city}
                    country={this.state.country}
                    description={this.state.description}
                    error={this.state.error}
                  />
                </div>
              </div>
              <div className="right">
                <Joke
                  className="joke"
                  GetJoke={this.getJoke}
                  Joketitle={this.state.jokeTitle}
                  JokeAns={this.state.jokePunchile}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default App;
