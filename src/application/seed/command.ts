interface ICommand<TProps> {
    commandId: string;
    props: TProps;
}

export default ICommand;