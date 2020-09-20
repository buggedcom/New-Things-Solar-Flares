import React from 'react';

import './styles.scss';

/**
 * A very basic "cutesy" face for the sun.
 *
 * @author Oliver Lillie
 * @return {*}
 * @constructor
 */
export default function Face() {
    return (
        <div className="face">
            <div className="eyes">
                <div className="eye eye--left"/>
                <div className="eye eye--right"/>
            </div>
            <div className="mouth"/>
            <div className="cheeks">
                <div className="blush blush--left"/>
                <div className="blush blush--right"/>
            </div>
        </div>
    );
}

