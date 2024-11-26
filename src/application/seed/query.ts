import { PaginationInfo } from "../../domain/seed/repository";

interface IQuery<TProps, TFeedBack> {
    queryId: string;
    props: TProps;
}

type QueryResponse<TFeedBack> = {
    data: TFeedBack,
    message: string;
};

type QueryPaginatedResponse<TFeedBack> = {
    data: TFeedBack[];
    message: string;
} & PaginationInfo;

export type { QueryResponse, QueryPaginatedResponse };
export default IQuery;