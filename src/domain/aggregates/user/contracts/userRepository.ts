import IRepository from "../../../seed/repository";
import User from "../user";

interface IUserRepository extends IRepository<User> {
    findByUsernameAsync: (username: string) => Promise<User | null>
}

export default IUserRepository;