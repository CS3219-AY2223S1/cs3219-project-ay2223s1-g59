import { useState } from "react"
import CodeMirror from "@uiw/react-codemirror"
//import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python"
import { sublime } from "@uiw/codemirror-theme-sublime"

const CodeEditor = ({ roomId, socket }) => {
    const [code, setCode] = useState({
        value: "print('hello world')",
        isReceived: false,
    })

    socket.on("RECEIVE", (payload) => {
        console.log(`Received code: ${payload.code}`)
        setCode({ value: payload.code, isReceived: true })
    })

    function updateCode(roomId, value) {
        console.log(`Code changed to: ${value}`)
        if (code.isReceived !== true) {
            socket.emit("CHANGE", { roomId: roomId, code: value })
        }
        setCode({ value: value, isReceived: false })
    }

    return (
        <div>
            <CodeMirror
                className="container"
                value={code.value}
                height="50em"
                onChange={(value) => updateCode(roomId, value)}
                extensions={[python()]}
                theme={sublime}
            />
        </div>
    )
}
export default CodeEditor
