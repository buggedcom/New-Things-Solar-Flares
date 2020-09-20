import React from 'react';

import './styles.scss';

/**
 * Clouds. Not 100% sure about these, but have left them in anyway.
 *
 * @author Oliver Lillie
 * @return {*}
 * @constructor
 */
export default function Sky() {
    const clouds = [...Array(10).keys()].map((index) => {
        return (
            <div key={index + 1} className={'cloud--' + (index + 1)}>
                <div className="cloud"/>
            </div>
        );
    });

    return (<>
         <div className="sky">
             {clouds}
         </div>
    </>);
}

