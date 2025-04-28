import {FlowViewProps} from "@codingapi/ui-framework";
import React from "react";
import {Modal} from "antd";
import {FlowView} from "./index";
import "./FlowModelView.scss";

 export const FlowModelView:React.FC<FlowViewProps> = (props)=>{
    return (
        <Modal
            className={"flow-modal"}
            open={props.visible}
            onCancel={()=>{
                props.setVisible(false);
            }}
            onOk={()=>{
                props.setVisible(false);
            }}
            onClose={()=>{
                props.setVisible(false);
            }}
            destroyOnClose={true}
            footer={false}
            closable={false}
        >
            <FlowView
                {...props}
            />
        </Modal>
    )
}

