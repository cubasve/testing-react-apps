// form testing
// http://localhost:3000/login

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Login from '../../components/login'
import faker from 'faker'
import {build, fake} from '@jackfranklin/test-data-bot'

const buildLoginForm1 = build({
  fields: {
    username: fake(faker => faker.internet.userName()),
    password: fake(faker => faker.internet.password()),
  },
})

function buildLoginForm2(overrides) {
  return {
    username: faker.internet.userName(),
    password: faker.internet.password(),
    ...overrides,
  }
}

test('submitting the form calls onSubmit with username and password', async () => {
  const handleSubmit = jest.fn()
  render(<Login onSubmit={handleSubmit} />)
  const {username: usernameField, password: passwordField} = buildLoginForm2({
    username: 'chucknorris',
  })

  // screen.getByRole('textbox', {name: /username/i})
  const username = screen.getByLabelText(/username/i)
  const password = screen.getByLabelText(/password/i)
  const button = screen.getByRole('button', {name: /submit/i})

  userEvent.type(screen.getByLabelText(/username/i), usernameField)
  userEvent.type(password, passwordField)
  await userEvent.click(button)

  expect(handleSubmit).toHaveBeenCalledWith({
    username: usernameField,
    password: passwordField,
  })
  expect(handleSubmit).toHaveBeenCalledTimes(1)
  // 🐨 create a variable called "submittedData" and a handleSubmit function that
  // accepts the data and assigns submittedData to the data that was submitted
  // 💰 if you need a hand, here's what the handleSubmit function should do:
  // const handleSubmit = data => (submittedData = data)
  //
  // 🐨 render the login with your handleSubmit function as the onSubmit prop
  //
  // 🐨 get the username and password fields via `getByLabelText`
  // 🐨 use `await userEvent.type...` to change the username and password fields to
  //    whatever you want
  //
  // 🐨 click on the button with the text "Submit"
  //
  // assert that submittedData is correct
  // 💰 use `toEqual` from Jest: 📜 https://jestjs.io/docs/en/expect#toequalvalue
})

/*
eslint
  no-unused-vars: "off",
*/
