import { Client, Account, ID } from "appwrite";
import conf from "../conf/conf";

class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);

        this.account = new Account(this.client);
    }

    async createAccount({ email, password, name }: { email: string, password: string, name: string; }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);

            if (userAccount) {
                return this.login({ email, password });
            } else {
                return userAccount;
            }
        } catch (error) {
            console.log(error);
        }
    }

    async login({ email, password }: { email: string, password: string; }) {
        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            console.log(error);
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log(error);
        }

        return null;
    }

    async logout() {
        try {
            return await this.account.deleteSession('current');
        } catch (error) {
            console.log(error);
        }
    }
}

const authService = new AuthService();

export default authService;