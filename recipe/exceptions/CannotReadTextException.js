function CannotReadTextException(message) {
    const error = new Error(message);
    return error;
  }
  
  CannotReadTextException.prototype = Object.create(Error.prototype);