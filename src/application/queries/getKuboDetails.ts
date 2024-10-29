import IQuery from "../seed/query";
import { v4 as uuid } from "uuid";
import { CosmeticDetails } from "./getCosmeticDetails";

type GetKuboDetailsProps = {
    userId: string;
}

type KuboDetails = {
    id: string;
    nickname: string;
    color: string;
    health: number;
    hunger: number;
    happiness: number;
    hat: CosmeticDetails;
    eyes: CosmeticDetails;
};

class GetKuboDetails implements IQuery<GetKuboDetailsProps, KuboDetails> {
    queryId: string;
    props: GetKuboDetailsProps;
    concreteType: "GetKuboDetails" = "GetKuboDetails";

    get userId() { return this.props.userId };

    public constructor(props: GetKuboDetailsProps) {
        this.queryId = uuid();
        this.props = props;
    }
}

export type { KuboDetails };
export default GetKuboDetails;