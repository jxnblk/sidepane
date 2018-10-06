import React from 'react'
import styled from 'styled-components'
import { Flex, Box } from '@rebass/grid'
import Sidepane from '../src'

export const Root = props =>
  <Flex>
    <Sidepane
      bg='#f6f6ff'>
      <Box>
        Sidepane.Bar
        <hr />
        <a href='https://github.com/jxnblk/sidepane'>GitHub</a>
      </Box>
    </Sidepane>
    <Container>
      {props.children}
    </Container>
  </Flex>

export const Container = props =>
  <Box
    {...props}
    width={1}
    p={4}
    mx='auto'
    css={{
      maxWidth: '768px',
    }}
  />
