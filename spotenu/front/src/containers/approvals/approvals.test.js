import React from 'react'
import { shallow } from 'enzyme'
import { Approvals } from './index'
import { ButtonGroup } from '@material-ui/core'

const mockedBands = [
    {
        name: 'band1',
        id: '01'
    },
    {
        name: 'band2',
        id: '02'
    },
    {
        name: 'band3',
        id: '03'
    },
]

describe('testing approve band', () => {
    it('testing approve function', () => {
        let mockedApproval = jest.fn()
        let mockedGetAllBands = jest.fn()
        let mockedDisapproveBand = jest.fn()
        let mockedGoToHomePage = jest.fn()
        const component = shallow(<Approvals
            approveBand={mockedApproval}
            bandsList={mockedBands}
            getAllBands={mockedGetAllBands}
            disapproveBand={mockedDisapproveBand}
            goToHomePage={mockedGoToHomePage}
        />)
        const buttons = component.find(ButtonGroup)
        expect(buttons).toHaveLength(3)
    })
})