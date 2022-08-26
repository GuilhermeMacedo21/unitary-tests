import React from 'react'
import { render } from '@vtex/test-tools/react'

import Wholesale from '../components/Wholesale'

test('greets Fred', () => {
  const { queryByText } = render(<Wholesale name="Testa" />)

  expect(queryByText('Hey, Testa')).toBeInTheDocument()
})

describe('Testes do componente',() =>{
  it('Deve mostrar o nome através da prop',()=>{
    const {getByText} = render(<Wholesale name='Guilherme'/>)
    expect(getByText('Hey, Guilherme')).toBeInTheDocument()
  })
})
