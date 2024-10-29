import Entity from "../../seed/entity";

type LanguageProps = {
    name: string;
};

class Language extends Entity<LanguageProps> {
    private constructor(
            props: LanguageProps,
            id: string | null = null
    ) {
        super(props, id);
    }

    public static createNew = (props: LanguageProps): Language => {
        return new Language(props);
    };

    public static load = (props: LanguageProps, id: string): Language => {
        return new Language(props, id);
    };
}

export default Language;