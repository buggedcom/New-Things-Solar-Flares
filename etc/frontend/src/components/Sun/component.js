import React, {Component} from 'react';

import Face from "../Face/component";
import Rays from "../Rays/component";

import './styles.scss';
import PropTypes from "prop-types";

/**
 * Renders the sun in all its glory.
 * 
 * @author Oliver Lillie
 */
export default class Sun extends Component {
    static propTypes = {
        /** Tells the sun has spots currently on it or not. **/
        hasSpots: PropTypes.bool.isRequired,
    };

    /**
     * Returns the class name for the sun depending on whether or not the props
     * say that the sun currently has spots on it.
     *
     * @author Oliver Lillie
     * @return {string}
     */
    getDerivedClassName() {
        let classes = ['sun'];

        if(this.props.hasSpots === true) {
            classes.push('sun--has-spots');
        }

        return classes.join(' ');
    }

    render() {
        return (<>
            <div className={this.getDerivedClassName()}>
                <div className="points"/>
                <div className="core"/>
                <Face/>
                <Rays/>
            </div>
            <div className="sun sun--shadow"/>
        </>);
    }
}

