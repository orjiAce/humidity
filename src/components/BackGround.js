import React, {Component} from 'react';
import gsap from "gsap";

class Background extends Component {
    constructor(props) {
        super(props);
        this.Background= null;

        this.state = {


        }
    }

    componentDidMount() {

gsap.to(this.Background, {
    duration: 1,
    opacity:1,
    ease: "power3.inOut"
})

    gsap.from(this.Background, {
        duration: 1,
       skewY:5,
        transformOrigin:"right top"
    })

    }

    render() {


        return (
            <div className="background" ref={node => (this.Background = node)}>

            </div>
        );
    };
}

export default Background;
