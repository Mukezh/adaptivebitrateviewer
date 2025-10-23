import { useDropzone } from "react-dropzone";

export const UpdatePage = () => {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();
  const files = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  return (
    <div className="flex gap-10">
      <div className=" p-4 rounded-lg border-slate-400 border">
        <div className="pb-4" {...getRootProps()}>
          <p>Drag 'n' drop some files here</p>
          <button className="w-64">
            <input {...getInputProps()} /> click here to upload
          </button>
        </div>
      </div>
      <aside className="border p-4 rounded-lg">
        <h4>Files</h4>
        <ul>{files}</ul>
      </aside>
    </div>
  );
};
