import test from 'ava'
import React from 'react'
import TestRenderer from 'react-test-renderer'
import Sidepane from '../src'

test('renders', t => {
  const json = TestRenderer.create(<Sidepane />).toJSON()
  t.snapshot(json)
})
