import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";
import {useState, useEffect} from "react";
import OverallInfo from "../types/IWeather";


export default function Widget() {
  const [weatherInfo, setWeatherInfo] = useState<OverallInfo | undefined>();
  const [isLoading, setLoading] = useState(true);
  const [query, setQuery] = useState("");


  const days:string[] = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"]

  const months:string[] = ["january", "february", "march", "april", "may", "june", "july", "august", "october", "november", "december"]

  const date = new Date();
  const month = months[date.getMonth()-1];
  const day = days[date.getDay()];
  const dayOfMonth = date.getUTCDate();


  async function fetchWeatherInformation(query:string) {
    let response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${query ? query : "berlin"}&units=metric&appid=${process.env.REACT_APP_APIKEY}`)

    if(response.ok) {
      let data = await response.json();
      console.log(data);
      setWeatherInfo(data);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchWeatherInformation("");
  }, []);

  useEffect(() => {
    if(query.length > 2) {
      fetchWeatherInformation(query);
    } else if(query.length === 0) {
      fetchWeatherInformation("");
    }
  }, [query])

  useEffect(() => {
    console.log(weatherInfo?.city.name);
    setLoading(false);
  }, [weatherInfo])

  return (
    <div className="d-flex align-items-center justify-content-center bgGradient" style={{width: "100vw", height: "100vh"}}>
    <Container style={{width: "70vw"}}>
      <Form className="mt-2" style={{marginBottom: "2rem"}} onSubmit={e => e.preventDefault()}>
      <Form.Group>
        <Form.Control style={{backgroundColor: "#ccc", opacity:"0.6", border: "none", borderBottom: "1px solid #138496", borderBottomLeftRadius: "10px", borderBottomRightRadius: "10px",borderTopRightRadius: "10px", borderTopLeftRadius: "10px", height: "3rem", boxShadow: "none", fontSize: "1.5rem", color: "Black", width: "50%"}} type="text" placeholder="Check weather by location" value={query} onChange={(e) => {setQuery(e.target.value)}}/>
      </Form.Group>
    </Form>

        <div style={{height:"500px", opacity: "0.7", backgroundColor: "#ccc", borderTopLeftRadius:"20px", borderBottomLeftRadius: "20px", borderTopRightRadius: "20px", borderBottomRightRadius: "20px", padding: "2rem"}}>
          {
            isLoading && (
              <div className="d-flex justify-content-center align-items-center" style={{width: "100%", height: "100%"}}>
              <Spinner animation="grow" style={{backgroundColor: "#23a6d5"}}/>
              </div>
            )
          }
          { !isLoading && weatherInfo &&  (
            <div style={{color: "black"}} className="d-flex justify-content-between informationArea">
            <div className="d-flex flex-column">
            <p className="p-0 m-0" style={{fontSize: "1.4rem", fontWeight: "500", textTransform:"capitalize"}}>{`${day}, ${dayOfMonth}th of ${month}`}</p>
            <h3>{`${weatherInfo.city.name}, ${weatherInfo.city.country}`}</h3>
            <h3>{`${weatherInfo.list[0].dt_txt.slice(10,-3)}`}</h3>
            <div className="d-flex align-items-center">
            <img src={`http://openweathermap.org/img/wn/${weatherInfo.list[0].weather[0].icon}@2x.png`}/>
            <h3>{`${Math.round(weatherInfo.list[0].main.temp)}`}{'\u2103'}</h3>
            </div>
            <p style={{fontWeight: "700"}}>{`Feels like ${Math.ceil(weatherInfo.list[0].main.feels_like)}`}{'\u2103'}. {`${weatherInfo.list[0].weather[0].main}.`}</p>
            <div className="d-flex">
              <div className="d-flex flex-column" style={{fontWeight: "500"}}>
                <div className="d-flex">
                <p>{`Min: ${weatherInfo.list[0].main.temp_min}`}{'\u2103'}</p>
                <p className="ml-3">{`Max: ${weatherInfo.list[0].main.temp_max}`}{'\u2103'}</p>
                </div>
                <p>{`Humidity: ${weatherInfo.list[0].main.humidity}%`}</p>
                <p>{`Visibility: ${weatherInfo.list[0].visibility / 1000}km`}</p>
              </div>
            </div>
            </div>
            <div className="d-flex flex-column" style={{width: "50%", borderTopLeftRadius:"20px", borderBottomLeftRadius: "20px", borderTopRightRadius: "20px", borderBottomRightRadius: "20px"}}>
              <p className="text-center m-0 p-0 mb-1" style={{color: "black", fontSize: "1.4rem", fontWeight: "500", opacity: "1"}}>Forecast for today</p>
              <div className="d-flex flex-column" style={{fontWeight: "500", width:"80%", margin: "auto"}}>
                {weatherInfo.list.map((info, i) => {
                  if(i > 0 && i < 8) {
                    return(
                      <div className="d-flex align-items-center justify-content-between">
                      <p className="m-0" style={{fontWeight:"600"}}>{info.dt_txt.slice(10,-3)}</p>
                      <img src={`http://openweathermap.org/img/wn/${info.weather[0].icon}.png`}/>
                      <p className="m-0">{info.weather[0].main}</p>
                      <p className="m-0 p-0">{`${Math.round(info.main.temp)}`}{'\u2103'}</p>
                      </div>
                    )
                  }
                })
                }
              </div>
            </div>
          </div>
          )}
        </div>
    </Container>
    </div>
  )
}
