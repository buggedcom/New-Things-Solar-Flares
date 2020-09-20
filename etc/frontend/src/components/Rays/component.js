import React from 'react';

import './styles.scss';

/**
 * Background suns rays rotating very very slowly behind the sub and across the
 * entire page.
 *
 * @author Oliver Lillie
 * @return {*}
 * @constructor
 */
export default function Rays() {
    return (
        <div className="ray-box-wrapper">
            <div className="ray-box">
                <div className="ray ray1"/>
                <div className="ray ray2"/>
                <div className="ray ray3"/>
                <div className="ray ray4"/>
                <div className="ray ray5"/>
                <div className="ray ray6"/>
                <div className="ray ray7"/>
                <div className="ray ray8"/>
                <div className="ray ray9"/>
                <div className="ray ray10"/>
            </div>
        </div>
    );
}

