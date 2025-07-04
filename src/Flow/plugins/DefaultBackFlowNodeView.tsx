import React, {useContext} from "react";
import {BackFlowNodeViewProps, ValidateUtils} from "@codingapi/ui-framework";
import {Modal} from "antd";
import {Form, FormSelect} from "@codingapi/form-pc";
import {FlowViewReactContext} from "../view";

const DefaultBackFlowNodeView:React.FC<BackFlowNodeViewProps> = (props)=>{

    const formInstance = Form.useForm();
    const flowViewReactContext = useContext(FlowViewReactContext);
    const flowRecordContext = flowViewReactContext?.flowRecordContext;

    return (
        <Modal
            title={"流程退回节点选择"}
            open={props.visible}
            onCancel={()=>{
                props.setVisible(false);
            }}
            onOk={async ()=>{
                await formInstance.submit();
            }}
            destroyOnClose={true}
        >
            <Form
                form={formInstance}
                onFinish={async (values)=>{
                    props.setVisible(false);
                    props.onFinish(values.backNode);
                }}
            >
                <FormSelect
                    name={"backNode"}
                    label={"退回流程节点"}
                    tooltip={"退回的流程节点，选择后流程将退回到该节点"}
                    options={flowRecordContext?.getFlowHistoryNodeList()}
                    validateFunction={ValidateUtils.validateNotEmpty}
                />
            </Form>
        </Modal>
    )
}

export default DefaultBackFlowNodeView;
