class FirebaseError{

    constructor(message){
        throw new Error(message);
    }

}

module.exports = { FirebaseError };