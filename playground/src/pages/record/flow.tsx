import React from "react";
import {FlowModelView} from "@codingapi/flow-pc";
import LeaveForm from "@/pages/record/form";

const FlowRecordPage = () => {

    const [flowViewVisible, setFlowViewVisible] = React.useState(false);
    const currentId = '1'

    return (
        <div>
            <FlowModelView
                visible={flowViewVisible}
                setVisible={setFlowViewVisible}
                id={currentId}
                view={{
                    'default': LeaveForm
                }}
            />
        </div>
    );
};

export default FlowRecordPage;