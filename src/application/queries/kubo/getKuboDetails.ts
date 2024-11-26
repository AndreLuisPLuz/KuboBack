import IQuery from "../../seed/query";
import { v4 as uuid } from "uuid";
import { KuboDto } from "./dtos";
import { OutResponse } from "../../seed/responses";

type GetKuboDetailsProps = {
    userId: string;
}

type KuboDetails = OutResponse<KuboDto>;

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