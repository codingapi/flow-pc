import React, {useEffect} from "react";
import {Button, Divider, Space} from "antd";
import {EyeOutlined, SettingOutlined} from "@ant-design/icons";
import {GroovyScript} from "../../utils";
import {ScriptModal} from "./ScriptModal";
import {
    ComponentBus,
    FormInstance,
    UserSelectFormProps,
    UserSelectFormViewKey,
} from "@codingapi/ui-framework";
import {Form, FormInput, FormSelect, FormSwitch} from "@codingapi/form-pc";
import {
    FlowNodeErrorTriggerFormProps,
    FlowNodeErrorTriggerFormPropsKey,
    FlowNodeTitleFormProps,
    FlowNodeTitleFormPropsKey
} from "@codingapi/ui-framework";
import DefaultFlowNodeErrorTriggerFormView from "../../plugins/DefaultFlowNodeErrorTriggerFormView";
import DefaultFlowNodeTitleFormView from "../../plugins/DefaultFlowNodeTitleFormView";

interface NodePanelProps {
    id?: string,
    data?: any,
    onFinish: (values: any) => void,
    form: FormInstance,
    type: string,
}

export const NodePanel: React.FC<NodePanelProps> = (props) => {

    const groovyForm = Form.useForm();

    const [scriptViewVisible, setScriptViewVisible] = React.useState(false);
    const [customTitleVisible, setCustomTitleVisible] = React.useState(false);
    const [customOperatorVisible, setCustomOperatorVisible] = React.useState(false);
    const [customErrTriggerVisible, setCustomErrTriggerVisible] = React.useState(false);

    const [customTitleViewVisible, setCustomTitleViewVisible] = React.useState(false);
    const [customOperatorViewVisible, setCustomOperatorViewVisible] = React.useState(false);
    const [customErrTriggerViewVisible, setCustomErrTriggerViewVisible] = React.useState(false);

    // 用户选人视图
    const UserSelectView = ComponentBus.getInstance().getComponent<UserSelectFormProps>(UserSelectFormViewKey);

    // 异常处理视图
    const FlowNodeErrorTriggerFormView = ComponentBus.getInstance().getComponent<FlowNodeErrorTriggerFormProps>(FlowNodeErrorTriggerFormPropsKey,DefaultFlowNodeErrorTriggerFormView);

    // 标题生成视图
    const FlowNodeTitleFormView = ComponentBus.getInstance().getComponent<FlowNodeTitleFormProps>(FlowNodeTitleFormPropsKey,DefaultFlowNodeTitleFormView);

    useEffect(()=>{
        props.form.reset();
        props.form.setFieldsValue({
            ...props.data,
            operatorMatcherType: GroovyScript.operatorMatcherType(props.data?.operatorMatcher),
            errTriggerType: GroovyScript.errTriggerType(props.data?.errTrigger),
            titleGeneratorType: GroovyScript.titleGeneratorType(props.data?.titleGenerator),
        });
        setCustomOperatorVisible(GroovyScript.operatorMatcherType(props.data?.operatorMatcher) ==='custom');
        setCustomTitleVisible(GroovyScript.titleGeneratorType(props.data?.titleGenerator) === 'custom');
        setCustomErrTriggerVisible(GroovyScript.errTriggerType(props.data?.errTrigger)==='custom');
    }, []);

    return (
        <>
            <Form
                form={props.form}
                layout={"vertical"}
                onFinish={async (values) => {
                    props.onFinish(values);
                }}
            >
                <Divider>
                    基本信息
                </Divider>
                <Form.Item
                    name={"name"}
                    label={"节点名称"}
                    required={true}
                    rules={[
                        {
                            required: true,
                            message: "请输入节点名称"
                        }
                    ]}
                >
                    <FormInput/>
                </Form.Item>

                <Form.Item
                    name={"code"}
                    label={"节点编码"}
                    required={true}
                    rules={[
                        {
                            required: true,
                            message: "请输入节点编码"
                        }
                    ]}
                >
                    <FormInput
                        disabled={props.type === 'start' || props.type === 'over'}
                    />
                </Form.Item>

                <Form.Item
                    name={"view"}
                    label={"视图名称"}
                    tooltip={"界面渲染视图的名称"}
                    required={true}
                    rules={[
                        {
                            required: true,
                            message: "请输入视图名称"
                        }
                    ]}
                >
                    <FormInput/>
                </Form.Item>

                <Divider>
                    节点配置
                </Divider>

                <Form.Item
                    name={"approvalType"}
                    label={"节点类型"}
                    tooltip={"会签即多人审批以后再处理，非会签则是一个人处理以后即可响应"}
                    required={true}
                    hidden={props.type !== 'node'}
                    rules={[
                        {
                            required: true,
                            message: "请选择节点类型"
                        }
                    ]}
                >
                    <FormSelect
                        options={[
                            {
                                label: "会签",
                                value: "SIGN"
                            },
                            {
                                label: "非会签",
                                value: "UN_SIGN"
                            },
                        ]}
                    />
                </Form.Item>


                <Form.Item
                    tooltip={"操作人匹配脚本"}
                    name={"operatorMatcher"}
                    label={"操作人"}
                    hidden={true}
                >
                    <FormInput/>
                </Form.Item>



                <Form.Item
                    tooltip={"操作人匹配脚本"}
                    name={"operatorMatcherType"}
                    label={"操作人"}
                >
                    <FormSelect
                        options={[
                            {
                                label: "任意人",
                                value: "any"
                            },
                            {
                                label: "发起人",
                                value: "creator"
                            },
                            {
                                label: "自定义",
                                value: "custom"
                            },
                        ]}
                        onChange={(value) => {
                            props.form.setFieldsValue({
                                operatorMatcher: GroovyScript.operatorMatcher(value as string)
                            });
                            if (value === "custom") {
                                setCustomOperatorVisible(true);
                            } else {
                                setCustomOperatorVisible(false);
                            }
                        }}
                        addonAfter={(
                            <Space>
                                {customOperatorVisible && (
                                    <Button
                                        icon={<SettingOutlined/>}
                                        onClick={() => {
                                            setCustomOperatorViewVisible(true);
                                        }}
                                    >
                                        选择人员
                                    </Button>
                                )}

                                <EyeOutlined
                                    onClick={() => {
                                        const value = props.form.getFieldValue("operatorMatcher");
                                        groovyForm.setFieldValue("type", "operatorMatcher");
                                        groovyForm.setFieldValue("script", value);
                                        setScriptViewVisible(true);
                                    }}/>

                            </Space>
                        )}
                    />
                </Form.Item>


                <Form.Item
                    tooltip={"超时提醒时间，单位毫米。为0时则为无超时设置"}
                    name={"timeout"}
                    hidden={props.type === 'circulate'}
                    label={"超时时间"}
                >
                    <FormInput
                        inputType={"number"}
                    />
                </Form.Item>


                <Form.Item
                    tooltip={"关闭编辑以后在当前节点下的流程表单无法修改数据"}
                    name={"editable"}
                    label={"是否编辑"}
                >
                    <FormSwitch/>
                </Form.Item>

                <Form.Item
                    tooltip={"合并该节点下的待办到一条记录中"}
                    name={"mergeable"}
                    hidden={props.type !== 'node'}
                    label={"是否合并"}
                >
                    <FormSwitch/>
                </Form.Item>

                <Form.Item
                    name={"titleGenerator"}
                    label={"自定义标题"}
                    hidden={true}
                >
                    <FormInput/>
                </Form.Item>

                <Form.Item
                    tooltip={"待办记录中的标题生成器脚本"}
                    name={"titleGeneratorType"}
                    label={"自定义标题"}
                >
                    <FormSelect
                        options={[
                            {
                                label: "默认",
                                value: "default"
                            },
                            {
                                label: "自定义",
                                value: "custom"
                            },
                        ]}
                        onChange={(value) => {
                            if (value === "default") {
                                props.form.setFieldsValue({
                                    titleGenerator: GroovyScript.defaultTitleGenerator
                                })
                            }
                            if (value === 'custom') {
                                setCustomTitleVisible(true);
                            } else {
                                setCustomTitleVisible(false);
                            }
                        }}
                        addonAfter={(
                            <Space>
                                {customTitleVisible && (
                                    <Button
                                        icon={<SettingOutlined/>}
                                        onClick={() => {
                                            setCustomTitleViewVisible(true);
                                        }}
                                    >
                                        配置标题
                                    </Button>
                                )}
                                <EyeOutlined
                                    onClick={() => {
                                        const value = props.form.getFieldValue("titleGenerator");
                                        groovyForm.setFieldValue("type", "titleGenerator");
                                        groovyForm.setFieldValue("script", value);
                                        setScriptViewVisible(true);
                                    }}/>
                            </Space>
                        )}
                    />
                </Form.Item>



                <Divider>
                    异常配置
                </Divider>

                <Form.Item
                    name={"errTrigger"}
                    label={"异常配置"}
                    hidden={true}
                >
                    <FormInput/>
                </Form.Item>

                <Form.Item
                    tooltip={"当节点无人员匹配时的异常补偿脚本，可以指定人员或节点处理"}
                    name={"errTriggerType"}
                    label={"异常配置"}
                >
                    <FormSelect
                        options={[
                            {
                                label: "默认",
                                value: "default"
                            },
                            {
                                label: "自定义",
                                value: "custom"
                            },
                        ]}
                        onChange={(value) => {
                            if (value === "default") {
                                props.form.setFieldsValue({
                                    errTrigger: GroovyScript.defaultErrTrigger
                                })
                            }
                            if (value === 'custom') {
                                setCustomErrTriggerVisible(true);
                            } else {
                                setCustomErrTriggerVisible(false);
                            }
                        }}
                        addonAfter={(
                            <Space>
                                {customErrTriggerVisible && (
                                    <Button
                                        icon={<SettingOutlined/>}
                                        onClick={() => {
                                            setCustomErrTriggerViewVisible(true);
                                        }}
                                    >
                                        配置异常处理
                                    </Button>
                                )}
                                <EyeOutlined
                                    onClick={() => {
                                        const value = props.form.getFieldValue("errTrigger");
                                        groovyForm.setFieldValue("type", "errTrigger");
                                        groovyForm.setFieldValue("script", value);
                                        setScriptViewVisible(true);
                                    }}/>
                            </Space>
                        )}
                    />
                </Form.Item>
            </Form>

            <ScriptModal
                onFinish={(values) => {
                    const type = values.type;
                    props.form.setFieldsValue({
                        [type]: values.script
                    });
                }}
                form={groovyForm}
                setVisible={setScriptViewVisible}
                visible={scriptViewVisible}/>

            {UserSelectView && (
                <UserSelectView
                    visible={customOperatorViewVisible}
                    setVisible={setCustomOperatorViewVisible}
                    userSelectType={"users"}
                    specifyUserIds={GroovyScript.getOperatorUsers(props.form.getFieldValue("operatorMatcher"))}
                    multiple={true}
                    onFinish={(values) => {
                        setCustomOperatorViewVisible(false);
                        const script = GroovyScript.specifyOperatorMatcher.replaceAll("%s", values.map((item: any) => item.id).join(","));
                        props.form.setFieldsValue({
                            operatorMatcher: script
                        });
                    }}
                />
            )}

            {FlowNodeTitleFormView && (
                <FlowNodeTitleFormView
                    visible={customTitleViewVisible}
                    setVisible={setCustomTitleViewVisible}
                    currentScript={props.form.getFieldValue("titleGenerator")}
                    onFinish={(script) => {
                        props.form.setFieldsValue({
                            titleGenerator: script
                        });
                    }}
                />
            )}

            {FlowNodeErrorTriggerFormView && (
                <FlowNodeErrorTriggerFormView
                    visible={customErrTriggerViewVisible}
                    setVisible={setCustomErrTriggerViewVisible}
                    currentScript={props.form.getFieldValue("errTrigger")}
                    onFinish={(script) => {
                        props.form.setFieldsValue({
                            errTrigger: script
                        });
                    }}
                />
            )}
        </>
    )
}

