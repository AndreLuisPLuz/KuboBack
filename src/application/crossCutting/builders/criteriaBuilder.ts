import { Criterion } from "../../../domain/seed/repository";

class CriteriaBuilder<TEntity> {
    private criteria: Criterion<TEntity>[];

    constructor() {
        this.criteria = [];
    }

    tryAdd = (
            key: keyof TEntity,
            value: TEntity[keyof TEntity] | undefined,
            operator?: "eq" | "ne" | "gt" | "gte" | "lt" | "lte",
    ):      CriteriaBuilder<TEntity> => {
        if (value) {
            this.criteria.push({
                key, value, operator
            })
        }

        return this;
    }

    build = (): Criterion<TEntity>[] => {
        return this.criteria;
    }
}

export default CriteriaBuilder;