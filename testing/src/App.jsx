
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
import { ChakraProvider, defaultSystem, Collapsible, Stack, useListStyles, List } from '@chakra-ui/react';
import { Table } from "@chakra-ui/react"
import remarkFrontmatter from 'remark-frontmatter'

// Collapsible H6 
import { LuChevronRight } from "react-icons/lu"
import { visit } from 'unist-util-visit'; 

// spacing? 
import remarkBreaks from 'remark-breaks'; 

// WikiLinks
import wikiLinkPlugin from 'remark-wiki-link' 

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
import {SKIP, visitParents} from 'unist-util-visit-parents'
import React from 'react';
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
          // console.log("START ID: " + startId)
        } else if( startId !== -1 && 
          (element.tagName === 'h1' || 
          element.tagName === 'h2' || 
          element.tagName === 'h3' || 
          element.tagName === 'h4' || 
          element.tagName === 'h5' || 
          element.tagName === 'h6' )){
          endId = (parent.children.indexOf(element))-1
          // console.log("END ID: " + endId)
        }
        console.log(tree)
        if(startId != -1 && endId != -1 && false){
          // console.log(startId, endId)
          const deleteCount = endId - startId;
          const chillArr = parent.children.splice(startId, deleteCount) 
          const divSubtree = {
            type: "element", 
            tagName: "div", 
            properties: {id: "divSubtree-H6"},
            children: chillArr 
          }
          parent.children[startId] = divSubtree
          // console.log(parent.children[startId])
          console.log(tree)
          startId = -1 
          endId = -1 
        }
      }
    )
  }
}
function collapsibleHnFail(options){ // IN: configure settings 
  const settings = options || emptyOptions 
  return function (tree) {
    console.log(tree)
    let startIdx = [-1,-1,-1,-1,-1,-1] // startIdx[0] is for H1, ... etc.
    let endIdx =   [-1,-1,-1,-1,-1,-1] // endIdx[0]   is for H1, ... etc.
    visitParents(tree, 'element', function (element, parents) { 
      const parent = parents[parents.length - 1]; 
      function makeDivCheck(hn){
        for(let i = 6; i > -1 ; i--){
          if((startIdx[i] !== -1) && (endIdx[i] >= startIdx[i])){
            // console.log(tree)
            const deleteCount = endIdx[i] - startIdx[i];
            const chillArr = parent.children.splice(startIdx[i], deleteCount) 
            const divSubtree = {
              type: "element", 
              tagName: "div", 
              properties: {id: "divSubtree-H6"}, // + (i+1)},
              children: chillArr 
            }
            console.log("DIV TREE BUILT WITH FOR H" + (i+1) + ":\n" + startIdx + "\n" + endIdx)
            const holder = startIdx[i]
            // startIdx[hn-1] = (parent.children.indexOf(element))
            // PLACE TREE 
            parent.children[holder] = divSubtree
            let j = (i-1)
            for(let j = (i-1); j > -1 ; j--){
              console.log(j)
              endIdx[j] = holder + 1
            }
            console.log(parent.children[holder].indexOf)
            console.log(parent.children[holder])
            startIdx[i] = -1
            endIdx[i] = -1
            console.log("AFTER SUBTREE BUILT\n" + startIdx + "\n" + endIdx)
            // return
          }
        }
      }
      if(!parent) {return} 
      switch(element.tagName){
        case "h6":
          // console.log("H6 read!\n" + startIdx + "\n" + endIdx)
          endIdx[5] = (parent.children.indexOf(element)-1)
          makeDivCheck()
          startIdx[5] = (parent.children.indexOf(element))
          console.log("H6 changes\n" + startIdx + "\n" + endIdx)
          break;
        case "h5":
          // console.log("H5 read!\n" + startIdx + "\n" + endIdx)
          endIdx[4] = (parent.children.indexOf(element)-1)
          endIdx[5] = (parent.children.indexOf(element)-1)
          makeDivCheck()
          startIdx[4] = (parent.children.indexOf(element))
          console.log("H5 changes\n" + startIdx + "\n" + endIdx)
          break
        case "h4":
          // console.log("H4 read!\n" + startIdx + "\n" + endIdx)
          console.log(parent.children.indexOf(element))
          endIdx[3] = (parent.children.indexOf(element)-1)
          endIdx[4] = (parent.children.indexOf(element)-1)
          endIdx[5] = (parent.children.indexOf(element)-1)
          makeDivCheck(4)
          startIdx[3] = (parent.children.indexOf(element))
          console.log(parent.children[9])
          console.log(parent.children[10])
          console.log(parent.children[11])
          console.log(parent.children[12])
          console.log(parent.children[13])
          console.log(parent.children[14])
          console.log(parent.children[15])
          console.log(parent.children[16])
          console.log(parent.children[17])
          console.log(parent.children[18])
          console.log("H4 changes\n" + startIdx + "\n" + endIdx)
          break;
        case "h3":
          // console.log("H3 read!\n" + startIdx + "\n" + endIdx)
          endIdx[2] = (parent.children.indexOf(element)-1)
          endIdx[3] = (parent.children.indexOf(element)-1)
          endIdx[4] = (parent.children.indexOf(element)-1)
          endIdx[5] = (parent.children.indexOf(element)-1)
          makeDivCheck()
          startIdx[2] = (parent.children.indexOf(element))
          console.log("H3 changes\n" + startIdx + "\n" + endIdx)
          break;
        case "h2":
          // console.log("H2 read!\n" + startIdx + "\n" + endIdx)
          endIdx[1] = (parent.children.indexOf(element)-1)
          endIdx[2] = (parent.children.indexOf(element)-1)
          endIdx[3] = (parent.children.indexOf(element)-1)
          endIdx[4] = (parent.children.indexOf(element)-1)
          endIdx[5] = (parent.children.indexOf(element)-1)
          makeDivCheck()
          startIdx[1] = (parent.children.indexOf(element))
          console.log("H2 changes\n" + startIdx + "\n" + endIdx)
          break;
        case "h1":
          // console.log("H1 read!\n" + startIdx + "\n" + endIdx)
          endIdx[0] = (parent.children.indexOf(element)-1)
          endIdx[1] = (parent.children.indexOf(element)-1)
          endIdx[2] = (parent.children.indexOf(element)-1)
          endIdx[3] = (parent.children.indexOf(element)-1)
          endIdx[4] = (parent.children.indexOf(element)-1)
          endIdx[5] = (parent.children.indexOf(element)-1)
          makeDivCheck()
          startIdx[0] = (parent.children.indexOf(element))
          console.log("H1 changes\n" + startIdx + "\n" + endIdx)
          break;
        default: 
          console.log("Reading ... " + parent.children.indexOf(element))
      }
    })
  }
}
function divByHeading(options){ // IN: configure settings 
  const settings = options || emptyOptions 
  return function (tree) {
    let startIdx = [-1,-1,-1,-1,-1,-1] // startIdx[0] is for H1, ... etc.
    let endIdx =   [-1,-1,-1,-1,-1,-1] // endIdx[0]   is for H1, ... etc.
    let newposi = -1

    function pp(tree){
      function makeDivCheck(hn){
        newposi = -1 
        for(let i = 5; i > -1 ; i--){
          if((startIdx[i] !== -1) && (endIdx[i] >= startIdx[i])){
            const deleteCount = endIdx[i] - startIdx[i] ;
            const holder = startIdx[i]
            console.log("about to change index: " + holder)
            console.log(tree.children[holder])
            const chillArr = tree.children.splice(startIdx[i], deleteCount) 
            console.log(tree.children[holder])
            const divSubtree = {
              type: "element", 
              tagName: "div", 
              properties: {id: "divSubtree-H" + (i+1)},
              children: chillArr 
            }
            console.log("MAKE A DIV for H" + (i+1) + " with: \n" + startIdx + "\n" + endIdx)
            // PLACE TREE 
            tree.children.splice(holder, 0, divSubtree)
            // tree.children[holder] = divSubtree
            for(let j = (i-1); j > (hn-1) ; j--){
              // make 
              if(startIdx[j] !== -1) endIdx[j] = holder + 1
            }
            newposi = holder + 1
            startIdx[i] = -1
            endIdx[i] = -1
            console.log(holder)
            console.log(tree.children[holder])
            console.log(tree.children[holder+1])
            console.log(tree.children[holder+2])
            console.log(tree.children[holder+3])
            console.log("current newposi value: " + newposi)
            console.log("AFTER SUBTREE H" + (i+1) + "\n" + startIdx + "\n" + endIdx)
          }
        }
      }
      let Mark = 0
      let safety = 0
      while(Mark < tree.children.length){
        newposi = -1 
        const element = tree.children[Mark];
        if (element.type !== "element" ) { // skip condition 
          Mark++;
          continue;
        }
        switch(element.tagName){
          case "h6":
            console.log("H6 read!\n" + startIdx + "\n" + endIdx)
            // endIdx[0] = -1
            // endIdx[1] = -1
            // endIdx[2] = -1
            // endIdx[3] = -1
            // endIdx[4] = -1
            endIdx[5] = (Mark-1)
            makeDivCheck(5)
            if(newposi !== -1){
              startIdx[5] = (newposi+1)
              Mark = newposi
            } else startIdx[5] = (Mark)
            console.log("H6 results ----------\n" + startIdx + "\n" + endIdx)
            console.log("Posi\n" + Mark)
            break;
          case "h5":
            console.log("H5 read!\n" + startIdx + "\n" + endIdx)
            // endIdx[0] = -1
            // endIdx[1] = -1
            // endIdx[2] = -1
            // endIdx[3] = -1
            endIdx[4] = (Mark-1)
            endIdx[5] = (Mark-1)
            makeDivCheck(4)
            if(newposi !== -1){
              startIdx[4] = (newposi+1)
              Mark = newposi
            } else startIdx[4] = (Mark)
            console.log("H5 results ----------\n" + startIdx + "\n" + endIdx)
            console.log("Posi\n" + Mark)
            break;
          case "h4":
            console.log("H4 read!\n" + startIdx + "\n" + endIdx)
            // endIdx[0] = -1
            // endIdx[1] = -1
            // endIdx[2] = -1
            endIdx[3] = (Mark-1)
            endIdx[4] = (Mark-1)
            endIdx[5] = (Mark-1)
            makeDivCheck(3)
            if(newposi !== -1){
              startIdx[3] = (newposi+1)
              Mark = newposi 
            } else startIdx[3] = (Mark)
            console.log("H4 results ----------\n" + startIdx + "\n" + endIdx)
            console.log("Posi\n" + Mark)
            break;
          case "h3":
            console.log("H3 read!\n" + startIdx + "\n" + endIdx)
            // endIdx[0] = -1
            // endIdx[1] = -1
            endIdx[2] = (Mark-1)
            endIdx[3] = (Mark-1)
            endIdx[4] = (Mark-1)
            endIdx[5] = (Mark-1)
            makeDivCheck(2)
            if(newposi !== -1){
              startIdx[2] = (newposi+1)
              Mark = newposi
            } else startIdx[2] = (Mark)
            console.log("H3 results ----------\n" + startIdx + "\n" + endIdx)
            console.log("Posi\n" + Mark)
            break;
          case "h2":
            console.log("H2 read!\n" + startIdx + "\n" + endIdx)
            // endIdx[0] = -1
            endIdx[1] = (Mark-1)
            endIdx[2] = (Mark-1)
            endIdx[3] = (Mark-1)
            endIdx[4] = (Mark-1)
            endIdx[5] = (Mark-1)
            makeDivCheck(1)
            if(newposi !== -1){
              startIdx[1] = (newposi+1)
              Mark = newposi
            } else startIdx[1] = (Mark)
            console.log("H2 results ----------\n" + startIdx + "\n" + endIdx)
            console.log("Posi\n" + Mark)
            break;
          case "h1":
            console.log("H1 read!\n" + startIdx + "\n" + endIdx)
            endIdx[0] = (Mark-1)
            endIdx[1] = (Mark-1)
            endIdx[2] = (Mark-1)
            endIdx[3] = (Mark-1)
            endIdx[4] = (Mark-1)
            endIdx[5] = (Mark-1)
            makeDivCheck(0)
            if(newposi !== -1){
              startIdx[0] = (newposi+1)
              Mark = newposi
            } else startIdx[0] = (Mark)
            console.log("H1 results ----------\n" + startIdx + "\n" + endIdx)
            console.log("Posi\n" + Mark)
            break;
          default: 
            console.log("Reading ... " + Mark)
        } 
        // console.log("FIND ME" + tree.children[tree.children.length-1].children[0].properties.id)
        if(tree.children[tree.children.length-1].children[0].properties.id == "footnotes"){
          if(Mark == (tree.children.length-1)){
            endIdx[0] = (Mark-1)
            endIdx[1] = (Mark-1)
            endIdx[2] = (Mark-1)
            endIdx[3] = (Mark-1)
            endIdx[4] = (Mark-1)
            endIdx[5] = (Mark-1)
            makeDivCheck(0)
            if(newposi !== -1){
              startIdx[0] = (newposi+1)
              Mark = newposi
            } else startIdx[0] = (Mark)
            console.log("Posi\n" + Mark)
          }
        }
        Mark++;
        safety++
        console.log(Mark +"/" + tree.children.length)
        if (safety > 10000) {
          console.error("INFINITE LOOP", {
              Mark,
              length: tree.children.length,
              startIdx,
              endIdx
          });
          break;
        }
      }}
      
    pp (tree)
    console.log(tree)
  }
}
// ////////////////////////////////////////////////////////////////
const customComponents = {
  // INPUT: AST things 
  table: ({ children, ...props }) => (
    <div >
      <Table.Root size="md" variant="line" interactive {...props}>
        {children}
      </Table.Root>
    </div>
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
  ul: ({children, ...props}) => (
    <List.Root>
      {React.Children.map(children, (child) => 
        (child.type === "li") ? <List.Item>{child.props.children}</List.Item> : null)}
    </List.Root>
  ),
  div: ({ node, children, ...props }) => {
    if (props.id === "divSubtree-H6"){
      const Chili = React.Children.toArray(children) 
      const DropDownTitle = Chili?.[0];
      const CollapsibleBody = Chili?.slice(1);
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
          remarkBreaks, // keeping new lines 
          wikiLinkPlugin, // Wiki Links 
        ]}
        // hAST --> 
        rehypePlugins={[ 
          rehypeKatex, // render latex into text 
          provideHeadingID, 
          // collapsibleH6, 
          // collapsibleHn,
          divByHeading,
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
