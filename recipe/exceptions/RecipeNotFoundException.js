function RecipeNotFoundException(message) {
    const error = new Error(message);
    return error;
  }
  
  RecipeNotFoundException.prototype = Object.create(Error.prototype);