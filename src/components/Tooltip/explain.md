# Tooltip
> 用于展示鼠标 hover 时的提示信息

---

考虑到tooltip组件大部分时间至少用于普通的显示一些文案提示，所以这里使用 vue 的指令。

```vue
<button v-rb-tip.left="'执行操作的一些说明'">目标元素</button>
```

当然有时候我们可能需要往 tooltip 塞一些自定义显示的内容或者是可交互内容，这时候指令也可提供一些自定义的配置：

```vue
<button v-rb-tip="content">目标元素</button>
```

您可以在vue指令后追加基于目标元素希望显示位置
```vue
<button v-rb-tip.left="'位于左侧'">执行</button>

<button v-rb-tip.bottom="'位于下侧'">执行</button>

<button v-rb-tip.right="'位于右侧'">执行</button>

<button v-rb-tip.top="'位于上侧'">执行</button>
```