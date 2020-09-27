import dynamic from 'next/dynamic'

const MdEditor = dynamic(() => import('react-markdown-editor-lite'), {
    ssr: false
  })

const Editor = (props) => {
    return (
        <MdEditor {...props} />
    )
}

export default Editor