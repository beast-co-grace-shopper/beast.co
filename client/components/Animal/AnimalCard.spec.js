/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {AnimalCard} from './AnimalCard'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('AnimalCard', () => {
  let animalCard
  const animal = {photo: '/image/bunny.jpg', name: 'Cody', cost: 1200}

  beforeEach(() => {
    animalCard = shallow(<AnimalCard animal={animal} />)
  })

  it('renders the name in an h1', () => {
    expect(animalCard.find('h1').text()).to.be.equal(animal.name)
  })
})
