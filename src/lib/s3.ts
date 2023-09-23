import {PutObjectCommandOutput,S3} from "@aws-sdk/client-s3";
// import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
// import { v4 as uuidv4 } from "uuid";"

export async function uploadToS3(
    file : File
    ): Promise<{file_key : string; file_name : string}>{
    return new Promise((resolve,reject) => {
        try{
            const s3  = new S3({
                region: "ap-southeast-1",
                credentials: {
                    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID!,
                    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY !,
                },
            });

            const file_key  = "uploads/" + Date.now().toString() + file.name.replace(" ","-");

            const params = {
                Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME!,
                Key: file_key,
                Body: file,
            };

            s3.putObject(
                params,
                (err:any,data: PutObjectCommandOutput | undefined) => {
                    return resolve({file_key,file_name:file.name});
                }
            );

        }catch(error){
            reject(error);
        
        }
    });
}

export function getS3Url(file_key : string){
    return `https://${process.env.NEXT_PUBLIC_AWS_BUCKET_NAME}.s3.ap-southeast-1.amazonaws.com/${file_key}`;
}