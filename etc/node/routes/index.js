import express from 'express';

import DonkiFLRConsumer from '../classes/DonkiFLRConsumer';
import JsonPayload from '../classes/JsonPayload';
import JsonPayloadError from '../classes/JsonPayloadError';
import ValidationError from "../classes/ValidationError";

const router = express.Router();

/**
 * Processes and returns a years worth of api data.
 *
 * @param GET.year
 * @author Oliver Lillie
 */
router.get(
    '/spots',
    function(request, response, next) {
        if(!request.query.year) {
            response.status(422);
            response.json(
                (new JsonPayloadError('Please specify GET.year.', 'validation-error')).toObject()
            );
            return;
        }

        try {
            DonkiFLRConsumer.consume(request.query.year).then(
                (consumer) => {
                    response.json(
                        (new JsonPayload(consumer)).toObject()
                    );
                }
            );
        }
        catch (Error) {
            if(error instanceof ValidationError === true) {
                response.status(422);
                response.json(
                    (new JsonPayloadError(error.message, 'validation-error')).toObject()
                );
                return;
            }

            throw error;
        }
    }
);

module.exports = router;
