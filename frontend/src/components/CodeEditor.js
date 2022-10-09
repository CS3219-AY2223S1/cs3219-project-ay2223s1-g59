import { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { sublime } from "@uiw/codemirror-theme-sublime";

const CodeEditor = ({ roomId, socket }) => {
  const [code, setCode] = useState("");

  socket.on("RECEIVE", (payload) => {
    console.log("Received" + payload.code);
    setCode(payload.code);
  });

  function updateCode(roomId, code) {
    console.log("Change happening", code);
    setCode(code);
    socket.emit("CHANGE", { roomId: roomId, code: code });
  }

  return (
    <div>
      <CodeMirror
        className="container"
        value={code}
        height="50em"
        onChange={(code) => updateCode(roomId, code)}
        extensions={[javascript({ jsx: true })]}
        theme={sublime}
      />
    </div>
  );
};
export default CodeEditor;
