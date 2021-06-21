# Dropdown
Components used to expand options or content.

```vue
<zc-dropdown @command="commandHandle">
<!-- Trigger targets, such as buttons -->
<button>Trigger targets, such as buttons</button>
<zc-dropdown-menu slot="zc-dropdown-menu">
  <zc-dropdown-item>Option one</zc-dropdown-item>
  <zc-dropdown-item :command="someEvents">Option two</zc-dropdown-item>
  <zc-dropdown-item>Option three</zc-dropdown-item>
</zc-dropdown-menu>
</zc-dropdown>
```
> Use `command` to bind some data or events on` zc-dropdown-item`, which can be obtained using `@command` on `zc-dropdown`.

## Dropdown Attributes
| Attribute | Description | Type | Accepted Values | Default |
|---|---|---|---|---|
|mode|The premise that triggers and makes the `drop-down` box appear.|String|click / ~~hover~~|click|

## Dropdown Events
| Event Name | Description | Parameters |
|---|---|---|
|command|Process the value bound in `zc-dropdown-item`.|Processing function.|

## Dropdown Menu Item Attributes
| Attribute | Description | Type | Accepted Values | Default |
|---|---|---|---|---|
|command|Bind some data or methods and expose them to the `down-drop` processing.|-|-|-|
