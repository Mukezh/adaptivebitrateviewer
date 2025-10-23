import { Button } from "../components/button";

function Homepage() {
  return (
    <div className="flex flex-col items-center min-h-screen  bg-[#F2EFCE]">
      <div className="font-family-justme text-4xl h-1/3 pt-4 ">
        Adaptive BitRate Viewer
      </div>
      <div className="pt-64 flex gap-48 h-2/3">
        <Button type="upload" props="Click here to upload videos" />
        <Button type="view" props="Click here to view all uploaded videos" />
      </div>
    </div>
  );
}

export default Homepage;
