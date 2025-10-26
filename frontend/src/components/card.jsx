import { useState } from "react";
import { useEffect } from "react";
import { useDropzone } from "react-dropzone";

export const Card = () => {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();
  const [popup, setPopup] = useState(false);

  useEffect(() => {
    const upload = async () => {
      let form = new FormData();
      if (acceptedFiles.length > 0) {
        acceptedFiles.forEach((e) => {
          form.append("video", e);
        });

        const response = await fetch("http://localhost:5000/upload", {
          method: "POST",
          body: form,
        });
        if (response.ok) {
          setPopup(true);
        }
        console.log(response);
      }
    };
    upload();
  }, [acceptedFiles]);

  useEffect(() => {
    if (popup) {
      const timer = setTimeout(() => {
        setPopup(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [popup]);

  return (
    <div className="flex items-center justify-center h-screen w-screen gap-8 bg-[#F2EFCE]">
      <form className="h-96 w-lg py-2 px-4 border rounded-lg flex flex-col gap-4 items-center justify-center bg-[#F8E9B9]">
        <label className="text-3xl font-serif">Upload videos</label>
        <div className="flex justify-center pb-4 text-xl font-family-justme"></div>
        <div
          className="p-4 border rounded-lg hover:cursor-pointer bg-[#E6C691]"
          {...getRootProps()}
        >
          <input {...getInputProps()} /> Click here to upload files
        </div>
        {/* <button
          type="submit"
          className="border rounded-3xl py-2 px-6 bg-[#E6C691] hover:cursor-pointer"
        >
          Submit
        </button>*/}
      </form>
      {/* <div>
        {acceptedFiles.map(
          (e) => (form.append("video1", e.name), (<p key={e.key}>{e.name}</p>)),
        )}
      </div>*/}
      {popup && (
        <div className="fixed bottom-4 right-4 bg-green-400 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-fade-in">
          <span> File uploaded successfully!</span>
        </div>
      )}
    </div>
  );
};
