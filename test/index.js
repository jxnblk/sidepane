import React from 'react'
import TestRenderer from 'react-test-renderer'
import Sidepane from '../src'

test('renders', () => {
  const json = TestRenderer.create(<Sidepane />).toJSON()
  expect(json).toMatchSnapshot()
})
