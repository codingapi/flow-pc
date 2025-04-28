import {FlowPanelContext} from "./FlowPanelContext";

export class FlowContext{

    private flowPanelContext: FlowPanelContext | null = null;

    private constructor() {
    }

    private static instance: FlowContext = new FlowContext();

    static getInstance(){
        return FlowContext.instance;
    }

    setFlowPanelContext(flowPanelContext: FlowPanelContext){
        this.flowPanelContext = flowPanelContext;
    }

    getFlowPanelContext(){
        return this.flowPanelContext;
    }
}

