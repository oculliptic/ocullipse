
import './App.css'
import { useEffect, useState } from "react";

// react-markdown utility 
import ReactMarkdown from "react-markdown";
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'; 

// LaTeX Formatting 
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import 'katex/dist/katex.min.css'; 

// Code Block 
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import {coy} from 'react-syntax-highlighter/dist/esm/styles/prism'
import { Sandpack } from "@codesandbox/sandpack-react"

// Table Handling 
import { ChakraProvider, defaultSystem, Collapsible, Stack } from '@chakra-ui/react';
import { Table } from "@chakra-ui/react"
import remarkFrontmatter from 'remark-frontmatter'

// Collapsible H6 
import { LuChevronRight } from "react-icons/lu"
import { visit } from 'unist-util-visit'; 


// ////////////////////////////////////////////////////////////////
import {toString} from 'hast-util-to-string'
import Slugger from 'github-slugger'
const emptyOptions = {}
function provideHeadingID(options){ // IN: configure settings 
  const settings = options || emptyOptions 
  // console.log(options) OUTPUT: undefined 
  return function (tree) {
    const slugger = new Slugger()
    visit(
      tree, 
      'element', 
      function (node) {
        if(
         !node.properties.id && 
          node.tagName == 'h1' || 
          node.tagName == 'h2' || 
          node.tagName == 'h3' || 
          node.tagName == 'h4' || 
          node.tagName == 'h5' || 
          node.tagName == 'h6' ) {
            const value = toString(node)
            const id = slugger.slug(value)
            // console.log(id)
            node.properties.id = id
        }
      }
    )
  }
}
// ////////////////////////////////////////////////////////////////
// INSPIRED BY: https://github.com/remarkjs/remark-math/blob/main/packages/rehype-katex/lib/index.js 
import {fromHtmlIsomorphic} from 'hast-util-from-html-isomorphic'
import {toText} from 'hast-util-to-text'
import katex from 'katex'
import {SKIP, visitParents} from 'unist-util-visit-parents'
function collapsibleH6(options){ // IN: configure settings 
  const settings = options || emptyOptions 
  return function (tree) {
    let startId = -1
    let endId = -1 
    visitParents(tree, 'element', function (element, parents) { 
      const parent = parents[parents.length - 1]; 
      if(!parent) {return} 
        // LOOPING OCCURS IN VISITPARENTS function 
        // looping occurs for EVERY ELEMENT  
        if(element.tagName === 'h6'){
          startId = (parent.children.indexOf(element))
          console.log("START ID: " + startId)
        } else if( startId !== -1 && 
          (element.tagName === 'h1' || 
          element.tagName === 'h2' || 
          element.tagName === 'h3' || 
          element.tagName === 'h4' || 
          element.tagName === 'h5' || 
          element.tagName === 'h6' )){
          endId = (parent.children.indexOf(element))-1
          console.log("END ID: " + endId)
        }
        if(startId != -1 && endId != -1){
          console.log(startId, endId)
          const deleteCount = endId - startId;
          const chillArr = parent.children.splice(startId, deleteCount) 
          const divSubtree = {
            type: "element", 
            tagName: "div", 
            properties: {id: "divSubtree-H6"},
            children: chillArr 
          }
          parent.children[startId] = divSubtree
          console.log(parent.children[startId])
          console.log(tree)
          startId = -1 
          endId = -1 
        }
      }
    )
  }
}
// ////////////////////////////////////////////////////////////////
const customComponents = {
  // INPUT: AST things 
  table: ({ children, ...props }) => (
    <Table.Root size="md" variant="line" interactive {...props}>
      {children}
    </Table.Root>
  ),
  thead: ({ children, ...props }) => (
    <Table.Header {...props}>{children}</Table.Header>
  ),
  tbody: ({ children, ...props }) => (
    <Table.Body {...props}>{children}</Table.Body>
  ),
  tr: ({ children, ...props }) => (
    <Table.Row {...props}>{children}</Table.Row>
  ),
  th: ({ children, ...props }) => (
    <Table.ColumnHeader {...props}>{children}</Table.ColumnHeader>
  ),
  td: ({ children, ...props }) => (
    <Table.Cell {...props}>{children}</Table.Cell>
  ),
  div: ({ node, children, ...props }) => {
    if (props.id === "divSubtree-H6"){
      const DropDownTitle = children?.[0];
      const CollapsibleBody = children?.slice(1);
      return (
        <Collapsible.Root defaultOpen margin="2" width = "500">
          <Collapsible.Trigger 
            display="flex"
            gap="2"
            alignItems="center">
            <Collapsible.Indicator 
            transition="transform 0.2s"
            _open={{ transform: "rotate(90deg)" }}>
              <LuChevronRight />
            </Collapsible.Indicator>
            {DropDownTitle}
          </Collapsible.Trigger>
          <Collapsible.Content>
            <Stack padding="4" borderWidth="1px" borderRadius={"10px"}>
              {CollapsibleBody}
            </Stack>
          </Collapsible.Content>
        </Collapsible.Root>
      )
    }
    return <div {...props}>{children}</div>
    },
  p: ({ node, ...props }) => (
    <p className="dork1" {...props} />
  ),
};

export default function App() {
  const [markdownContent, setMarkdownContent] = useState("");
  const markdown = 'This ~is not~ strikethrough, but ~~this is~~!'
  const markdown2 = `The lift coefficient ($C_L$) is a dimensionless coefficient.`

  useEffect(() => {
    // Fetches from the public folder at runtime
    fetch("./Proofs.md")
      .then((response) => response.text())
      .then((text) => setMarkdownContent(text))
      .catch((error) => console.error("Error fetching markdown:", error));
  }, []);

  return ( <ChakraProvider value={defaultSystem}>
      <div className="markdown-container">
        <ReactMarkdown  
        children={markdownContent} 
        // mdAST --> 
        remarkPlugins={[
          [remarkGfm, {singleTilde: false}], // references 
          remarkMath, // place Latex into code block 
          remarkFrontmatter, // hide frontmatter 
        ]}
        // hAST --> 
        rehypePlugins={[ 
          rehypeKatex, // render latex into text 
          provideHeadingID, 
          collapsibleH6, 
          // rehypeKatex2
        ]} 
        // ------------------------------
        // Components 
        components={{
          // Paragraph: 'span', 
          ...customComponents,        // Customize other tags 
          code(props) {               // CODE 
            const {children, className, node, ...rest} = props
            const match = /language-(\w+)/.exec(className || '')
            return match ? (
              <>{(match == "python") ? (
                <Sandpack
                  theme="dark"
                  files={{
                    "implementation": String(children).replace(/\n$/, '')
                  }}
                  options={{
                    showNavigator: true,
                    showLineNumbers: true,
                    showTabs: true,
                    closableTabs: true,
                  }} 
                />
              ):(
                <SyntaxHighlighter
                  {...rest}
                  PreTag="div"
                  children={String(children).replace(/\n$/, '')}
                  language={match[1]}
                  style={coy}
                />
            )}</>
            ) : (
              <code {...rest} className={className}>
                {children}
              </code>
            )
          }
        }}
        />
      </div> 
    </ChakraProvider>
  );
}
