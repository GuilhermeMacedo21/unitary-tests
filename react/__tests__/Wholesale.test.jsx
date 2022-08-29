import React from 'react'
import { render } from '@vtex/test-tools/react'
import Wholesale from '../components/Wholesale'
import { useProduct } from 'vtex.product-context'

const mockedUseProduct = useProduct

mockedUseProduct.mockImplementation(() => ({
  selectedItem: {
    sellers: [
      {
        commertialOffer: {
          AvailableQuantity: 5000,
          Price: 100
        }
      },
    ],
  }
}))


describe('Wholesale', () => {
  it('Should render the component', () => {
    render(<Wholesale discount={5} totalDiscount={50} />)
  })
})
