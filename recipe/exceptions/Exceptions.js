class FirebaseAuthError extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}

class FirebaseLoginError extends FirebaseAuthError {
    constructor(username, query) {
        super(`Invalid username: ${username} and password.`);
        this.data = { username, query };
    }
}

class FirebaseSignupError extends FirebaseAuthError {
    constructor(signupIssue, query) {
        super(`Signup invalid: ${signupIssue}.`);
        this.data = { signupIssue, query };
    }
}

class ReadingError extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}

class TextReadError extends ReadingError {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}

class CredentialsError extends ReadingError {
    constructor(message) {
        super(`Invalid GOOGLE_ACCOUNT_CREDENTIALS: ${message}`);
    }
}

class WordError extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}

class ProcessingError extends WordError {
    constructor(food, query) {
        super(`Error processing food word: ${food}.`);
        this.data = { food, query };
    }
}

module.exports = { 
    FirebaseLoginError, 
    FirebaseSignupError,
    TextReadError, 
    CredentialsError, 
    ProcessingError 
};