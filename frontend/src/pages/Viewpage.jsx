// import { useEffect, useState } from "react";

// export const ViewPage = () => {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     const fetchdata = async () => {
//       const response = await fetch("http://localhost:5000/getVideo");
//       const result = response.json();
//       setData(Array.isArray(result) ? result.video : [result.video]);
//     };
//     fetchdata();
//   }, []);

//   console.log(data);
//   return <div>{data}</div>;
// };
