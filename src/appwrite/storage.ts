import { Client, ID, Storage } from "appwrite";
import conf from "../conf/conf";

class StorageService {
    client: Client = new Client();
    storage: Storage;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);

        this.storage = new Storage(this.client);
    }

    async uploadFile(file: File) {
        try {
            return await this.storage.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            );
        } catch (error) {
            console.log("Appwrite storage :: uploadFile :: error", error);
            return false;
        }
    }

    async deleteFile(fileId: string) {
        try {
            await this.storage.deleteFile(
                conf.appwriteBucketId,
                fileId
            );
            return true;
        } catch (error) {
            console.log("Appwrite storage :: deleteFile :: error", error);
            return false;
        }
    }

    getFilePreview(fileId: string) {
        return this.storage.getFilePreview(
            conf.appwriteBucketId,
            fileId
        );
    }
}

const storageService = new StorageService();

export default storageService;