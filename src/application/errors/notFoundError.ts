class NotFoundError extends Error {
    kind: "NotFound" = "NotFound";

    constructor(message: string) {
        super(message);
    }
}

export default NotFoundError;