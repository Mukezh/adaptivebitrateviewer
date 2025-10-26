import { useState } from "react";
import { useDropzone } from "react-dropzone";

export const Card = () => {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();
  const [title, setTitle] = useState("");

  return (
    <div className="flex items-center justify-center h-screen w-screen bg-[#F2EFCE]">
      <form className="h-128 w-lg py-2 px-4 border rounded-lg flex flex-col gap-4 items-center justify-center bg-[#F8E9B9]">
        <label className="text-3xl font-serif">Upload videos</label>
        <div className="flex justify-center pb-4 text-xl font-family-justme"></div>
        <div>
          <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 rounded-lg "
            placeholder="Enter title for your video"
            value={title}
          />
        </div>
        <div className="p-4 border rounded-lg " {...getRootProps()}>
          <button className="w-64">
            <input {...getInputProps()} /> Click here to upload files
          </button>
        </div>
      </form>
    </div>
  );
};
