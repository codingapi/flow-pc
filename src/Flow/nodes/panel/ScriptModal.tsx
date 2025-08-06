import React from "react";
import Markdown from "react-markdown";
import {markdown} from "./help";
import remarkGfm from 'remark-gfm'
import "./ScriptModal.scss";
import {FormInstance} from "@codingapi/ui-framework";
import {Modal} from "antd";
import {Form,FormInput,FormCode} from "@codingapi/form-pc";

interface ScriptModalProps {
    form: FormInstance;
    visible: boolean;
    setVisible: (visible: boolean) => void;
    onFinish: (values: any) => void;
}

export const ScriptModal: React.FC<ScriptModalProps> = (props) => {
    return (
        <Modal
            width={"85vw"}
            className={"flow-script-modal"}
            title={"脚本预览"}
            open={props.visible}
            onCancel={() => {
                props.setVisible(false);
            }}
            onOk={async ()=>{
                await props.form.submit();
            }}
            destroyOnHidden={true}
        >
            <Form
                form={props.form}
                onFinish={async (values) => {
                    props.onFinish(values);
                    props.setVisible(false);
                }}
            >
                <div className={"flow-script-content"}>
                    <div className={"flow-script-help"}>
                        <div className={"flow-script-help-markdown"}>
                            <Markdown
                                remarkPlugins={[remarkGfm]}
                            >
                                {markdown}
                            </Markdown>
                        </div>
                    </div>
                    <div className={"flow-script-form"}>
                        <Form.Item
                            name={"type"}
                            hidden={true}
                        >
                            <FormInput/>
                        </Form.Item>
                        <Form.Item
                            name={"script"}
                        >
                            <FormCode
                                codeStyle={{
                                    height: '65vh',
                                }}
                            />
                        </Form.Item>
                    </div>
                </div>
            </Form>
        </Modal>
    )
}

