import React from 'react'
import css from './css'
import {
  Root,
  Main,
  Bar,
} from './ui'
import { Context } from './context'

const toggle = state => ({ paneOpen: !state.paneOpen })
const close = state => ({ paneOpen: false })
const open = state => ({ paneOpen: true })

export const Style = ({ css }) =>
  <style
    dangerouslySetInnerHTML={{
      __html: css
    }}
  />

export class Sidepane extends React.Component {
  static Bar = Bar
  static Main = Main

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
      render,
      children
    } = this.props
    const context = {
      ...this.state,
      togglePane: () => this.update(toggle),
      closePane: () => this.update(close),
      openPane: () => this.update(open),
    }

    const cssLarge = `@media screen and (min-width:${breakpoint}){${css.large}}`
    const styles = [
      <Style key='base' css={css.base} />,
      <Style key='desktop' css={cssLarge} />
    ]

    if (typeof render === 'function') {
      return (
        <Context.Provider value={context}>
          {styles}
          <Root>
            {render(context)}
          </Root>
        </Context.Provider>
      )
    }

    return (
      <Context.Provider value={context}>
        {styles}
        <Root>
          {this.props.children}
        </Root>
      </Context.Provider>
    )
  }
}

export default Sidepane
