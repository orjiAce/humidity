import React, {Component} from 'react';
import gsap from "gsap";
//fontawesome
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faDirections, faSun, faWind} from '@fortawesome/free-solid-svg-icons'
// or get other plugins:
import axios from 'axios';
import '../assets/style/responsive.scss';
import Background from "../components/BackGround";
//icons
import searchLocation from '../assets/img/icon/Icon material-my-location.svg'
import mapMarker from '../assets/img/icon/Icon awesome-map-marker.png'
import moreBtn from '../assets/img/icon/Group 9.png';
import Humidity from '../assets/img/icon/Icon weather-humidity.png';
import DayNight from '../assets/img/icon/Icon weather-moon-alt-first-quarter.png';
import Sun from '../assets/img/icon/Icon ionic-md-sunny.png';
import Geocode from "react-geocode";


//Google geo location


// set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
Geocode.setApiKey("AIzaSyAw6olNV5QM1OZwSg42iIXwEcS3lrcSCuM");

// set response language. Defaults to english.
Geocode.setLanguage("en");

// Enable or disable logs. Its optional.
Geocode.enableDebug();

class Home extends Component {

    constructor(props) {
        super(props);
        this.current = null;
        this.searchBody = null;
        this.temp = null;
        this.condition = null;
        this.weatherPills = null;
        this.state = {
            toggle: false,
            weatherData: {},
            address: "",
            latitude: "",
            longitude: "",
        }
    }

    getData = (weatherData) => {
        this.setState({
            weatherData: weatherData
        })
    }


    componentDidMount() {
        gsap.from(this.current, {
            y: 60,
            duration: 1,
            scale: 1.1,
            ease: "power3.inOut"
        });
        gsap.from(this.temp, {
            x: 60,
            duration: 1,
            scale: 1.1,
            ease: "power3.inOut"
        });
        const my = (weatherData) => {
            /* this.setState({
                 weatherData: weatherData
             })*/
        }
        navigator.geolocation.getCurrentPosition(function (position) {
            //  console.log("Latitude is :", position.coords.latitude);
            // console.log("Longitude is :", position.coords.longitude);
            // Get address from latidude & longitude.
            Geocode.fromLatLng(Math.round(position.coords.latitude), Math.round(position.coords.longitude) - 2).then(
                response => {
                    const address = response.results[3].formatted_address;
                    console.log(address);
                    //  this.setState({address: address})
//document.getElementById("address").innerHTML = address
                    axios.get(`http://api.weatherstack.com/forecast?access_key=f6c77f438ddac28d7e25deb17cc9fa7d&query=${address}&hourly=3`)
                        .then((res) => {

                            my(res.data)

                            //console.log(this.state.weatherData)
                        })
                        .catch((err) => console.log(err));


                },
                error => {
                    console.error(error);
                }
            );
        });


        // Get address from latidude & longitude.
        /*  Geocode.fromLatLng("9", Math.round(8.675277) - 2).then(
              response => {
                  const address = response.results[3].formatted_address;
                  console.log(address);
                  this.setState({address: address})

                  axios.get(`http://api.weatherstack.com/forecast?access_key=f6c77f438ddac28d7e25deb17cc9fa7d&query=${address}&hourly=3`)
                      .then((res) => {
                          this.setState({
                              weatherData: res.data
                          });
                          //console.log(this.state.weatherData)
                      })
                      .catch((err) => console.log(err));

              },
              error => {
                  console.error(error);
              }
          );*/


    }


    showSearch = () => {
        gsap.from([this.searchBody], {
            duration: 0.8,
            transformOrigin: "top",
            skewY: 2,
            scale: 0.4,
            ease: "power3.inOut",
            stagger: {
                amount: 0.1
            }
        });
        gsap.to([this.searchBody], {
            duration: 0.8,
            height: "100%",
            width: "100%",
            skewY: 0,
            scale: 1,
            display: "flex",
            ease: "power3.inOut",
            stagger: {
                amount: 0.1
            }
        });
    }
    closeSearch = () => {
        gsap.to([this.searchBody], {
            duration: 0.8,
            height: "0",
            width: "100%",
            skewY: 0,
            scale: 0,
            transformOrigin: "top",
            ease: "power3.inOut",
            stagger: {
                amount: 0.1
            }
        });
        this.setState({})
    }

    showCurrentFull = () => {
        const {toggle} = this.state;
        gsap.from([this.current], {
            duration: 0.8,
            transformOrigin: "bottom",
            skewY: 2,
            scale: 0.4,
            ease: "power3.inOut",
            stagger: {
                amount: 0.1
            }
        });  gsap.from([ this.weatherPills], {
            duration: 0.8,
            transformOrigin: "bottom",
            delay: 0.2,
            skewY:2,
            opacity:0,
            y:40,
            scale: 0.4,
            ease: "power3.inOut",
            stagger: {
                amount: 0.1
            }
        });
        gsap.to([this.current], {
            duration: 0.8,
            skewY: 0,
            scale: 1,
            opacity: 1,
            display: "flex",
            ease: "power3.inOut",
            stagger: {
                amount: 0.1
            }
        });
        gsap.to(this.temp, {
            x: -40,
            y: -10,
            fontSize: "0.9em",
            borderRadius: "0%",
            width: "100%",
            color: "#fff",
            height: "100px",

        });
        gsap.to(this.condition, {
            x: -40,
            y: -10,
            fontSize: "0.6em",


        })
        this.setState({toggle: true})
    }

