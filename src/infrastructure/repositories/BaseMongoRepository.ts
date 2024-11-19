import { HydratedDocument, Model } from "mongoose";
import { match } from "ts-pattern";
import IRepository, { Criterion, PaginationInfo, PaginationOptions } from "../../domain/seed/repository";
import Entity from "../../domain/seed/entity";
import Queue from "@esm2cjs/yocto-queue";

abstract class BaseMongoRepository<TInterface, TEntity extends Entity<any>>
        implements IRepository<TEntity> {
    protected model: Model<TInterface>;

    constructor(model: Model<TInterface>) {
        this.model = model;
    }

    deleteAsync = async (id: string): Promise<boolean> => {
        const result = await this.model.deleteOne({ _id: id }).exec();
        return result.deletedCount != 0;
    };
    
    existsAsync = async (id: string): Promise<boolean> => {
        const document = await this.model.exists({ _id: id });
        return (document != null);
    };
    
    async existsByCriteriaAsync<TInterface>(criteria: Criterion<TInterface>[]): Promise<boolean> {
        const filter = this.buildFilter(criteria);

        const document = await this.model.exists(filter);

        return (document != null);
    }

    findAsync = async (id: string): Promise<any> => {
        const document = await this.model.findById(id).exec();
        
        if (document == null)
            return null;
        
        const entity = this.loadFromDocument(document);
        return entity;
    };

    async findOneAsync<TInterface>(criteria: Criterion<TInterface, keyof TInterface>[]): Promise<TEntity | null> {
        const filter = this.buildFilter(criteria);

        const document = await this.model.findOne(filter).exec();

        if (document == null)
            return null;

        const entity = this.loadFromDocument(document);
        return entity;
    }

    async findManyAsync<TInterface>(
            criteria: Criterion<TInterface, keyof TInterface>[],
            pagination?: PaginationOptions
    )       : Promise<{ data: TEntity[] } & PaginationInfo> {
        const filter = this.buildFilter(criteria);

        let query = this.model.find(filter);
        let paginationInfo: PaginationInfo = { items: 0 };

        if (pagination)
            paginationInfo = await this.applyPagination(query, filter, pagination);

        const documents = await query.exec();
        const entities = documents.map(d => this.loadFromDocument(d));

        return {
            data: entities,
            ...paginationInfo
        };
    };

    upsertAsync = async (entity: TEntity): Promise<any> => {
        const entityExists = (await this.model.exists({ _id: entity._id }) != null);

        const document = entityExists
            ? await this.model.findOneAndUpdate({ _id: entity._id }, entity).exec()
            : await this.model.create(this.parse(entity));
        
        if (document == null)
            return null;

        const savedEntity = this.loadFromDocument(document);
        return savedEntity;
    };

    protected abstract parse: (entity: TEntity) => TInterface;

    protected abstract loadFromDocument: (document: HydratedDocument<TInterface>) => TEntity;

    private async applyPagination(
            query: any,
            filter: Record<string, any>,
            pagination: PaginationOptions
    )       : Promise<PaginationInfo> {
        const totalItems = await this.model.countDocuments(filter).exec();
    
        const totalPages = Math.ceil(totalItems / pagination.take);
        const currentPage = Math.floor(pagination.offset / pagination.take) + 1;
    
        query.skip(pagination.offset).limit(pagination.take);
    
        return {
            currentPage,
            totalPages,
            items: totalItems,
        };
    }

    private buildFilter<TInterface>(
            criteria: Criterion<TInterface, keyof TInterface>[]
    )       : Record<string, any> {
        const criteriaQueue: Queue<Criterion<any, keyof any>> = new Queue();
        const filter: Record<string, any> = {};

        criteria.forEach(c => criteriaQueue.enqueue(c));

        while (criteriaQueue.size != 0) {
            const criterion = criteriaQueue.dequeue()!;

            if (typeof criterion.value !== "object") {
                filter[criterion.key as string] = this.buildExpression(criterion);
                continue;
            }

            const keys = Object.keys(criterion.value);

            keys.forEach(k => criteriaQueue.enqueue({
                key: String(criterion.key) + "." + k,
                value: criterion.value[k]
            }));
        }

        return filter
    };

    private buildExpression(
            criterion: Criterion<any, keyof any>
    )       : any {
        return match(criterion.operator)
            .with("eq", () => criterion.value)
            .with("ne", () => { $ne: criterion.value })
            .with("gt", () => { $gt: criterion.value })
            .with("gte", () => { $gte: criterion.value })
            .with("lt", () => { $lt: criterion.value })
            .with("lte", () => { $lte: criterion.value })
            .otherwise(() => criterion.value);
    }
}

export default BaseMongoRepository;