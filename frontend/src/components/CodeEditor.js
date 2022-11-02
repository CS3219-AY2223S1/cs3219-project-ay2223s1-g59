import { useState } from "react"
import CodeMirror from "@uiw/react-codemirror"
import { python } from "@codemirror/lang-python"
import { sublime } from "@uiw/codemirror-theme-sublime"

const CodeEditor = ({ room, socket }) => {
    const [code, setCode] = useState({
        value: "print('hello world')",
        isReceived: false,
    })

    socket.on("receive", (payload) => {
        console.log(`Received code: ${payload.code}`)
        setCode({ value: payload.code, isReceived: true })
    })

    function updateCode(room, value) {
        console.log(`Code changed to: ${value}`)
        if (code.isReceived !== true) {
            socket.emit("change", { room: room, code: value })
        }
        setCode({ value: value, isReceived: false })
    }

    return (
        <div>
            <CodeMirror
                className="container"
                value={code.value}
                height="50vh"
                maxHeight="50vh"
                width="50vw"
                maxWidth="50vw"
                onChange={(value) => updateCode(roomId, value)}
                extensions={[python()]}
                theme={sublime}
            />
        </div>
    )
}

export default CodeEditor