    closeCurrent = () => {
        const {toggle} = this.state;
        gsap.to(this.condition, {
            x: 0,
            y: 0,
            fontSize: "0.9em",


        })
        gsap.from([this.current], {
            duration: 0.8,
            skewY: 0,
            opacity: 1,
            ease: "power3.inOut",
            stagger: {
                amount: 0.1
            }
        });
        gsap.to([this.current], {
            duration: 0.8,
            opacity: 0,
            transformOrigin: "bottom",
            skewY: 2,
            scale: 0.1,
            display: "none",
            ease: "power3.inOut",
            stagger: {
                amount: 0.1
            }
        });

        gsap.to(this.temp, {
            x: 0,
            y: 0,
            borderRadius: "100%",
            width: "180px",
            height: "180px",

        })

        this.setState({toggle: false})
    }

    render() {
        const {location, current} = this.state.weatherData
        console.log(this.state.weatherData)
        const {toggle} = this.state;

        return (
            <div className="body">

                <div className="searchBody" ref={el => (this.searchBody = el)}>
                    <button className="closeBtn" onClick={this.closeSearch}>Close</button>

                    <div>COMING SOON..!!</div>
                    <div className="searchWrap">
                        <input type="Search" placeholder="search..."/>
                    </div>
                </div>
                <Background/>
                <div className="overlay">

                </div>

                <div className="content">
                    {
                        toggle ? (<button className="moreBtn" onClick={this.closeCurrent}>
                            X
                        </button>) : (<button className="moreBtn" onClick={this.showCurrentFull}>
                            <img src={moreBtn} alt="more button"/>

                        </button>)
                    }


                    <div className="wrap">
                        <div className="search" onClick={this.showSearch}>
                            <div>
                                Search..
                            </div>

                            <div className="icon">
                                <img src={searchLocation} alt="search location"/>
                            </div>
                        </div>

                        <div className="currentCity">
                            {/*   {
                                location && (
                                    <div className="city">{location.name}, {location.country}</div>
                                )
                            }*/}
                            <div className="city">Warri, nigeria</div>

                            <div className="cityMarker">
                                <img src={mapMarker} alt="icon"/> <small>Current city</small>
                            </div>
                        </div>

                        <div className="temperature" ref={el => (this.temp = el)}>
                            <div className="temp">
                                24<small>°C</small>
                            </div>
                            <small>Today</small>
                        </div>
                        <small className="feels">Feels like</small>
                        <div className="condition" ref={el => ( this.condition = el)}>
                            Partly cloudy
                        </div>


                        <div className="mobSearch" onClick={this.showSearch}>
                            <div>
                                Search..
                            </div>

                            <div className="icon">
                                <img src={searchLocation} alt="search location"/>
                            </div>
                        </div>
                    </div>


                    <div className="currentFull" ref={el => (this.current = el)}>
                        <div className="currentTime">
                            08:46 PM
                        </div>
                        <div className="currentWeather">

                            <div className="weatherPills" ref={el =>(this.weatherPills = el)}>
                                <div className="icon">
                                    <img src={Sun} alt="uv index"/>
                                </div>
                                <div className="data">
                                    <div>
                                        90
                                    </div>
                                    <div className="txt">

                                        UV Index
                                    </div>
                                </div>
                            </div>

                            <div className="weatherPills" ref={el =>(this.weatherPills = el)}>
                                <div className="icon">
                                    <FontAwesomeIcon icon={faSun}/>
                                </div>
                                <div className="data">
                                    <div>
                                        90
                                    </div>
                                    <div className="txt">

                                        Sun
                                    </div>
                                </div>
                            </div >
                            <div className="weatherPills" ref={el =>(this.weatherPills = el)}>
                                <div className="icon">
                                    <FontAwesomeIcon icon={faWind}/>
                                </div>
                                <div className="data">
                                    <div>
                                        90
                                    </div>
                                    <div className="txt">

                                        Wind Speed
                                    </div>
                                </div>
                            </div>
                            <div className="weatherPills" ref={el =>(this.weatherPills = el)}>
                                <div className="icon">
                                    <FontAwesomeIcon icon={faDirections}/>
                                </div>
                                <div className="data">
                                    <div>
                                        90
                                    </div>
                                    <div className="txt">

                                        Wind Dir
                                    </div>
                                </div>
                            </div>
                            <div className="weatherPills" ref={el =>(this.weatherPills = el)}>
                                <div className="icon">
                                   <img src={Humidity} alt="Humidity"/>
                                </div>
                                <div className="data">
                                    <div>
                                        90
                                    </div>
                                    <div className="txt">

                                   Humidity
                                    </div>
                                </div>
                            </div>
                            <div className="weatherPills" ref={el =>(this.weatherPills = el)}>
                                <div className="icon">
                                    <img src={DayNight} alt="Day and night"/>
                                </div>
                                <div className="data">
                                    <div>
                                        No
                                    </div>
                                    <div className="txt">

                                  Day?
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;