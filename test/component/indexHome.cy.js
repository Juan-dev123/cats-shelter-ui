import React from 'react'
import Home from '@/pages/index'

describe('<Home />', () => {
  it('renders', () => {
    cy.mount(<Home />)
    cy.get('[href="/animal/register"]').should('be.visible');
    cy.get('[href="/animal/list"]').should('be.visible');
  })
})