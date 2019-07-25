function FirebaseError(message) {
    const error = new Error(message);
    return error;
  }
  
FirebaseError.prototype = Object.create(Error.prototype);

module.exports = FirebaseError;