import useWindowSize from "../../hooks/windowSize";
import useCursorLocation from "../../hooks/mouseData";
import CodeSnippet from "../codeSnippet";
/*


Functions, so many formats, why? 
    - https://www.reddit.com/r/learnjavascript/comments/1fw9xe3/somebody_please_explain_why_there_are_so_many/



*/

import windowSizeCode from "../../hooks/windowSize.ts?raw";
import mouseDataCode from "../../hooks/mouseData.ts?raw";


function SnippetWindowSizeHook() { 
    const { width , height } = useWindowSize();            // WINDOW SIZE HOOK 
    const { x , y } = useCursorLocation();            // WINDOW SIZE HOOK 
 

    return (
    <>
        <div>
            <h4>Window Size Hook: </h4>
            {width} x {height}
            <CodeSnippet 
                files = {{"/windowSize.ts": windowSizeCode}} 
                compBowl = {false} /> 
        </div>
        <div>
            <h4>Cursor Location Hook: </h4>
            {x} x {y}
            <CodeSnippet 
                files = {{"/mouseData.ts": mouseDataCode}}
                compBowl = {false} /> 
        
        </div>
    </>)
}


export default SnippetWindowSizeHook









