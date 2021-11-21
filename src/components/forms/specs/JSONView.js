import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-terminal";

import 'ace-builds/webpack-resolver';

const JSONView = (props) => {

    const handleChange = (value) => {
        if (props.onChange) {
            props.onChange(value)
        }
    }

    return (
        <>
        <AceEditor
            focus
            style={{ width: "100%", maxHeight: 300, marginBottom: 20 }}
            mode="json"
            theme="terminal"
            name="editor"
            showPrintMargin={true}
            showGutter={true}
            highlightActiveLine
            setOptions={{
                showLineNumbers: true,
                tabSize: 4
            }}
            editorProps={{ $blockScrolling: true }}
            onChange={handleChange}
        />
        </>
    )
}

export default JSONView;