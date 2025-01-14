// No need to create collection for user as it is handdled by appwrite
import { Client, Account, ID } from "appwrite";
import config  from "../config/config";

export class Authservice{
    client = new Client();
    account;
    constructor(){// Current user configration
        this.client
        .setEndpoint(config.appwriteUrl)
        .setProject(config.appwriteProjectId);

        this.account = new Account(this.client);
    }

    async createAccount({email, password, name}){
        try{
            const result = await this.account.create(
                ID.unique(), 
                email,
                password,
                name
            );
            if(result){
                return await login(result);
            }
            else{
                return null;
            }
        }catch(err){
            throw err;
        }
    }

    async login({email, password}){
        try{
            const result = await this.account.createEmailPasswordSession(
                email,
                password 
            );
            if(result){
                return result;
            }else{
                return null;
            }
        }catch(err){
            console.log(err);
        }
    }

    async logout(){
        try{
            return await this.account.deleteSession(
                'current'
            );
        }catch(err){
            console.log(err);
            // throw err;
        }
    }

    async getUser(){
        try{
            const result = await this.account.get();
            if(result)return result;
            return null;
        }catch(err){
            console.log(err);
            return null;
        }
    }

}

const authService = new Authservice;

export default authService;