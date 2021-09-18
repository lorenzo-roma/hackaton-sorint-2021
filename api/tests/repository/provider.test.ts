import CacheRepository from "../../repository/cache-repository";
import RepositoryProvider from "../../repository/provider";
import Repository from "../../repository/user-repository-interface";

describe("Provide repository instances", () => {
    test("Provide valid repository", () => {
        const repository: Repository = RepositoryProvider.getRepository();
        expect(repository).toBeTruthy();
        expect(repository).toBeInstanceOf(CacheRepository);
    });

    test("Provide always the same instance of repository", () => {
        const repository: Repository = RepositoryProvider.getRepository();
        const secondRepository: Repository = RepositoryProvider.getRepository();
        expect(repository).toBe(secondRepository);
    });
});
