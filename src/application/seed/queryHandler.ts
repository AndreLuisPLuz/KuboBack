import IQuery from "./query";

interface IQueryHandler<TFeedback, TQuery extends IQuery<any, TFeedback>> {
    handleAsync(query: TQuery): Promise<TFeedback>;
    solveDependencies: () => void;
}

export default IQueryHandler;