class InvalidHeaderError extends Error {
    constructor(message: string) {
        super(message);
    }
}

export default InvalidHeaderError;