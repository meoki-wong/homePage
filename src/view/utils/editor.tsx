import React, { useState, useEffect } from 'react'
import { Editor, Toolbar } from '@wangeditor/editor-for-react'
import '@wangeditor/editor/dist/css/style.css'
import { IDomEditor } from '@wangeditor/editor'

function MyEditor() {
    const [editor, setEditor] = useState<any>(null) // 存储 editor 实例
    const [html, setHtml] = useState('')


    const toolbarConfig = { }
    const editorConfig = {
        placeholder: '请输入内容...',
    }

    // 及时销毁 editor ，重要！
    useEffect(() => {
        return () => {
            if (editor == null) return
            editor.destroy()
            setEditor(null)
        }
    }, [editor])
    const changeEditor = (editor: IDomEditor) => {
        console.log('-----', editor.getHtml());
        setHtml(editor.getHtml())
    }

    return (
        <>
            <div style={{ border: '1px solid #ccc', zIndex: 100, marginTop: '15px'}}>
                <Toolbar
                    editor={editor}
                    defaultConfig={toolbarConfig}
                    mode="default"
                    style={{ borderBottom: '1px solid #ccc' }}
                />
                <Editor
                    defaultConfig={editorConfig}
                    value={html}
                    onCreated={setEditor}
                    onChange={editor => changeEditor(editor)}
                    mode="default"
                    style={{ height: '500px' }}
                />
            </div>
            <div style={{ marginTop: '15px' }}>
                {html}
            </div>
        </>
    )
}

export default MyEditor