import React from "react";
import {Modal} from "antd";
import TextArea from "antd/es/input/TextArea";
import {FlowButtonCustomApiFormProps} from "@codingapi/ui-framework";

const DefaultFlowButtonCustomApiFormView:React.FC<FlowButtonCustomApiFormProps> = (props)=>{

    const [script, setScript] = React.useState<string>("");

    React.useEffect(() => {
        setScript(props.currentScript || "");
    }, [props.currentScript]);
    return (
        <Modal
            title={"自定义按钮配置"}
            open={props.visible}
            onCancel={()=>{
                props.setVisible(false);
            }}
            onOk={()=>{
                props.onFinish(script);
                props.setVisible(false);
            }}
        >
            <TextArea
                style={{
                    minHeight: 400,
                }}
                minLength={5}
                value={script}
                onChange={(e)=>{
                    setScript(e.target.value);
                }}
            />
        </Modal>
    )
}

export default DefaultFlowButtonCustomApiFormView;
