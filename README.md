# go-split
Splitter for React

- Style how you like (className, style)
- No extra styles
- Implement based on flexbox

# Usage

```js
import { Split, Pane, Resizer, SplitContext } from "go-split";

<Split sticky={80} minSize={200} maxSize={400}>
      <Pane style={{ flex: "0 1 auto" }} main={true}>
        Not so long text
      </Pane>
      <Resizer>You can place controls here and use <code>SplitContext</code></Resizer>
      <Pane>
        <Split split={"horizontal"} sticky={80}>
          <Pane style={{ flex: "0 1 auto" }} main={true}>
            Splitter take minimum size
          </Pane>
          <Resizer/>
          <Pane>
            Text
          </Pane>
        </Split>
      </Pane>
    </Split>
```
[Live](https://codesandbox.io/s/go-split-2vcvz)