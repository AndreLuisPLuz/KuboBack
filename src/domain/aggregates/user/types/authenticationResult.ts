type SucceededAuth = {
    kind: "succeeded";
    userId: string;
};

type FailedAuth = {
    kind: "failed";
    reasons: string[];
}

type AuthenticationResult =
    | SucceededAuth
    | FailedAuth;

export {
    SucceededAuth,
    FailedAuth,
    AuthenticationResult
};