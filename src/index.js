import React from 'react'

const Context = React.createContext()

const toggle = state => ({ paneOpen: !state.paneOpen })
const close = state => ({ paneOpen: false })
const open = state => ({ paneOpen: true })

export const Style = ({ css }) =>
  <style
    dangerouslySetInnerHTML={{
      __html: css
    }}
  />

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

const Root = props =>
  <div
    {...props}
    className='sidepane-root'
  />

const Pane = withSidepane(({
  paneOpen,
  togglePane,
  closePane,
  openPane,
  ...props
}) => (
  <div
    {...props}
    className='sidepane-pane'
    style={{
      ...props.style,
      transform: paneOpen ? null : 'translateX(-100%)'
    }}
  />
))

const Main = props =>
  <div
    {...props}
    className='sidepane-main'
  />

const Overlay = props =>
  <div
    {...props}
    className='sidepane-overlay'
  />

const Spacer = props =>
  <div
    {...props}
    className='sidepane-spacer'
  />


export class Sidepane extends React.Component {
  state = {
    paneOpen: false,
  }

  update = (...args) => this.setState(...args)

  render () {
    const {
      open,
      width = 256,
      breakpoint = '32em',
      onClose,
      children
    } = this.props

    const { paneOpen } = this.state

    const context = {
      ...this.state,
      togglePane: () => {
        console.log('toggle')
        this.update(toggle)
      },
      closePane: () => this.update(close),
      openPane: () => this.update(open),
    }

    const cssLarge = `@media screen and (min-width:${breakpoint}){${css.large}}`

    const styles = [
      <Style key='base' css={css.base} />,
      <Style key='desktop' css={cssLarge} />
    ]

    return (
      <Context.Provider value={context}>
        {styles}
        <Root>
          {(open || paneOpen) && (
            <Overlay
              onClick={e => {
                if (typeof onClose === 'function') {
                  onClose(e)
                } else {
                  this.update(close)
                }
              }}
            />
          )}
          <Pane style={{ width }}>
            Pane tk
          </Pane>
          <Spacer style={{ width }} />
          <Main>
            {this.props.children}
          </Main>
        </Root>
      </Context.Provider>
    )
  }
}

const css = {
  base: `
.sidepane-root {
  display: flex;
  width: 100%;
}
.sidepane-pane {
  background-color: #eee;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  transition-property: transform;
  transition-duration: .2s;
  transition-timing-function: ease-out;
}
.sidepane-spacer {
  flex: none;
  display: none;
}
.sidepane-main {
  width: 100%;
  min-width: 0;
  min-height: 100vh;
}
.sidepane-overlay {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
`,
  large: `
.sidepane-pane {
  transform: none !important;
}
.sidepane-spacer {
  display: block;
}
.sidepane-overlay {
  display: none !important;
}
`
}

export default Sidepane
