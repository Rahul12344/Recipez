function NoIngredientsException(message) {
    const error = new Error(message);
    return error;
  }
  
  NoIngredientsException.prototype = Object.create(Error.prototype);