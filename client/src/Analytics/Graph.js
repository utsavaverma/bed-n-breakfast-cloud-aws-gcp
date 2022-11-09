import React from "react";

const Graph = () => {
  // const [graph, setGraph] = useState("");
  // useEffect(() => {
  //   callApi();
  // }, []);

  // const callApi = async () => {
  //   const resp = await axios.get(
  //     `https://datastudio.google.com/reporting/3c4b52d1-b179-438f-9ee4-fc95a0bc7b0d`
  //   );
  //   console.log("resp", resp);
  //   setGraph(resp);
  // };

  // return <iframe src="https://www.youtube.com/embed/cWDJoK8zw58" />;
  return (
    <>
      <div>
        <a
          className="def"
          target="_blank"
          href="https://datastudio.google.com/reporting/3c4b52d1-b179-438f-9ee4-fc95a0bc7b0d"
        >
          Analytics
        </a>
      </div>
    </>
  );
};

export default Graph;
