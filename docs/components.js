import React from 'react'
import styled from 'styled-components'
import Sidepane, { withSidepane } from '../src'

export const Root = props =>
  <Sidepane>
    <Sidepane.Bar>
      <Box>
        Sidepane.Bar
        <hr />
        <a href='https://github.com/jxnblk/sidepane'>GitHub</a>
      </Box>
    </Sidepane.Bar>
    <Sidepane.Main>
      <Container>
        {props.children}
      </Container>
    </Sidepane.Main>
  </Sidepane>

export const Button = styled(withSidepane(({
  paneOpen,
  togglePane,
  openPane,
  closePane,
  ...props
}) => (
  <button {...props} onClick={togglePane}>
    {props.children}
  </button>
)))({
  '@media screen and (min-width: 32em)': {
    display: 'none'
  }
})

export const Box = props =>
  <div
    {...props}
    style={{
      padding: 32
    }}
  />

export const Container = props =>
  <div
    {...props}
    style={{
      maxWidth: 768,
      margin: 'auto',
      padding: 32
    }}
  />
