import React from "react";
import {PostponedFormProps} from "@codingapi/ui-framework";
import {Modal} from "antd";
import {Form, FormInput} from "@codingapi/form-pc";

const DefaultPostponedFormView: React.FC<PostponedFormProps> = (props) => {

    const formInstance = Form.useForm();

    return (
        <Modal
            title={"延期调整"}
            open={props.visible}
            onCancel={() => {
                props.setVisible(false);
            }}
            onOk={() => {
                formInstance.submit();
            }}
            destroyOnHidden={true}
        >
            <Form
                form={formInstance}
                onFinish={async (values) => {
                    props.onFinish(values.hours);
                }}
            >
                <Form.Item
                    name={"hours"}
                    label={"延期时间"}
                    tooltip={"以当前时间开始延期，延期单位为小时"}
                    rules={[
                        {
                            required: true,
                            message: "请输入延期时间"
                        }
                    ]}
                >
                    <FormInput
                        addonAfter={"小时"}
                    />
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default DefaultPostponedFormView;
