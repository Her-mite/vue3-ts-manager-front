# js相关
## 模块导入导出
```js
// 方式一
module.exports = Share.getInstance();
const Share = require('Share')

// 方式二
export default GSVarbiles.getInstance();
import GSVarbiles from './GSVarbiles'
```