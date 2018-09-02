import React from 'react'
import { withSidepane } from './context'

const classnames = (...args) => args.filter(Boolean).join(' ')

export const Root = props =>
  <div
    {...props}
    className={classnames('sidepane-root', props.className)}
  />

export const Pane = withSidepane(({
  paneOpen,
  togglePane,
  closePane,
  openPane,
  ...props
}) => (
  <div
    {...props}
    className={classnames('sidepane-bar', props.className)}
    style={{
      ...props.style,
      transform: paneOpen ? null : 'translateX(-100%)'
    }}
  />
))

export const Main = props =>
  <div
    {...props}
    className={classnames('sidepane-main', props.className)}
  />

export const Overlay = props =>
  <div
    {...props}
    className={classnames('sidepane-overlay', props.className)}
  />

export const Spacer = props =>
  <div
    {...props}
    className={classnames('sidepane-spacer', props.className)}
  />

export const Bar = withSidepane(({
  paneOpen,
  openPane,
  closePane,
  togglePane,
  width,
  ...props
}) => (
  <React.Fragment>
    {paneOpen && <Overlay onClick={closePane} />}
    <Spacer style={{ width }} />
    <Pane
      {...props}
      style={{
        ...props.style,
        width
      }}
    />
  </React.Fragment>
))

Bar.defaultProps = {
  width: 256
}

