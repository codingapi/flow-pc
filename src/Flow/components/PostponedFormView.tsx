import React from "react";
import {PostponedFormProps, ValidateUtils} from "@codingapi/ui-framework";
import {Modal} from "antd";
import {Form, FormInput} from "@codingapi/form-pc";


export const PostponedFormView:React.FC<PostponedFormProps> = (props)=>{

    const formInstance = Form.useForm();

    return (
        <Modal
            title={"延期调整"}
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
                    props.onFinish(values.hours);
                }}
            >
                <FormInput
                    name={"hours"}
                    label={"延期时间"}
                    tooltip={"以当前时间开始延期，延期单位为小时"}
                    addonAfter={"小时"}
                    validateFunction={ValidateUtils.validateNotEmpty}
                />
            </Form>
        </Modal>
    )
}

