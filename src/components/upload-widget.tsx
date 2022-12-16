import { Button } from "@mantine/core";
import React, { useEffect, useRef } from "react";

const cloudName = "djq5o9jxq";
const uploadPreset = "xebiqicu";
const folder = "blue_forest";

interface IUploadWidgetProp {
  setImgUrl: (v: string) => void;
}

const CloudinaryUploadWidget: React.FC<IUploadWidgetProp> = ({ setImgUrl }) => {
  const cloudinaryRef = useRef<any>();
  const widgetRef = useRef<any>();

  // const myWidget = window.
  useEffect(() => {
    cloudinaryRef.current = (window as any).cloudinary;
    if (cloudinaryRef.current) {
      widgetRef.current = cloudinaryRef.current.createUploadWidget(
        {
          cloudName: cloudName,
          uploadPreset: uploadPreset,
          folder: folder, //upload files to the specified folder
          // cropping: true, //add a cropping steps
          // showAdvancedOptions: true,  //add advanced options (public_id and tag)
          // sources: [ "local", "url"], // restrict the upload sources to URL and local files
          // multiple: false,  //restrict upload to a single file
          // tags: ["users", "profile"], //add the given tags to the uploaded files
          // context: {alt: "user_uploaded"}, //add the given context data to the uploaded files
          // clientAllowedFormats: ["images"], //restrict uploading to image files only
          // maxImageFileSize: 2000000,  //restrict file size to less than 2MB
          // maxImageWidth: 2000, //Scales the image down to a width of 2000 pixels before uploading
          // theme: "purple", //change to a purple theme
        },
        (
          error: any,
          result: { event: string; info: { secure_url: string } }
        ) => {
          if (!error && result && result.event === "success") {
            console.log("Done! Here is the image info: ", result.info);
            const imageURL = result.info.secure_url;
            setImgUrl(imageURL);
            // document
            //   ?.getElementById("uploadedimage")!
            //   .setAttribute("src", result.info.secure_url);
          }
        }
      );
    }
  }, []);

  return (
    <Button
      id='upload_widget'
      className='cloudinary-button'
      onClick={() => widgetRef.current.open()}
    >
      Upload
    </Button>
  );
};

export default CloudinaryUploadWidget;
