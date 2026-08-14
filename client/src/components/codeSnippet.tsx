


import {
  SandpackProvider,
  SandpackCodeEditor,
  useSandpack,
  SandpackPreview
} from "@codesandbox/sandpack-react";
import './CodeSnippet.css'; 

function CodeSnippet({ files, compBowl = false}) {  
    function ActiveFileDisplay() {
        const { sandpack } = useSandpack();
        return (
            <h1 className="botch-job-mini002 " >
                Current file: {sandpack.activeFile.toString()}</h1>
        );
    }

    return (<> 
        <div>
            <SandpackProvider
                    template="react"
                    files={ files }
                    options={{
                        visibleFiles: Object.keys(files).filter((file) => file !== "/App.js"),
                        activeFile: Object.keys(files).find((file) => file !== "/App.js"),
                    }} 
            >
                <ActiveFileDisplay />
                <div className="botch-job001 ">
                    <SandpackCodeEditor className="botch-job001 "/>
                    {compBowl ?? <SandpackPreview />} 
                </div>
            </SandpackProvider>
        </div>
    </>)
}


export default CodeSnippet







/*
- https://www.joshwcomeau.com/react/next-level-playground/
- https://www.npmjs.com/package/@codesandbox/sandpack-client 
- https://www.npmjs.com/package/@codesandbox/sandpack-react 

- https://sandpack.codesandbox.io/docs/advanced-usage/components

// https://www.joshwcomeau.com/email/007/ 
*/ 












