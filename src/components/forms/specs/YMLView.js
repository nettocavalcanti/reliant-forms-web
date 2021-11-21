import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-yaml";
import "ace-builds/src-noconflict/theme-terminal";

const YMLView = (props) => {
    const {yml} = props;

    return (
        <>
        <AceEditor
            focus
            style={{ width: "100%", maxHeight: 300, marginBottom: 20 }}
            mode="yaml"
            theme="terminal"
            name="editor"
            value={yml}
            showPrintMargin={true}
            showGutter={true}
            highlightActiveLine
            readOnly={true}
            setOptions={{
                showLineNumbers: true,
                tabSize: 2
            }}
            editorProps={{ $blockScrolling: true }}
        />
        </>
    )
}

export default YMLView;