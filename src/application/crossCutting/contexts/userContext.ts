type ContextData = {
    userId: string;
};

class UserContext {
    private data?: ContextData;

    public get userId() { return this.data?.userId || null };

    public fill = (data: ContextData) => {
        this.data = data;
    }
}

export default UserContext;