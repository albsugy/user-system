import React from 'react'
import { shallow } from 'enzyme'
import Button from './../components/Button'

describe('Button', () => {
  it('renders Button with label', () => {
    const wrapper = shallow(<Button label='Add User' />)
    const label = 'Add User'
    expect(wrapper.contains(label)).toEqual(true)
  })

  it('renders the button', () => {
    const wrapper = shallow(<Button />)
    expect(wrapper.find('button')).toHaveLength(1)
  })
})
