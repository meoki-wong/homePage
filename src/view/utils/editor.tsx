import '@wangeditor/editor/dist/css/style.css' // 引入 css

import React, { useState, useEffect, useImperativeHandle } from 'react'
import { Editor, Toolbar } from '@wangeditor/editor-for-react'
import { IDomEditor, IEditorConfig, IToolbarConfig } from '@wangeditor/editor'

function MyEditor(props: any, ref: any) {
    // editor 实例
    const [editor, setEditor] = useState<IDomEditor | null>(null)   

    // 编辑器内容
    const [html, setHtml] = useState<string>('')

    // 工具栏配置
    const toolbarConfig: Partial<IToolbarConfig> = { }  

    // 编辑器配置
    const editorConfig: Partial<IEditorConfig> = {    
        placeholder: '请输入内容...',
    }
    useImperativeHandle(ref, ()=>{
        return {
            editor
        }
    })

    // 及时销毁 editor ，重要！
    useEffect(() => {
        return () => {
            if (editor == null) return
            editor.destroy()
            setEditor(null)
        }
    }, [editor])
    const changeEditor = (editor: IDomEditor) => {
        console.log('-----', editor.getText())
        setHtml(editor.getHtml())
    }
    return (
        <>
            <div style={{ border: '1px solid #ccc', zIndex: 100}}>
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
                    style={{ height: '500px', overflowY: 'hidden' }}
                />
            </div>
        </>
    )
}

export default React.forwardRef(MyEditor)