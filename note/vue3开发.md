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