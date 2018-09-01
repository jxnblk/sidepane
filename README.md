
# sidepane

Responsive React sidebar component

```sh
npm i sidepane
```

```jsx
import React from 'react'
import Sidepane from 'sidepane'

export default props =>
  <Sidepane>
    <Sidepane.Bar>
      This is sidebar content
    </Sidepane.Bar>
    <Sidepane.Main>
      This is the main content
    </Sidepane.Main>
  </Sidepane>
```

```jsx
// with render props
import React from 'react'
import Sidepane from 'sidepane'

export default props =>
  <Sidepane
    render={(pane) => (
      <React.Fragment>
        <Sidepane.Bar>
          Sidebar
        </Sidepane.Bar>
        <Sidepane.Main>
          Main content
          <button onClick={e => pane.toggle()}>
            Toggle Menu
          </button>
        </Sidepane.Main>
      </React.Fragment>
    )}
  />
```

## API

- `Sidepane`
- `Sidepane.Bar`
- `Sidepane.Main`
- `withSidepane`

To do:

- [x] Compound component API
- [x] Render prop API
- [x] merge className
- [ ] readme
- [ ] tests
- [ ] focus trap
- [ ] more robust mobile scrolling
- [ ] docs for styling
- [ ] API docs

MIT License

