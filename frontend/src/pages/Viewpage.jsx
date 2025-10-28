import { useEffect, useState } from "react";

export const ViewPage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchdata = async () => {
      const response = await fetch("http://localhost:5000/getVideo");
      const result = await response.json();
      console.log(Object(result));
      setData(Array.isArray(result) ? result.allKeys : [result.allKeys]);
    };
    fetchdata();
  }, []);

  console.log(data);
  return (
    <div className="h-screen flex flex-col justify-center items-center  bg-[#F2EFCE]">
      {data.length === 0 ? (
        <div className="text-3xl">loading...</div>
      ) : (
        <div>
          <h1 className="text-3xl pb-8 font-serif">Uploaded files</h1>
          <div className="font-serif ">
            {data[0].map((e, i) => (
              <div className="hover:underline" key={i}>
                {i + 1 + ". " + e}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
