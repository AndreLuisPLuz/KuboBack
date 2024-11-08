class InvalidCommandError extends Error {
    kind: "InvalidCommand" = "InvalidCommand";

    constructor(message: string) {
        super(message);
    }
}

export default InvalidCommandError;