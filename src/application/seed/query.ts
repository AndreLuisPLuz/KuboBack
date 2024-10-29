interface IQuery<TProps, TFeedBack> {
    queryId: string;
    props: TProps;
}

export default IQuery;