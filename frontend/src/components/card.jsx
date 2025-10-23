import { useDropzone } from "react-dropzone";

export const Card = () => {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

  return (
    <>
      <form className="h-128 w-lg py-2 px-4 border rounded-lg flex flex-col bg-[#F8E9B9]">
        <div className="flex justify-center pb-4 text-xl font-family-justme">
          <label>Upload videos</label>
        </div>
        <label> Video title </label>
        <input type="text" className="border p-2 rounded-lg w-64" />
        <label>Upload Content</label>
        <div className="pb-4 border rounded-lg w-64" {...getRootProps()}>
          <p>Drag 'n' drop some files here</p>
          <button className="w-64">
            <input {...getInputProps()} /> click here to upload
          </button>
        </div>
      </form>
    </>
  );
};
