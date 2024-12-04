import IQuery from "../../seed/query";
import { v4 as uuid } from "uuid";
import { KuboDto } from "./dtos";
import { OutResponse } from "../../seed/responses";

type KuboDetails = OutResponse<KuboDto>;

class GetKuboDetails implements IQuery<void, KuboDetails> {
    queryId: string;
    props: undefined;
    concreteType: "GetKuboDetails" = "GetKuboDetails";

    public constructor() {
        this.queryId = uuid();
    }
}

export type { KuboDetails };
export default GetKuboDetails;