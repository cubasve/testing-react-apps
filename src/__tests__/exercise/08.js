// testing custom hooks
// http://localhost:3000/counter-hook

import * as React from 'react'
import {render, screen, act} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import useCounter from '../../components/use-counter'

// We cannot reassign a variable and expect this binding to update to the same
// object that we're setting
// SOLUTION: Create a single object, return that object, and then update itß
function setup({initialProps} = {}) {
  let result = {}
  function TestComponent() {
    result.current = useCounter(initialProps)
    return null
  }
  render(<TestComponent />)
  return result
}

// 🐨 create a simple function component that uses the useCounter hook
// and then exposes some UI that our test can interact with to test the
// capabilities of this hook
// 💰 here's how to use the hook:
// const {count, increment, decrement} = useCounter()

test('exposes the count and increment/decrement functions', async () => {
  // Use case: difficult to create a component that resembles the way that
  // people typically use your hook, esp for covering different edge cases
  const result = setup()

  /**
   * Use act when you are going to trigger an update
   * 
   * After callback is finished (i.e. result.increment()), flush all the side effects,
   * React useEffect callbacks, etc. so next line of code has a stable component to interact with
   * - No intermediary state where effects haven't been run yet
  
   */
  expect(result.current.count).toBe(0)
  act(() => result.current.increment())
  expect(result.current.count).toBe(1)
  act(() => result.current.decrement())
  expect(result.current.count).toBe(0)
  /*
  // 🐨 get the elements you need using screen
  const increment = screen.getByRole('button', {name: /increment/i})
  const decrement = screen.getByRole('button', {name: /decrement/i})
  const message = screen.getByText(/current count/i)

  // 🐨 assert on the initial state of the hook
  expect(message).toHaveTextContent('Current count: 0')
  await userEvent.click(increment)
  expect(message).toHaveTextContent('Current count: 1')
  await userEvent.click(decrement)
  expect(message).toHaveTextContent('Current count: 0')
  // 🐨 interact with the UI using userEvent and assert on the changes in the UI
  */
})

test('allows customization of the initial count', async () => {
  // const result = setup({initialProps: {initialCount: 3}})
  let result
  function TestComponent() {
    result = useCounter({initialCount: 3})
    return null
  }
  // 🐨 render the component
  render(<TestComponent />)

  expect(result.count).toBe(3)
  act(() => result.increment())
  expect(result.count).toBe(4)
  act(() => result.decrement())
  expect(result.count).toBe(3)
})

test('allows customization of the step', async () => {
  // const result = setup({initialProps: {step: 2}})
  let result
  function TestComponent() {
    result = useCounter({step: 2})
    return null
  }
  // 🐨 render the component
  render(<TestComponent />)

  expect(result.count).toBe(0)
  act(() => result.increment())
  expect(result.count).toBe(2)
  act(() => result.decrement())
  expect(result.count).toBe(0)
})

/* eslint no-unused-vars:0 */
