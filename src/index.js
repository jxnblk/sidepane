import React from 'react'

const css = `.sidepane-spacer { display: none }
@media screen and (min-width: 40em) {
.sidepane-root { transform: none !important }
.sidepane-spacer { display: block }
}`

const style = <style
  dangerouslySetInnerHTML={{
    __html: css
  }}
/>

const toggle = state => ({ isOpen: !state.isOpen })
const close = state => ({ isOpen: false })
const open = state => ({ isOpen: true })

export const Root = React.forwardRef(({
  width,
  color,
  bg,
  open,
  style,
  ...props
}, ref) =>
  <div
    {...props}
    ref={ref}
    className='sidepane-root'
    style={{
      width,
      color,
      backgroundColor: bg,
      transform: open ? 'none' : 'translateX(-100%)',
      position: 'fixed',
      top: 0,
      left: 0,
      bottom: 0,
      overflowY: 'auto',
      WebkitOverflowScrolling: 'touch',
      transitionProperty: 'transform',
      transitionDuration: '.2s',
      transitionTimingFunction: 'ease-out',
      ...style
    }}
  />
)

export const Spacer = ({
  width,
  ...props
}) =>
  <div
    {...props}
    className='sidepane-spacer'
    style={{
      width,
      flex: 'none',
    }}
  />

export const MenuIcon = ({
  size = 24,
  ...props
}) =>
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    width={size}
    height={size}
    style={{
      display: 'block'
    }}>
    <path d='M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z' />
  </svg>

export const MenuButton = React.forwardRef((props, ref) =>
  <button
    {...props}
    ref={ref}
    title='Toggle Menu'
    children={<MenuIcon />}
    style={{
      position: 'fixed',
      top: 0,
      left: 0,
      appearance: 'none',
      border: 0,
      margin: 0,
      padding: '0.5em',
      outline: 'none',
    }}
  />
)

export class Sidepane extends React.Component {
  static defaultProps = {
    Toggle: MenuButton,
    width: 256,
    bg: 'white',
  }

  state = {
    isOpen: false
  }

  toggle = React.createRef()

  update = fn => this.setState(fn)

  handleDocumentClick = e => {
    if (this.toggle.current.contains(e.target)) return
    this.update(close)
  }

  componentDidMount () {
    document.addEventListener('click', this.handleDocumentClick)
  }

  componentWillUnmount () {
    document.removeEventListener('click', this.handleDocumentClick)
  }

  render () {
    const { isOpen } = this.state
    const {
      width,
      Toggle,
      ...props
    } = this.props

    return (
      <>
        {style}
        <Toggle
          ref={this.toggle}
          onClick={e => {
            e.stopPropagation()
            this.update(toggle)
          }}
        />
        <Spacer width={width} />
        <Root
          open={isOpen}
          width={width}
          {...props}
        />
      </>
    )
  }
}

export default Sidepane
