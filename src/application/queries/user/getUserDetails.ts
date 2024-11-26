import IQuery from "../../seed/query";
import { v4 as uuid } from "uuid";
import { UserDto } from "./dtos";
import { OutResponse } from "../../seed/responses";

type GetUserDetailsProps = {
    id: string;
};

type UserDetails = OutResponse<UserDto>;

class GetUserDetails implements IQuery<GetUserDetailsProps, UserDetails> {
    queryId: string;
    props: GetUserDetailsProps;
    concreteType: "GetUserDetails" = "GetUserDetails";

    get id() { return this.props.id };

    public constructor(props: GetUserDetailsProps) {
        this.queryId = uuid();
        this.props = props;
    }
}

export type { UserDetails };
export default GetUserDetails;