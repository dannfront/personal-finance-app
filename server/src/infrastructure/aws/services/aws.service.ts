import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

interface Options {
    Key: string,
    Bucket: string,
    Body: any
}

export class AwsServices {

    private client: any

    constructor(
        private readonly accesKey: string,
        private readonly secreatKey: string,
        private readonly region: string
    ) {

        this.client = new S3Client({
            region: this.region,
            credentials: {
                accessKeyId: this.accesKey,
                secretAccessKey: this.secreatKey
            }
        })

    }


    async putObject(options: Options) {
        const command = new PutObjectCommand(options)
        await this.client.send(command)
    }

}