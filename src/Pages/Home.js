import React, {Component} from 'react';
import gsap from "gsap";
// or get other plugins:


import Background from "../components/BackGround";
//icons
import searchLocation from '../assets/icon/Icon material-my-location.svg'
import mapMarker from '../assets/icon/Icon awesome-map-marker.png'

// don't forget to register plugins

class Home extends Component {

    constructor(props) {
        super(props);
        this.current= null;
        this.temp= null;

        this.state = {


        }
    }
    componentDidMount() {

        gsap.from(this.current, {
            y: 60,
            duration: 1,
            scale:1.1,
            ease: "power3.inOut"
        });
        gsap.from(this.temp, {
            x: 60,
            duration: 1,
            scale:1.1,
            ease: "power3.inOut"
        });

        }


    render() {
        return (
            <div className="body">

              <Background/>
              <div className="overlay">

              </div>

                <div className="content">
                    <div className="wrap">
                    <div className="search">
<div>
    Search..
</div>

                        <div className="icon">
<img src={searchLocation} alt="search location"/>
                        </div>
                    </div>

                    <div className="currentCity">
                       <div className="city">Lagos, Nigeria</div>
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
                    </div>
                    <div className="currentFull" ref={el => (this.current = el)}>

                    </div>
                </div>
            </div>
        );
    }
}

export default Home;