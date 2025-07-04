import React from "react";
import {ActionType, ProTable} from "@ant-design/pro-components";
import {Input, InputNumber, Popconfirm, Space} from "antd";
import {CheckOutlined, EditOutlined, EyeOutlined, SettingOutlined} from "@ant-design/icons";
import {ScriptModal} from "./ScriptModal";
import {FlowContext} from "../../domain/FlowContext";
import {Form} from "@codingapi/form-pc";
import {ComponentBus} from "@codingapi/ui-framework";
import {FlowEdgeOutTriggerFormProps, FlowEdgeOutTriggerFormPropsKey} from "@codingapi/ui-framework";
import DefaultFlowEdgeOutTriggerFormView from "../../plugins/DefaultFlowEdgeOutTriggerFormView";

interface EdgePanelProps {
    id?: string;
    type: string;
}

export const EdgePanel: React.FC<EdgePanelProps> = (props) => {

    const [scriptViewVisible, setScriptViewVisible] = React.useState(false);
    const [customOutTriggerViewVisible, setCustomOutTriggerViewVisible] = React.useState(false);

    const [name, setName] = React.useState("");
    const [order, setOrder] = React.useState(0);

    const groovyForm = Form.useForm();
    const actionRef = React.useRef<ActionType>();

    // 自定义出口设置
    const FlowEdgeOutTriggerView = ComponentBus.getInstance().getComponent<FlowEdgeOutTriggerFormProps>(FlowEdgeOutTriggerFormPropsKey,DefaultFlowEdgeOutTriggerFormView);


    const flowContext = FlowContext.getInstance();

    const handlerChangeName = (id: any) => {
        flowContext.getFlowPanelContext()?.changeEdgeName(id, name);
        actionRef.current?.reload();
    }

    const handlerChangeOrder = (id: any) => {
        flowContext.getFlowPanelContext()?.changeEdgeOrder(id, order);
        actionRef.current?.reload();
    }

    const handlerChangeBack = (id: any, back: boolean) => {
        flowContext.getFlowPanelContext()?.changeEdgeBack(id, back);
        actionRef.current?.reload();
    }

    const handlerChangeOutTrigger = (id: any, outTrigger: string) => {
        flowContext.getFlowPanelContext()?.changeEdgeOutTrigger(id, outTrigger);
        actionRef.current?.reload();
    }

    const columns = [
        {
            title: 'id',
            dataIndex: 'id',
            key: 'id',
            hidden: true
        },
        {
            title: '关系名称',
            dataIndex: 'name',
            key: 'name',
            render: (text: string, record: any) => {
                return (
                    <Space>
                        {record.name ? record.name : "未命名"}

                        <Popconfirm
                            title={"修改名称"}
                            description={(
                                <Input
                                    defaultValue={record.name}
                                    onChange={(e) => {
                                        setName(e.target.value);
                                    }}/>
                            )}
                            onConfirm={() => {
                                handlerChangeName(record.id);
                            }}
                        >
                            <EditOutlined/>
                        </Popconfirm>
                    </Space>
                )
            }
        },
        {
            title: '关系类型',
            dataIndex: 'type',
            key: 'relation',
            render: (text: string, record: any) => {
                return (
                    <>{record.source.name} {"->"} {record.target.name}</>
                )
            }
        },
        {
            title: '出口设置',
            dataIndex: 'outTrigger',
            key: 'outTrigger',
            render: (text: string, record: any) => {
                return (
                    <Space>
                        <SettingOutlined
                            onClick={()=>{
                                setCustomOutTriggerViewVisible(true);
                            }}
                        />
                        {record.outTrigger ? (<CheckOutlined/>) : null}
                        <EyeOutlined
                            onClick={() => {
                                groovyForm.setFieldValue("script", record.outTrigger);
                                groovyForm.setFieldValue("type", record.id);
                                setScriptViewVisible(true);
                            }}/>

                        {FlowEdgeOutTriggerView && (
                            <FlowEdgeOutTriggerView
                                visible={customOutTriggerViewVisible}
                                setVisible={setCustomOutTriggerViewVisible}
                                currentScript={record.outTrigger}
                                onFinish={(script: string) => {
                                    handlerChangeOutTrigger(record.id, script);
                                }}
                            />
                        )}
                    </Space>
                )
            }
        },
        {
            title: '是否退回',
            dataIndex: 'back',
            hidden: props.type === 'start',
            key: 'back',
            render: (text: string, record: any) => {
                return (

                    <a>
                        <Popconfirm
                            title={`确认修改为${text ? '否' : '是'}吗？`}
                            onConfirm={() => {
                                handlerChangeBack(record.id, !text);
                            }}
                        >
                            {text ? '是' : '否'}
                        </Popconfirm>
                    </a>
                )
            }
        },
        {
            title: '排序',
            dataIndex: 'order',
            key: 'order',
            render: (text: string, record: any) => {
                return (
                    <Space>
                        <Popconfirm
                            title={"修改排序"}
                            description={(
                                <InputNumber
                                    defaultValue={record.order}
                                    step={1}
                                    onChange={(e) => {
                                        setOrder(e);
                                    }}/>)}
                            onConfirm={() => {
                                handlerChangeOrder(record.id);
                            }}
                        >
                            <EditOutlined/>
                        </Popconfirm>

                        {text}
                    </Space>
                )
            }
        },
    ] as any[];


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
                    const data = props.id ? flowContext.getFlowPanelContext()?.getEdges(props.id) as any[] : [];
                    return {
                        data: data.sort((a: any, b: any) => {
                            return a.order - b.order;
                        }),
                        success: true
                    }
                }}
            />

            <ScriptModal
                onFinish={(values) => {
                    handlerChangeOutTrigger(values.type, values.script);
                }}
                form={groovyForm}
                setVisible={setScriptViewVisible}
                visible={scriptViewVisible}/>


        </>
    )
}
