import React from 'react'
import { shallow } from 'enzyme'
import { Approvals } from './index'

describe('testing approve band', ()=>{
    let mockedApproval = jest.fn(()=>{})
    const component = shallow(<Approvals approveBand = {mockedApproval}/>)
    component.instance.approveBand('id')
    expect(mockedApproval).toHaveBeenCalledWith('id')
})