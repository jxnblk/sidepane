import React from 'react'
import { Sidepane, withSidepane } from '../src'

export const Root = props =>
  <Sidepane
  >
    {props.children}
  </Sidepane>

export const Button = withSidepane(props => (
  <button onClick={props.togglePane}>
    {props.children}
    <code>{props.paneOpen ? 'open' : 'closed'}</code>
  </button>
))
