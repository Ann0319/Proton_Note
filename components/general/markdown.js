import ReactMarkdown from 'react-markdown/with-html'
import htmlParser from 'react-markdown/plugins/html-parser'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'

const CodeBlock = ({ language, value }) => {
    return <SyntaxHighlighter language={language}>{value}</SyntaxHighlighter>
}

const Markdown = (props) => {
    const { content } = props

    const parseHtml = htmlParser({
        isValidNode: node => node.type !== 'script'
    })

    return (
        <ReactMarkdown
            source={content}
            escapeHtml={false}
            astPlugins={[parseHtml]}
            renderers={{ code: CodeBlock }}
        />
    )
}

export default Markdown