# vue3 开发笔记
## setup和defineComponent
> setup函数: 在组件创建前执行，在setup执行完成后，其他生命周期函数才会执行
* 基本语法
```js
/**
 * props:父组件传递数据， 响应式，传入新的props将被更新
 * context: 组件执行上下文，包括attrs, slots, emit
 */
import { defineComponent } from 'vue'

export default defineComponent({
  setup (props, context) {
    // 业务代码写这里...
    
    return {
      // 需要给template用的数据、函数放这里return出去...
    }
  }
})
```
> defineComponent : 用于typescript类型的推导，简化编写过程中的类型定义步骤，专注于业务实现
### 生命周期
vue3中生命周期需要导入才能使用

2.x 生命周期|3.x生命周期|执行时机
--|--|--
beforeCreate|	setup|	组件创建前执行
created| setup|	组件创建后执行
beforeMount|	onBeforeMount|	组件挂载到节点上之前执行
mounted|	onMounted|	组件挂载完成后执行
beforeUpdate|	onBeforeUpdate|	组件更新之前执行
updated|	onUpdated|	组件更新完成之后执行
beforeDestroy|	onBeforeUnmount|	组件卸载之前执行
destroyed|	onUnmounted|	组件卸载完成后执行

### refs 响应式API
它可以用来定义所有类型的数据，包括 Node 节点。
```js
// 单类型
const msg = ref<string>('Hello World!');

// 多类型
const phoneNumber = ref<number | string>(13800138000);

// 声明对象的格式
interface Member {
  id: number,
  name: string
};

// 定义一个成员对象
const userInfo = ref<Member>({
  id: 1,
  name: 'Tom'
});

// 数字数组
const uids = ref<number[]>([ 1, 2, 3 ]);

// 字符串数组
const names = ref<string[]>([ 'Tom', 'Petter', 'Andy' ]);
```
### reactive 响应式API
局限性： 只使用于对象，数组
```js
// 声明对象的格式
interface Member {
  id: number,
  name: string
};

// 定义一个成员对象
const userInfo: Member = reactive({
  id: 1,
  name: 'Tom'
});
```