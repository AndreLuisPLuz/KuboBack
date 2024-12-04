class NotAuthenticatedError extends Error {
    constructor(message: string) {
        super(message);
    }
}

export default NotAuthenticatedError;