
# sidepane

Responsive React sidebar component

```sh
npm i sidepane
```

```jsx
import React from 'react'
import Sidepane from 'sidepane'
import { Flex, Box } from '@rebass/grid'

export default props =>
  <Flex>
    <Sidepane>
      This is sidebar content
    </Sidepane>
    <Box
      px={3}
      py={4}
      mx='auto'
      css={{
        maxWidth: '768px'
      }}>
      This is the main content
    </Box>
  </Flex>
```

MIT License

