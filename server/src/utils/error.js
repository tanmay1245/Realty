const errorHandler = (statusCode, messgae) => {
    const error = new Error();
    error.statusCode = statusCode;
    error.message = messgae;
    return error;
}

// todo THIS FUNTION IS NOT USED ANYWHERE,we can use it at the places where error is not thrown 
// This function basically throws a manually created error, so that it can be pass to express error middleware
export default errorHandler;