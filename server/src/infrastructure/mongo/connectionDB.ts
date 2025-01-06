import mongoose from "mongoose"

interface Options {
    dbName?: string,
    url: string
}

export class ConnectMongoDb {


    static async connectDB(options: Options) {

        const { url, dbName } = options

        try {
            await mongoose.connect(url, { dbName })
        } catch (error) {
            console.log(`Failed to establish connection to database ${error}`);

        }
    }

}