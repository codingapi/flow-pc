import React, {createContext, useEffect} from "react";
import {FlowViewProps} from "@codingapi/ui-framework";
import {FormInstance} from "@codingapi/ui-framework";
import {FlowButtonClickContext} from "../domain";
import {FlowTriggerContext} from "../domain";
import {FlowStateContext} from "../domain";
import {FlowEventContext} from "../domain";
import {FlowRecordContext} from "../domain";
import {FlowReduxState, flowStore, initState, updateState} from "../store";
import {FlowApiContent} from "../api";
import {Provider, useDispatch, useSelector} from "react-redux";
import {Skeleton} from "antd";
import {FlowPage} from "../components";
import "./FlowView.scss";

// 流程视图上下文属性
interface FlowViewReactContextProps {
    // 流程的详情控制上下文对象
    flowRecordContext: FlowRecordContext;
    // 流程的事件控制上下文对象
    flowEventContext: FlowEventContext;
    // 流程的状态数据上下文对象
    flowStateContext: FlowStateContext;
    // 流程事件触发控制上下文对象
    flowTriggerContext: FlowTriggerContext;
    // 流程按钮点击触发控制器上下文对象
    flowButtonClickContext: FlowButtonClickContext;
    // 表单操作对象
    formInstance: FormInstance;
    // 审批意见操作对象
    opinionInstance: FormInstance;
}

export const FlowViewReactContext = createContext<FlowViewReactContextProps | null>(null);


const $FlowView: React.FC<FlowViewProps> = (props) => {

    const [data, setData] = React.useState<any>(null);

    const dispatch = useDispatch();

    const version = useSelector((state: FlowReduxState) => state.flow.version);

    // 请求流程详情数据
    const loadFlowDetail = () => {
        if (props.id) {
            FlowApiContent.getInstance().getDetailById(props.id).then(res => {
                if (res && res.success) {
                    setData(res.data);
                }
            });
            return;
        }
        if (props.workCode) {
            FlowApiContent.getInstance().getDetailByWorkCode( props.workCode).then(res => {
                if (res && res.success) {
                    setData(res.data);
                }
            });
            return;
        }
    }

    useEffect(() => {
        if (data) {
            const dataVersion = Math.random();
            dispatch(updateState({dataVersion: dataVersion}));
        }
    }, [data]);

    useEffect(() => {
        return () => {
            dispatch(initState());
        }
    }, []);

    useEffect(() => {
        loadFlowDetail();
    }, [version]);

    return (
        <>
            {!data && (
                <>
                    <Skeleton active={true} className={"flow-skeleton-header"}/>
                    <Skeleton paragraph={{rows: 4}} active={true} className={"flow-skeleton-body"}/>
                </>
            )}
            {data && (
                <FlowPage
                    {...props}
                    flowData={data}
                />
            )}
        </>
    )
}

export const FlowView: React.FC<FlowViewProps> = (props) => {
    return (
        <Provider store={flowStore}>
            <$FlowView  {...props} />
        </Provider>
    )
}


