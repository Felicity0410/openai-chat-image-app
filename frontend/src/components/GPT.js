import React from "react";
import axios from "axios";
import Loading from "./Loading";

export default function GPT() {
  const [input, setInput] = React.useState("");
  const [endpoint, setEndpoint] = React.useState("gpt");
  const [output, setOutput] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post(`http://localhost:4000/${endpoint}`, { prompt: input })
      .then((resp) => {
        if (resp.data.startsWith("http")) {
          setOutput(
            <img className="mt-4" src={resp.data} alt="DALL-E Output" />
          );
        } else {
          setOutput(<p>{resp.data}</p>);
        }
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <div className="gpt p-4 text-center">
      <h2 className="text-2xl font-bold">OPENAI</h2>
      <div className="flex flex-1 flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-30 xl:px-60">
      <form className="mt-4 flex flex-col" onSubmit={handleSubmit}>
        <input
          className="p-2 border border-gay-400 rounded"
          type="text"
          placeholder="Please type here ... "
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <select
          className="p-2 border border-gay-400 rounded mt-2"
          value={endpoint}
          onChange={(e) => setEndpoint(e.target.value)}
        >
          <option value="gpt">GPT</option>
          <option value="dalle">Dalle</option>
        </select>
        <button
          className="p-2 bg-blue-500 text-white rounded mt-2 "
          type="submit"
        >
          Submit
        </button>
      </form>
    
      <div className="mt-4 flex justify-center border rounded">
        {loading ? <Loading /> : output}
      </div>
      </div>
    </div>
  );
}
