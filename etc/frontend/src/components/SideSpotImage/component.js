import React, {Component} from 'react';
import PropTypes from "prop-types";

import A from './a.svg';
import B from './b.svg';
import C from './c.svg';
import M from './m.svg';
import X from './x.svg';

const spots = { A, B, C, M, X };

/**
 * The sub "spots" (flares) that are attached to the side of the suns face and
 * then disappears in an explosion. There are 5 different spot icons depending
 * on the class (size) of the flair.
 *
 * Note, that whilst an approximate mapping of positions of the flairs on the
 * sun, all the flairs are pushed to the edges of the sun for appearances sake.
 *
 * @author Oliver Lillie
 */
export default class SideSpotImage extends Component {
    img = React.createRef();

    static propTypes = {
        /** The flare object containing details about the flare. **/
        flare: PropTypes.shape({
            sourceLocation: PropTypes.number.isRequired,
            date: PropTypes.string.isRequired,
        }).isRequired,
        /** The type of the flare that this spot represents. **/
        classType: PropTypes.oneOf(['A', 'B', 'C', 'M', 'X']).isRequired,
        /** This is the number of days away from the spot exploding. **/
        daysAwayFromBangBang: PropTypes.number.isRequired,
        /** This is the event handler buggle function for when the spot should
            explode. **/
        onBangBang: PropTypes.func.isRequired
    };

    /**
     * Determines the degrees to a given position from a center of 0,0.
     *
     * @author Oliver Lillie
     * @param {{x:number, y:number}} position
     * @return {number} The degress the position related to.
     */
    getDegressFromCenter(position) {
        return Math.atan2(position.y, position.x) * 180 / Math.PI;
    }

    /**
     * Gets the position of the spot in relation to where it would be roughly
     * on the edge of the sun.
     *
     * @author Oliver Lillie
     * @param degrees
     * @return {{x: number, y: number}}
     */
    getPositionAtEdgeOfSun(degrees) {
        return {
            x: 135 * Math.cos(degrees * Math.PI / 180),
            y: 135 * Math.sin(degrees * Math.PI / 180),
        };
    }

    render() {
        const {
            flare,
            daysAwayFromBangBang,
            classType
        } = this.props;

        // if we are one if more days away from the flair going bang, then don't
        // render anything just bubble up through the props that now the spot
        // wants to go bang. It has to be done, 1 day before because on day 0
        // the spot is removed from the dom.
        if(daysAwayFromBangBang <= 1) {
            if(this.img.current !== null) {
                this.props.onBangBang(this.img.current);
            }
            return null;
        }

        // pull out the rough coords for positioning the spot into a rough
        // approx position of where it would be on the edge of the sun.
        const matches = flare.sourceLocation.match(/(S|N)([0-9]{1,2})(E|W)([0-9]{1,2})/);
        const flarePosition = {
            x: (matches[3] === 'W' ? -1 : 1) * matches[4],
            y: (matches[1] === 'N' ? -1 : 1) * matches[2],
        };
        const degrees = this.getDegressFromCenter(flarePosition);
        const degreesModulus = Math.round((degrees + 360 + 90) % 360);
        const flareEdgePosition = this.getPositionAtEdgeOfSun(degrees);

        const style = {
            top: `${flareEdgePosition.y}px`,
            left: `${flareEdgePosition.x}px`,
        };

        // calculate the class if the spot is fading in or not.
        const outClass = daysAwayFromBangBang <= 10 ? 'side-spot--in' : 'side-spot--out';

        return (
            // eslint-disable-next-line
            <img ref={this.img}
                 className={`side-spot side-spot--${classType} ${outClass} side-spot--rotate-${degreesModulus}`}
                 data-classtype={classType}
                 src={spots[classType]}
                 style={style}
                 data-date={flare.date}
            />
        );
    }
}

