import { Client, Databases, Query } from "appwrite";
import conf from "../conf/conf";

interface Post {
    title: string;
    slug: string;
    content: string;
    featuredImage: string;
    status: string;
    userId: string;
}

class DatabasesService {
    client: Client = new Client();
    databases: Databases;

    constructor() {
        this.client = new Client()
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);

        this.databases = new Databases(this.client);
    }

    async createPost({ title, slug, content, featuredImage, status, userId }: Post) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                { title, content, featuredImage, status, userId });
        } catch (error) {
            console.log("Appwrite databases :: createPost :: error", error);
        }
    }

    async updatePost(slug: string, { title, content, featuredImage, status }: Post) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                { title, content, featuredImage, status }
            );
        } catch (error) {
            console.log("Appwrite databases :: updatePost :: error", error);
        }
    }

    async deletePost(slug: string) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            );
            return true;
        } catch (error) {
            console.log("Appwrite databases :: deletePost :: error", error);
            return false;
        }
    }

    async getPost(slug: string) {
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            );
        } catch (error) {
            console.log("Appwrite databases :: getPost :: error", error);
            return false;
        }
    }

    async listPost() {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                [
                    Query.equal("status", "active")
                ]
            );
        } catch (error) {
            console.log("Appwrite databases :: listPost :: error", error);
            return false;
        }
    }
}

const databasesService = new DatabasesService();

export default databasesService;