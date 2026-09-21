
import './App.css'
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'; 

import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import 'katex/dist/katex.min.css'; 

import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import {coy} from 'react-syntax-highlighter/dist/esm/styles/prism'
import { Sandpack } from "@codesandbox/sandpack-react"

// import 'github-markdown-css'
import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { Table } from "@chakra-ui/react"

import remarkFrontmatter from 'remark-frontmatter'

const customComponents = {
  // Wrap the table in a responsive div container to prevent mobile layout breaking
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
  h5: ({ node, ...props }) => (
    <h5 className="dork" {...props} />
  ),
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
        remarkPlugins={[
          [remarkGfm, {singleTilde: false}], // references 
          remarkMath, // Render Latex 
          remarkFrontmatter // hide frontmatter 
        ]}
        rehypePlugins={[rehypeKatex]} 
        components={{ ...customComponents,
          code(props) {
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
      </div> </ChakraProvider>
  );
}
