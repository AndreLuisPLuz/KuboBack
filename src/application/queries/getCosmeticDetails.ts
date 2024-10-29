import IQuery from "../seed/query";
import { v4 as uuid } from "uuid";

type GetCosmeticDetailsProps = {
    id: string;
};

type CosmeticDetails = {
    id: string;
    name: string;
    imagePath: string;
    type: "Hat" | "Eyes";
};

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