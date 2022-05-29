// simple test with ReactDOM
// http://localhost:3000/counter

import React from 'react'
import ReactDOM from 'react-dom'
import {act} from 'react-dom/test-utils'
import {createRoot} from 'react-dom/client'
import Counter from '../../components/counter'

// NOTE: this is a new requirement in React 18
// https://reactjs.org/blog/2022/03/08/react-18-upgrade-guide.html#configuring-your-testing-environment
// Luckily, it's handled for you by React Testing Library :)
global.IS_REACT_ACT_ENVIRONMENT = true

/**
 * Clean up your environment between each test so tests can run
 * in total isolation of each other
 */
beforeEach(() => {
  document.body.innerHTML = ''
})
test('counter increments and decrements when the buttons are clicked', () => {
  // 🐨 create a div to render your component to (💰 document.createElement)
  const div = document.createElement('div')

  // 🐨 append the div to document.body (💰 document.body.append)
  document.body.append(div)

  // 🐨 use createRoot to render the <Counter /> to the div
  ReactDOM.render(<Counter />, div)

  // 🐨 get a reference to the increment and decrement buttons:
  //   💰 div.querySelectorAll('button')
  const [decrement, increment] = div.querySelectorAll('button')

  // 🐨 get a reference to the message div:
  //   💰 div.firstChild.querySelector('div')
  // 🐨 expect the message.textContent toBe 'Current count: 0'
  const message = div.firstChild.querySelector('div')
  expect(message.textContent).toBe('Current count: 0')

  // 🐨 click the increment button (💰 act(() => increment.click()))
  // 🐨 assert the message.textContent
  increment.click()
  expect(message.textContent).toBe('Current count: 1')
  // 🐨 click the decrement button (💰 act(() => decrement.click()))
  // 🐨 assert the message.textContent
  decrement.click()
  expect(message.textContent).toBe('Current count: 0')
  // 🐨 cleanup by removing the div from the page (💰 div.remove())
  // 🦉 If you don't cleanup, then it could impact other tests and/or cause a memory leak
  // div.remove() --> No longer needed bc of beforeEach
})

/* eslint no-unused-vars:0 */
