import { useState } from "react";
import "./App.css";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import Back from "./component/Back.jsx";
import Answerload from "./component/Answerload.jsx";
function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  let[load,setload]=useState();
  let[answerload,setanswerload]=useState(false);
  const [generatingAnswer, setGeneratingAnswer] = useState(false);

  async function generateAnswer(e) {
    setGeneratingAnswer(true);
    e.preventDefault();
    setAnswer('');
    setanswerload(true);
    try {
      const response = await axios({
        url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyCAUg4wgIp3Cge15wK_MbE3-Z5ZyTZbbRg`, // Replace with your actual API key
        method: "post",
        data: {
          contents: [{ parts: [{ text: question }] }],
        },
      });
      setanswerload(false);
      setAnswer(
        response["data"]["candidates"][0]["content"]["parts"][0]["text"]
      );
    } catch (error) {
      console.log(error);
      setanswerload(false);
      setAnswer("Sorry - Something went wrong. Please try again!");
    }

    setGeneratingAnswer(false);
  }

  return (
    <center >{answerload && <Answerload/>} 
    <div className="bg-gradient-to-r from-blue-50 to-blue-100 h-screen p-3 flex flex-col justify-center items-center">
    <form
      onSubmit={generateAnswer}
      className="w-full md:w-2/3 lg:w-1/2 xl:w-1/3 text-center rounded-lg shadow-lg bg-white py-6 px-4 transition-all duration-500 transform hover:scale-105"
    >


      
      <textarea
        required
        className="border border-gray-300 rounded w-full my-2 min-h-fit p-3 transition-all duration-300 focus:border-blue-400 focus:shadow-lg"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Ask anything"
      ></textarea>
      <div
        type="submit"
        
      >
       <Back/>
      </div>
    </form>
    <div className="answer">
    <div className="w-full md:w-2/3 lg:w-1/2 xl:w-1/3 text-center rounded-lg bg-white my-4 shadow-lg transition-all duration-500 transform hover:scale-105">
      <ReactMarkdown className="p-4">{answer}</ReactMarkdown>
    </div></div>
  </div>
    </center>
  );
}

export default App;
