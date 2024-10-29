class UpsertError extends Error {
    kind: "Upsert" = "Upsert";

    constructor(message: string) {
        super(message);
    }
}

export default UpsertError;