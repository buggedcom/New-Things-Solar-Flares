import React, {Component} from 'react';

import Sun from "../Sun/component";
import Sky from "../Sky/component";
import SideSpot from "../SideSpot/component";

import './styles.scss';

/**
 * A basic component container for the two main parts of this app.
 * Nothing special happens here.
 *
 * @author Oliver Lillie
 */
export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hasSpots:false
        };
    }

    /**
     * Handles the on day update tick callback from the SideSpot component that
     * is triggered when the date being shown is updated.
     *
     * @param {boolean} hasSpots Determines if the current date being show has
     *  "spots" ie flares on the face of the sun.
     */
    handleDayTick(hasSpots) {
        this.setState({
            hasSpots
        });
    }

    render() {
        return (<>

            <Sun hasSpots={this.state.hasSpots} />
            <SideSpot startingYear={2016}
                      onDayTick={this.handleDayTick.bind(this)}
            />
            <Sky/>

        </>);
    }
}

