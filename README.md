# Flow-pc

基于PC的流程引擎

## 安装

```bash
# npm
npm install @codingapi/flow-pc

# yarn
yarn add @codingapi/flow-pc

# pnpm
pnpm add @codingapi/flow-pc
```

## 使用

### 流程设计器

```tsx
import React from "react";
import {Flow, FlowActionType} from "@codingapi/flow-pc";

const FlowDesign = () => {
    const flowActionType = React.useRef<FlowActionType>(null);

    const [schema, setSchema] = React.useState<any>(null);

    return (
        <>
            <Flow
                data={schema}
                actionRef={flowActionType}
            />
        </>
    )
}

export default FlowDesign;
```

### 流程审批

```tsx
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
```

### 自定义视图拓展

* 自定义延期提醒
```tsx
 import React from "react";
import {ModalForm, ProFormDigit} from "@ant-design/pro-components";
import {PostponedFormProps} from "@codingapi/ui-framework";


const PostponedFormView:React.FC<PostponedFormProps> = (props)=>{

    return (
        <ModalForm
            title={"延期调整"}
            open={props.visible}
            modalProps={{
                onCancel: () => {
                    props.setVisible(false);
                },
                onClose: () => {
                    props.setVisible(false);
                },
                destroyOnClose:true,
            }}
            onFinish={async (values) => {
                props.onFinish(values.hours);
            }}
        >
            <ProFormDigit
                name={"hours"}
                label={"延期时间"}
                tooltip={"以当前时间开始延期，延期单位为小时"}
                addonAfter={"小时"}
                rules={[
                    {
                        required: true,
                        message: "请输入延期时间"
                    }
                ]}
            />
        </ModalForm>
    )
}

export default PostponedFormView;

```
添加自定义视图到配置中
```
import * as flowApi from "@/api/flow";
import {PostponedFormViewKey} from "@codingapi/ui-framework";
import {ComponentBus} from "@codingapi/ui-framework";
import {FlowApiContent,FlowApi} from "@codingapi/flow-pc";
import PostponedFormView from "@/components/flow/PostponedFormView";

ComponentBus.getInstance().registerComponent(PostponedFormViewKey,PostponedFormView);
```
* 自定义选人组件
```
import React, {useEffect} from "react";
import {UserSelectFormProps} from "@codingapi/ui-framework";
import {ModalForm, ProForm, ProFormSelect} from "@ant-design/pro-components";
import {users} from "@/api/user";

const UserSelectView: React.FC<UserSelectFormProps> = (props) => {

    const [form] = ProForm.useForm();

    const [userList, setUserList] = React.useState<any[]>([]);

    useEffect(() => {
        users().then((res) => {
            if (res.success) {
                const list = res.data.list.filter((item:any)=>{
                    const specifyUserIds = props.specifyUserIds;
                    if(specifyUserIds && specifyUserIds.length > 0){
                        return specifyUserIds.includes(item.id);
                    }
                });
                setUserList(list);
                // 默认选中当前用户
                form.setFieldValue("users", props.currentUserIds);
            }
        })
    }, []);

    return (
        <ModalForm
            form={form}
            open={props.visible}
            title={"用户选择（模拟测试）"}
            modalProps={{
                onCancel: () => {
                    props.setVisible(false);
                },
                onClose: () => {
                    props.setVisible(false);
                }
            }}
            onFinish={async (values) => {
                const users = values.users;
                const selectedUsers = userList.filter((item: any) => {
                    return users.includes(item.id);
                });
                props.onFinish(selectedUsers);
                props.setVisible(false);
            }}
        >
            <ProFormSelect
                mode={"tags"}
                name={"users"}
                label={"用户"}
                options={userList.map((item: any) => {
                    return {
                        label: item.name,
                        value: item.id
                    }
                })}
            />
        </ModalForm>
    )
}

export default UserSelectView;

```
然后再注册到配置中。

更多的实例请参考：https://github.com/codingapi/flow-pc/tree/main/playground

## 开发

```bash
# Install dependencies
yarn install

# Start development server
yarn dev

# Build for production
yarn build

# Run tests
yarn test
```
## 许可

Apache-2.0 © [CodingAPI](https://github.com/codingapi/flow-pc/blob/main/LICENSE)


