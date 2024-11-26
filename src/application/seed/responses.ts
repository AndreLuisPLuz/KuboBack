import { PaginationInfo } from "../../domain/seed/repository";

type OutResponse<TFeedBack> = {
    data: TFeedBack,
    message: string;
};

type OutPaginatedResponse<TFeedBack> = {
    data: TFeedBack[];
    message: string;
} & PaginationInfo;

export type {
    OutResponse,
    OutPaginatedResponse,
};