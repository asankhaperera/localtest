let Alexa = require('ask-sdk');
let skill;


exports.handler = async function (event, context) {
    //console.log('REQUEST ' + JSON.stringify(event));
    if (!skill) {
        skill = Alexa.SkillBuilders.custom()
            .addErrorHandlers(ErrorHandler)
            .addRequestHandlers(
            // delete undefined built-in intent handlers
            CancelIntentHandler,
            HelpIntentHandler,
            StopIntentHandler,
            NavigateHomeIntentHandler,
            FallbackIntentHandler,
            LaunchRequestHandler,
            SessionEndedRequestHandler,
            // add custom Intent handlers
            ChineseAnimalHandler
            ).create();
    }

    const response = await skill.invoke(event, context);
    //console.log('RESPONSE :' + JSON.stringify(response));
    return response;
};

const ChineseAnimalHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'ChineseAnimal';
    },
    handle(handlerInput) {
        // invoke custom logic of the handler
        const slotValue = Alexa.getSlotValue(handlerInput.requestEnvelope, 'year');
        const speechText = 'This is my custom intent handler for ' + slotValue;
        return handlerInput.responseBuilder
            .speak(speechText)
            .withShouldEndSession(false)
            .getResponse();
    }
};

const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        console.log('Session ended with reason: ' + JSON.stringify(handlerInput.requestEnvelope.request.reason));
        //any cleanup logic goes here
        return handlerInput.responseBuilder.getResponse();
    }
};

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speechText = 'Welcome to my Alexa app Z';
        return handlerInput.responseBuilder
            .speak(speechText)
            .withShouldEndSession(false)
            .getResponse();
    }
};

const FallbackIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.FallbackIntent';
    },
    handle(handlerInput) {
        // invoke logic of the builtin handler
        const speechText = 'This is a builtin intent handler';
        return handlerInput.responseBuilder
            .speak(speechText)
            .withShouldEndSession(false)    // set to true for Cancel or Stop intents etc
            .getResponse();
    }
};

const NavigateHomeIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.NavigateHomeIntent';
    },
    handle(handlerInput) {
        // invoke logic of the builtin handler
        const speechText = 'This is a builtin intent handler';
        return handlerInput.responseBuilder
            .speak(speechText)
            .withShouldEndSession(false)    // set to true for Cancel or Stop intents etc
            .getResponse();
    }
};

const StopIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent';
    },
    handle(handlerInput) {
        // invoke logic of the builtin handler
        const speechText = 'This is a builtin intent handler';
        return handlerInput.responseBuilder
            .speak(speechText)
            .withShouldEndSession(true)    // set to true for Cancel or Stop intents etc
            .getResponse();
    }
};

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        // invoke logic of the builtin handler
        const speechText = 'This is a builtin intent handler';
        return handlerInput.responseBuilder
            .speak(speechText)
            .withShouldEndSession(false)    // set to true for Cancel or Stop intents etc
            .getResponse();
    }
};

const CancelIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent';
    },
    handle(handlerInput) {
        // invoke logic of the builtin handler
        const speechText = 'This is a builtin intent handler';
        return handlerInput.responseBuilder
            .speak(speechText)
            .withShouldEndSession(true)    // set to true for Cancel or Stop intents etc
            .getResponse();
    }
};

const ErrorHandler = {
    canHandle(handlerInput) {
        return true;
    },
    handle(handlerInput, error) {
        console.log('Error handled: ' + JSON.stringify(error.message));
        // console.log('Original Request was: ' + JSON.stringify(handlerInput.requestEnvelope.request, null, 2));

        const speechText = 'Sorry, your skill encountered an error Z';
        return handlerInput.responseBuilder
            .speak(speechText)
            .withShouldEndSession(false)
            .getResponse();
    }
};
