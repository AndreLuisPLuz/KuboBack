import IQuery from "../seed/query";
import { v4 as uuid } from "uuid";
import { CosmeticDetails } from "./getCosmeticDetails";
import { PaginationInfo } from "../../domain/seed/repository";

type GetManyCosmeticsProps = {
    page: number;
    size: number;
    type?: "Hat" | "Eyes";
};

type ManyCosmetics = {
    cosmetics: Omit<CosmeticDetails, "imagePath">[];
} & PaginationInfo;

class GetManyCosmetics implements IQuery<GetManyCosmeticsProps, ManyCosmetics> {
    queryId: string;
    props: GetManyCosmeticsProps;
    concreteType: "GetManyCosmetics" = "GetManyCosmetics";

    get page() { return this.props.page };
    get size() { return this.props.size };
    get type() { return this.props.type };

    public constructor(props: GetManyCosmeticsProps) {
        this.queryId = uuid();
        this.props = props;
    }
}

export type { ManyCosmetics };
export default GetManyCosmetics;