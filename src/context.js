import React from 'react'

export const Context = React.createContext()

export const withSidepane = Component => React.forwardRef((props, ref) => (
  <Context.Consumer
    children={context => (
      <Component
        {...props}
        {...context}
        ref={ref}
      />
    )}
  />
))
