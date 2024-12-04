type ContextData = {
    userId: string;
};

class UserContext {
    private data?: ContextData;

    constructor(data: ContextData | undefined = undefined) {
        this.data = data;
    }

    public get userId() { return this.data?.userId || null };

    public fill = (data: ContextData) => {
        this.data = data;
    }
}

export default UserContext;