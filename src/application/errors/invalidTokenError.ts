class InvalidTokenError extends Error {
    constructor(message: string) {
        super(message);
    }
}

export default InvalidTokenError;