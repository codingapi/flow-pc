import React, {useEffect} from "react";
import {FlowFormViewProps} from "@codingapi/ui-framework";
import {Form, FormItem} from "@codingapi/form-pc";

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

            <FormItem
                name={"id"}
                hidden={true}
                type={'input'}
            >
            </FormItem>

            <FormItem
                name={"username"}
                hidden={true}
                type={'input'}
            >
            </FormItem>

            <FormItem
                name={"days"}
                label={"请假天数"}
                required={true}
                type={"input"}
                inputType={"number"}
                rules={[
                    {
                        required: true,
                        message: "请输入请假天数"
                    },
                ]}
            >
            </FormItem>

            <FormItem
                name={"desc"}
                label={"请假原因"}
                required={true}
                type={"textarea"}
            >
            </FormItem>
        </Form>
    )
}

export default LeaveForm;
