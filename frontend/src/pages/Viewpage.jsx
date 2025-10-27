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
  return <div>{data[0]}</div>;
};
