import IQuery, { QueryResponse } from "../../seed/query";
import { v4 as uuid } from "uuid";
import { CosmeticDto } from "./dtos";

type GetCosmeticDetailsProps = {
    id: string;
};

type CosmeticDetails = QueryResponse<CosmeticDto>;

class GetCosmeticDetails implements IQuery<GetCosmeticDetailsProps, CosmeticDetails> {
    queryId: string;
    props: GetCosmeticDetailsProps;
    concreteType: "GetCosmeticDetails" = "GetCosmeticDetails";

    get id() { return this.props.id };

    public constructor(props: GetCosmeticDetailsProps) {
        this.queryId = uuid();
        this.props = props;
    }
}

export type { CosmeticDetails };
export default GetCosmeticDetails;