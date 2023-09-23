'use client'
import React from 'react'
import { useDropzone } from "react-dropzone";
import { Inbox } from "lucide-react";
import { uploadToS3 } from '@/lib/s3';

const FileUpload = () => {

    const { getRootProps, getInputProps } = useDropzone({
        accept: {"application/pdf" : [".pdf"]},
        maxFiles: 1,
        onDrop: async (acceptedFiles) => {
            console.log(acceptedFiles);
            const file = acceptedFiles[0];
            if(file.size > 10 * 1024 * 1024){
                console.log("File Too large")
                alert("File Too large,Please upload another file")
                return;
            }

            try{
                const data = await uploadToS3(file);
                console.log("meow",data)

                if(!data?.file_key || !data?.file_name){
                    console.log("Something Went Wrong")
                    return;
                }
            }
            catch(error){
                console.log(error);
                return;
            }
        }
    });
    return (
        <div className='p-2 bg-white rounded-xl'>
            <div {...getRootProps({
                className:
                    "border-dashed border-2 rounded-xl cursor-pointer bg-gray-50 py-8 flex justify-center items-center flex-col",
            })}>
                <input {...getInputProps()} />
                <>
                    <Inbox className='w-10 h-10 text-blue-500' />
                    <p className='mt-2 text-sm text-slate-400'>Drag PDF Here</p>
                </>
            </div>
        </div>
    )
}

export default FileUpload