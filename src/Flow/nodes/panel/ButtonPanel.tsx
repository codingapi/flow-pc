import React from "react";
import {ActionType, ProColumns, ProTable} from "@ant-design/pro-components";
import {Button, ColorPicker, Modal, Popconfirm, Space} from "antd";
import {ScriptModal} from "./ScriptModal";
import {EyeOutlined, SettingOutlined} from "@ant-design/icons";
import {FlowContext} from "../../domain/FlowContext";
import {Form, FormColor, FormInput, FormSelect} from "@codingapi/form-pc";
import {ComponentBus, ValidateUtils} from "@codingapi/ui-framework";
import {FlowButtonCustomApiFormProps, FlowButtonCustomApiFormPropsKey} from "@codingapi/ui-framework";
import DefaultFlowButtonCustomApiFormView from "../../plugins/DefaultFlowButtonCustomApiFormView";

interface ButtonPanelProps {
    id: string;
}

export const ButtonPanel: React.FC<ButtonPanelProps> = (props) => {

    const actionRef = React.useRef<ActionType>();

    const form = Form.useForm();
    const groovyForm = Form.useForm();

    const [scriptViewVisible, setScriptViewVisible] = React.useState(false);

    const [scriptVisible, setScriptVisible] = React.useState(false);

    const [type, setType] = React.useState<string>();
    const [customApiViewVisible, setCustomApiViewVisible] = React.useState(false);

    // 自定义接口
    const FlowButtonCustomApiView = ComponentBus.getInstance().getComponent<FlowButtonCustomApiFormProps>(FlowButtonCustomApiFormPropsKey,DefaultFlowButtonCustomApiFormView);

    const flowContext = FlowContext.getInstance();

    const columns = [
        {
            title: 'id',
            dataIndex: 'id',
            key: 'id',
            hidden: true
        },
        {
            title: '按钮名称',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '事件类型',
            dataIndex: 'type',
            key: 'type',
            render: (value: string) => {
                return flowContext.getFlowPanelContext()?.convertButtonValue(value);
            }
        },
        {
            title: '按钮颜色',
            dataIndex: 'style',
            key: 'style',
            render: (_: any, record: any) => {
                return <ColorPicker value={record.style?.background} disabled={true}/>;
            }
        },
        {
            title: '排序',
            dataIndex: 'order',
            key: 'order',
        },
        {
            title: "操作",
            valueType: "option",
            render: (_: any, record: any) => {
                return [
                    <a
                        key={"edit"}
                        onClick={() => {
                            groovyForm.reset();
                            form.setFieldsValue(record);
                            setType(record.type);
                            setScriptViewVisible(true);
                        }}
                    >
                        修改
                    </a>,
                    <Popconfirm
                        key={"delete"}
                        title={"确认要删除吗？"}
                        onConfirm={() => {
                            flowContext.getFlowPanelContext()?.deleteButton(props.id, record.id);
                            actionRef.current?.reload();
                        }}>
                        <a>删除</a>
                    </Popconfirm>
                ]
            }
        }
    ] as ProColumns[];

    return (
        <>
            <ProTable
                columns={columns}
                actionRef={actionRef}
                key={"id"}
                search={false}
                options={false}
                pagination={false}
                request={async () => {
                    const buttons = flowContext?.getFlowPanelContext()?.getButtons(props.id) || [];
                    return {
                        data: buttons,
                        total: buttons.length,
                    }
                }}
                toolBarRender={() => {
                    return [
                        <Button
                            type={"primary"}
                            onClick={() => {
                                groovyForm.reset();
                                setScriptViewVisible(true);
                            }}
                        >添加按钮</Button>
                    ]
                }}
            />

            <Modal
                title={"添加节点按钮"}
                open={scriptViewVisible}
                onCancel={() => {
                    setScriptViewVisible(false);
                }}
                onOk={async () => {
                    await form.submit();
                }}
                destroyOnHidden={true}
            >

                <Form
                    layout={"vertical"}
                    form={form}
                    onFinish={async (values) => {
                        flowContext.getFlowPanelContext()?.updateButton(props.id, values as any);
                        setScriptViewVisible(false);
                        actionRef.current?.reload();
                    }}
                >

                    <Form.Item
                        name={"id"}
                        hidden={true}
                    >
                        <FormInput/>
                    </Form.Item>

                    <Form.Item
                        name={"name"}
                        label={"按钮名称"}
                        required={true}
                    >
                        <FormInput
                            placeholder={"请输入按钮名称"}
                            validateFunction={ValidateUtils.validateNotEmpty}
                        />
                    </Form.Item>


                    <Form.Item
                        name={["style", "background"]}
                        label={"按钮颜色"}
                    >
                        <FormColor
                            placeholder={"请输入按钮颜色"}
                        />
                    </Form.Item>


                    <Form.Item
                        name={"type"}
                        label={"按钮类型"}
                        required={true}
                    >

                        <FormSelect

                            addonAfter={(
                                <Space>
                                    {type === 'CUSTOM' && (
                                        <>
                                            <Button
                                                icon={<SettingOutlined/>}
                                                onClick={() => {
                                                    setCustomApiViewVisible(true);
                                                }}
                                            >
                                                接口配置
                                            </Button>

                                            <EyeOutlined
                                                onClick={() => {
                                                    groovyForm.reset();
                                                    const script = form.getFieldValue('groovy') || 'def run(content){\n  //你的代码 \n  return content.createMessageResult(\'我是自定义标题\');\n}';
                                                    groovyForm.setFieldsValue({
                                                        'script': script
                                                    });
                                                    setScriptVisible(!scriptVisible);
                                                }}/>
                                        </>
                                    )}
                                </Space>
                            )}
                            placeholder={"请输入按钮类型"}

                            options={flowContext.getFlowPanelContext()?.getButtonEventOptions()}
                            onChange={(value: string) => {
                                setType(value);
                            }}
                        />
                    </Form.Item>


                    {type === 'VIEW' && (
                        <Form.Item
                            name={"eventKey"}
                            label={"事件Key"}
                            help={"事件Key用于流程Form的事件触发"}
                            required={true}
                        >
                            <FormInput/>
                        </Form.Item>

                    )}

                    <Form.Item
                        name={"groovy"}
                        hidden={true}
                    >
                        <FormInput/>
                    </Form.Item>

                    <Form.Item
                        name={"order"}
                        label={"排序"}
                    >
                        <FormInput
                            inputType={"number"}
                            placeholder={"请输入排序"}
                        />
                    </Form.Item>

                    <ScriptModal
                        onFinish={(values) => {
                            form.setFieldsValue({
                                'groovy': values.script
                            });
                        }}
                        form={groovyForm}
                        setVisible={setScriptVisible}
                        visible={scriptVisible}/>

                    {FlowButtonCustomApiView && (
                        <FlowButtonCustomApiView
                            visible={customApiViewVisible}
                            setVisible={setCustomApiViewVisible}
                            onFinish={(script) => {
                                form.setFieldsValue({
                                    'groovy': script
                                });
                            }}
                            currentScript={form.getFieldValue('groovy')}
                        />
                    )}

                </Form>
            </Modal>
        </>
    )
}

