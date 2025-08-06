import React, {useEffect} from "react";
import {FlowFormViewProps, ValidateUtils} from "@codingapi/ui-framework";
import {Form, FormInput, FormTextArea} from "@codingapi/form-pc";

const LeaveForm: React.FC<FlowFormViewProps> = (props) => {

    useEffect(() => {
        if (props.dataVersion && props.data) {
            console.log('data', props.data);
            props.form?.setFieldsValue({
                ...props.data
            });
        }
    }, [props.dataVersion]);

    return (
        <Form
            form={props.form}
            layout={"vertical"}
        >

            <Form.Item
                name={"id"}
                hidden={true}
            >
                <FormInput/>
            </Form.Item>

            <Form.Item
                name={"username"}
                hidden={true}
            >
                <FormInput/>
            </Form.Item>

            <Form.Item
                name={"days"}
                label={"请假天数"}
                required={true}
            >
                <FormInput
                    inputType={"number"}
                    validateFunction={ValidateUtils.validateNotEmpty}
                />
            </Form.Item>


            <Form.Item
                name={"desc"}
                label={"请假原因"}
                required={true}
            >
                <FormTextArea
                    validateFunction={ValidateUtils.validateNotEmpty}
                />
            </Form.Item>

        </Form>
    )
}

export default LeaveForm;
