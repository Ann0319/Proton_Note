import { forwardRef } from 'react'
import dynamic from 'next/dynamic'

const MdEditor = dynamic(() => import('react-markdown-editor-lite'), {
    ssr: false
  })

const Editor = forwardRef((props, _ref) => (
        <MdEditor {...props} ref={_ref} />
))

export default Editor