class MisssingParamError extends Error {
    kind: "FailedAuthentication" = "FailedAuthentication";
    param: string;

    constructor(param: string) {
        super("Mandatory parameter missing.");
        this.param = param;
    }
}

export default MisssingParamError;