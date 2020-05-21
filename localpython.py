#import ask_sdk_core
from ask_sdk_core.skill_builder import SkillBuilder
from ask_sdk_core.dispatch_components import AbstractRequestHandler, AbstractExceptionHandler
from ask_sdk_core.utils import is_request_type, is_intent_name
sb = SkillBuilder()

class ChineseAnimalHandler(AbstractRequestHandler):
    def can_handle(self, handler_input):
        return is_intent_name("ChineseAnimal")(handler_input)

    def handle(self, handler_input):
        slotValue = handler_input.request_envelope.request.intent.slots['year'].value
        speechText = "This is my custom intent handler for " + slotValue;
        handler_input.response_builder.speak(speech_text).set_should_end_session(False)
        return handler_input.response_builder.response
    
class ErrorHandler(AbstractExceptionHandler):
    def can_handle(self, handler_input, exception):
        return True

    def handle(self, handler_input, exception):
        speechText = 'Sorry, your skill encountered an error';
        print(exception)
        handler_input.response_builder.speak(speechText).set_should_end_session(False)
        return handler_input.response_builder.response

class CancelIntentHandler(AbstractRequestHandler):
    def can_handle(self, handler_input):
        return is_intent_name("AMAZON.CancelIntent")(handler_input)

    def handle(self, handler_input):
        speechText = 'Cancel intent handler'
        handler_input.response_builder.speak(speech_text).set_should_end_session(True) # set to true for Cancel or Stop intents etc
        return handler_input.response_builder.response
        
class HelpIntentHandler(AbstractRequestHandler):
    def can_handle(self, handler_input):
        return is_intent_name("AMAZON.HelpIntent")(handler_input)

    def handle(self, handler_input):
        speechText = 'Help intent handler'
        handler_input.response_builder.speak(speech_text).set_should_end_session(True) # set to true for Cancel or Stop intents etc
        return handler_input.response_builder.response

class StopIntentHandler(AbstractRequestHandler):
    def can_handle(self, handler_input):
        return is_intent_name("AMAZON.StopIntent")(handler_input)

    def handle(self, handler_input):
        speechText = 'Stop intent handler'
        handler_input.response_builder.speak(speech_text).set_should_end_session(True) # set to true for Cancel or Stop intents etc
        return handler_input.response_builder.response

class NavigateHomeIntentHandler(AbstractRequestHandler):
    def can_handle(self, handler_input):
        return is_intent_name("AMAZON.NavigateHomeIntent")(handler_input)

    def handle(self, handler_input):
        speechText = 'Navigate intent handler'
        handler_input.response_builder.speak(speech_text).set_should_end_session(True) # set to true for Cancel or Stop intents etc
        return handler_input.response_builder.response

class FallbackIntentHandler(AbstractRequestHandler):
    def can_handle(self, handler_input):
        return is_intent_name("AMAZON.FallbackIntent")(handler_input)

    def handle(self, handler_input):
        speechText = 'Fallback intent handler'
        handler_input.response_builder.speak(speech_text).set_should_end_session(True) # set to true for Cancel or Stop intents etc
        return handler_input.response_builder.response

class LaunchRequestHandler(AbstractRequestHandler):
    def can_handle(self, handler_input):
        return is_request_type("LaunchRequest")(handler_input)
    
    def handle(self, handler_input):
        speechText = 'Welcome to my Alexa Python app';
        handler_input.response_builder.speak(speechText).set_should_end_session(False)
        return handler_input.response_builder.response

class SessionEndedRequestHandler(AbstractRequestHandler):
    def can_handle(self, handler_input):
        return is_request_type("SessionEndedRequest")(handler_input)

    def handle(self, handler_input):
        # any cleanup logic goes here
        return handler_input.response_builder.response

sb.add_exception_handler(ErrorHandler())
#delete undefined built-in intent handlers
sb.add_request_handler(CancelIntentHandler())
sb.add_request_handler(HelpIntentHandler())
sb.add_request_handler(StopIntentHandler())
sb.add_request_handler(NavigateHomeIntentHandler())
sb.add_request_handler(FallbackIntentHandler())
sb.add_request_handler(LaunchRequestHandler())
sb.add_request_handler(SessionEndedRequestHandler())
#add custom request handlers
sb.add_request_handler(ChineseAnimalHandler())

def handler(event, context):
    return sb.lambda_handler()(event, context)

