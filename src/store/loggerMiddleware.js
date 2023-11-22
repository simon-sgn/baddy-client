// Define a Redux middleware for logging actions and states, used in development
const loggerMiddleware = (store) => (next) => (action) => {
    // If the action does not have a type, pass it to the next middleware in line
    if (!action.type) {
        return next(action);
    }

    // Log the type of the action - styled with blue color and bold font
    console.log("%c type: ", "color: blue; font-weight: bold", action.type);
    // Log the payload of the action - styled with green color and bold font
    console.log("%c payload: ", "color: green; font-weight: bold", action.payload);
    // Log the current state of the store before the action is dispatched - styled with orange color and bold font
    console.log("%c currentState: ", "color: orange; font-weight: bold", store.getState());

    // Dispatch the action to the next middleware or reducer in line
    next(action);

    // Log the state of the store after the action is dispatched - styled with red color and bold font
    console.log("%c next state: ", "color: red; font-weight: bold", store.getState());
};

export default loggerMiddleware;
