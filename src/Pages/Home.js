import React, {Component} from 'react';
import gsap from "gsap";
// or get other plugins:
import axios from 'axios';
import '../assets/style/responsive.scss';
import Background from "../components/BackGround";
//icons
import searchLocation from '../assets/img/icon/Icon material-my-location.svg'
import mapMarker from '../assets/img/icon/Icon awesome-map-marker.png'
import moreBtn from '../assets/img/icon/Group 9.png'

class Home extends Component {

    constructor(props) {
        super(props);
        this.current = null;
        this.searchBody = null;
        this.temp = null;
        this.state = {
            toggle: false,
            weatherData: {},
        }
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

             axios.get(`http://api.weatherstack.com/forecast?access_key=f6c77f438ddac28d7e25deb17cc9fa7d&query=lagos&hourly=3`)
                   .then((res) => {
                       this.setState({
                           weatherData: res.data
                       });
                       //console.log(this.state.weatherData)
                   })
                   .catch((err) => console.log(err));
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
        });
        gsap.to([this.current], {
            duration: 0.8,
            skewY: 0,
            scale:1,
            opacity:1,
            display: "flex",
            ease: "power3.inOut",
            stagger: {
                amount: 0.1
            }
        });
        gsap.to(this.temp, {
            x:-40,
            y:-10,
            fontSize:"0.9em",
            borderRadius:"0%",
            width:"100%",
            height:"100px",

        })
        this.setState({toggle: true})
    }

    closeCurrent = () =>{
        const {toggle} = this.state;

        gsap.from([this.current], {
            duration: 0.8,
            skewY: 0,
            opacity:1,
            ease: "power3.inOut",
            stagger: {
                amount: 0.1
            }
        });
        gsap.to([this.current], {
            duration: 0.8,
            opacity:0,
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
            x:0,
            y:0,
            borderRadius:"100%",
            width:"180px",
            height:"180px",

        })

        this.setState({toggle: false})
    }
    render() {
        const {location, current} = this.state.weatherData


        console.log(location)
        const {toggle} = this.state;
        return (
            <div className="body">
                <div className="searchBody" ref={el => (this.searchBody = el)}>
                    <button className="closeBtn" onClick={this.closeSearch}>Close</button>
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
                            {
location && (
    <div className="city">{location.name}, {location.country}</div>
)
                            }


                            <div className="cityMarker">
                                <img src={mapMarker}/> <small>Current city</small>
                            </div>
                        </div>

                        <div className="temperature" ref={el => (this.temp = el)}>
                            <div className="temp">
                                24<small>°C</small>
                            </div>
                            <small>Today</small>
                        </div>
                        <div className="condition">
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

                    </div>
                </div>
            </div>
        );
    }
}

export default Home;