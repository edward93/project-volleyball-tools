import { createListenerMiddleware } from "@reduxjs/toolkit";
import { createNewGameListener } from "utils/listeners/storePersistenceListener";

// create listener middleware
const listenerMiddleware = createListenerMiddleware();

// start listeners
listenerMiddleware.startListening(createNewGameListener);

// add other listeners if there are any
// listenerMiddleware.startListening(playerUpdateListener);

export default listenerMiddleware;
