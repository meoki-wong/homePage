import "@wangeditor/editor/dist/css/style.css"; // 引入 css

import React, { useState, useEffect, useImperativeHandle } from "react";
import { Editor, Toolbar } from "@wangeditor/editor-for-react";
import { IDomEditor, IEditorConfig, IToolbarConfig } from "@wangeditor/editor";
type InsertFnType = (url: string, alt: string, href: string) => void;

function MyEditor(props: any, ref: any) {
    // editor 实例
    const [editor, setEditor] = useState<IDomEditor | null>(null);

    // 编辑器内容
    const [html, setHtml] = useState<string>("");

    // 工具栏配置
    const toolbarConfig: Partial<IToolbarConfig> = {};

    // 编辑器配置
    const editorConfig: Partial<IEditorConfig> = {
        placeholder: "请输入内容...",
        MENU_CONF: {
            uploadImage: {
                server: "http://127.0.0.1:10020/data_admin/uploadFile",
                headers: {
                    authorization: window.localStorage.getItem("token"),
                },
                // 上传之前触发
                onBeforeUpload(file: File) {
                    // TS 语法
                    return file;
                },
                customInsert(res: any, insertFn: InsertFnType) {
                    // TS 语法                // JS 语法
                    // res 即服务端的返回结果
                    // 从 res 中找到 url alt href ，然后插入图片
                    insertFn(res.data, "富文本图片", res.data);
                },
            },
        },
    };
    useImperativeHandle(ref, () => {
        return {
            editor,
        };
    });

    // 及时销毁 editor ，重要！
    useEffect(() => {
        console.log("00000editor", editor);
        return () => {
            if (editor == null) return;
            editor.destroy();
            setEditor(null);
        };
    }, [editor]);
    const changeEditor = (editor: IDomEditor) => {
        console.log("-----", editor.getText());
        setHtml(editor.getHtml());
    };
    return (
        <>
            <div style={{ border: "1px solid #ccc", zIndex: 100 }}>
                <Toolbar
                    editor={editor}
                    defaultConfig={toolbarConfig}
                    mode="default"
                    style={{ borderBottom: "1px solid #ccc" }}
                />
                <Editor
                    defaultConfig={editorConfig}
                    value={html}
                    onCreated={setEditor}
                    onChange={(editor) => changeEditor(editor)}
                    mode="default"
                    style={{ height: "500px", overflowY: "hidden" }}
                />
            </div>
        </>
    );
}

export default React.forwardRef(MyEditor);
