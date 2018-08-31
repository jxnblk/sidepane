import React from 'react'


const Context = React.createContext()

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

export const Style = ({ css }) =>
  <style
    dangerouslySetInnerHTML={{
      __html: css
    }}
  />

const toggle = state => ({ paneOpen: !state.paneOpen })
const close = state => ({ paneOpen: false })
const open = state => ({ paneOpen: true })

export class Provider extends React.Component {
  state = {
    paneOpen: false,
  }

  update = (...args) => this.setState(...args)

  render () {
    const {
      children,
      breakpoint = '32em'
    } = this.props
    const context = {
      ...this.state,
      togglePane: () => {
        console.log('toggle')
        this.update(toggle)
      },
      closePane: () => this.update(close),
      openPane: () => this.update(open),
    }
    console.log(this.state)

    const cssLarge = `@media screen and (min-width:${breakpoint}){${css.large}}`
    const styles = [
      <Style key='base' css={css.base} />,
      <Style key='desktop' css={cssLarge} />
    ]

    return (
      <Context.Provider value={context}>
        {styles}
        {children}
      </Context.Provider>
    )
  }
}

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

const Overlay = withSidepane(({
  paneOpen,
  togglePane,
  openPane,
  closePane,
  ...props
}) => paneOpen &&
  <div
    {...props}
    className='sidepane-overlay'
    onClick={closePane}
  />
)

const Spacer = props =>
  <div
    {...props}
    className='sidepane-spacer'
  />


export class Sidepane extends React.Component {
  render () {
    const {
      width = 256,
      children
    } = this.props
    return (
      <Provider>
        <Root>
          <Overlay />
          <Pane style={{ width }}>
            Pane tk
          </Pane>
          <Spacer style={{ width }} />
          <Main>
            {this.props.children}
          </Main>
        </Root>
      </Provider>
    )
  }
}
