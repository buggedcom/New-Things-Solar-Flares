import fetch from 'node-fetch';
import UnsettableProperty from "./UnsettableProperty";
import ValidationError from "./ValidationError";

const cache = {};
const currentYearCurrentDayCache = {};

/**
 * Tiny little feed consumption class and stores the pupulated consumer object
 * in a small persistant cache to prevent multiple requests to the NASA api when
 * the data doesn't change from year to year.
 *
 * However additional precautions are taken when querying the current year so
 * that the cache is invalidated every time the day changes.
 *
 * @author Oliver Lillie
 */
class DonkiFLRConsumer  {

    /**
     * Static singleton function for consuming the requested years api and
     * smart caching it depending on the year requested. If the year is the
     * current year then it is still cached, but the cache is wiped on a daily
     * basis.
     *
     * @param {number} year The year of to request from the api.
     * @return {Promise<any>}
     */
    static consume(year) {
        if(DonkiFLRConsumer.validateYear(year) === false) {
            throw new ValidationError(`Year "${year}" is not a valid year.`);
        }

        return new Promise((resolve, reject) => {
            const currentDate = new Date();
            const requestIsCurrentYear = year === (currentDate.getFullYear());
            const today = currentDate.toISOString().split('T')[0];

            // check to see if the data we want is currently in the static cache
            // to prevent needless requests to the api server.
            if(requestIsCurrentYear === true) {
                if(typeof currentYearCurrentDayCache.day !== 'undefined' && currentYearCurrentDayCache.day === today) {
                    return currentYearCurrentDayCache.cache;
                }
            } else if(typeof cache[year] !== 'undefined') {
                resolve(cache[year]);
                return;
            }

            // TODO handle errors in api.

            fetch(`https://api.nasa.gov/DONKI/FLR?startDate=${year}-01-01&endDate=${year}-12-31&api_key=Op7zgLDewhZDljsCmONTzmtBAjphWmSrjMTe0aSg`)
                .then((response) => response.json())
                .then(
                    (json) => {
                        const consumer = new DonkiFLRConsumer(json);

                        // save the cache differently depending on if we are
                        // saving the current year for the current day, or if
                        // it is a past year which can be cached forever.
                        if(requestIsCurrentYear === true) {
                            currentYearCurrentDayCache.day = today;
                            currentYearCurrentDayCache.cache = consumer;
                        } else {
                            cache[year] = consumer;
                        }

                        resolve(consumer);
                    },
                    (e) => reject(e)
                );
        });
    }

    /**
     * Validates the a given year is in the specific range of >= 1920 and
     * <= current year.
     *
     * @author Oliver Lillie
     * @param year
     * @return {boolean}
     */
    static validateYear(year) {
        if (year.length !== 4) {
            return false;
        }

        const current_year = (new Date()).getFullYear();
        if(year < 1920 || (year > current_year)) {
            return false;
        }

        return true;
    }

    /**
     * Assigns the json into the consumer and initialises the parse cache.
     *
     * @author Oliver Lillie
     * @param json
     */
    constructor(json) {
        this.json = json;
        this._parseCache = null;
    }

    /**
     * Parses the feed if it has not already been done. That parsed cache is
     * then stored in a private cache so that it doesn't have to be parsed
     * again.
     *
     * @author Oliver Lillie
     * @return {*}
     */
    parse() {
        if(this._parseCache !== null) {
            return this._parseCache;
        }

        const timeline = {};
        this.json.forEach(
            (flare) => {
                const date = new Date(flare.beginTime);
                const yyyymmdd = date.toISOString().split('T')[0];
                if(typeof timeline[yyyymmdd] === 'undefined') {
                    timeline[yyyymmdd] = [];
                }
                timeline[yyyymmdd].push({
                    id: flare.flrID,
                    date: yyyymmdd,
                    sourceLocation: flare.sourceLocation,
                    activeRegionNum: flare.activeRegionNum,
                    classType: flare.classType.substring(0, 1),
                });
            }
        );

        return this._parseCache = {
            timeline: timeline,
        };
    }

    /**
     * Shortcut method for DonkiFLRConsumer.parse().timeline.
     *
     * @author Oliver Lillie
     * @return {Object[]}
     */
    get timeline() {
        return this.parse().timeline;
    }

    set timeline(value) {
        throw new UnsettableProperty('You cannot set "timeline". It is a read only property.');
    }

    /**
     * Handles encoding of the record object for insertion into the JsonPayload
     * object.
     *
     * @author Oliver Lillie
     * @return {Object}
     */
    encodeForJson() {
        return {
            timeline: this.timeline,
        };
    }

}

module.exports = DonkiFLRConsumer;