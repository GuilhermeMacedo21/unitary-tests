import React from 'react'
import { render, screen, fireEvent } from '@vtex/test-tools/react'
import Wholesale from '../components/Wholesale'
import { useProduct } from 'vtex.product-context'

const mockedUseProduct = useProduct

mockedUseProduct.mockImplementation(() => ({
  selectedItem: {
    sellers: [
      {
        commertialOffer: {
          AvailableQuantity: 150,
          Price: 100
        }
      },
    ],
  }
}))


describe('Wholesale component tests', () => {
  it('Should render the component', () => {
    render(<Wholesale discount={5} totalDiscount={50} />)
  })
})

describe('Button component tests', () => {

  it('Should not show the message without click the button', () => {
    const { queryByText } = render(<Wholesale discount={5} totalDiscount={50} />)
    expect(queryByText("Preço total com desconto: R$ 0,00")).not.toBeInTheDocument()
  })

  it('Should show the message when click the button', () => {
    const { getByText } = render(<Wholesale discount={5} totalDiscount={50} />)

    const button = screen.getByText('Verificar desconto')
    fireEvent.click(button)

    expect(getByText('Preço total com desconto: R$ 0,00')).toBeInTheDocument()
  })

  it('Should calculate the discount and show in the div', () => {
    const { getByText } = render(<Wholesale discount={5} totalDiscount={50} />)
    const button = screen.getByText('Verificar desconto')
    const num = screen.getByTestId('inputNumber')

    fireEvent.change(num, { target: { value: 100 } });
    fireEvent.click(button)

    expect(getByText('Preço total com desconto: R$ 9.500,00')).toBeInTheDocument()
  })
});

describe('Increase and decrease button tests', () => {

  it('Should increase in 50 the number in input', () => {
    const { getByTestId } = render(<Wholesale discount={5} totalDiscount={50} />)

    const increase = screen.getByTestId('increase')
    fireEvent.click(increase)

    expect(getByTestId('inputNumber').value).toEqual('50')
  })

  it('Should decrease in 50 the number in input', () => {
    const { getByTestId } = render(<Wholesale discount={5} totalDiscount={50} />)
    const num = screen.getByTestId('inputNumber')
    const decrease = screen.getByTestId('decrease')

    fireEvent.change(num, { target: { value: 100 } });
    fireEvent.click(decrease)

    expect(getByTestId('inputNumber').value).toEqual('50')
  })

  it('Should not be under 0 in input', () => {
    const { getByTestId } = render(<Wholesale discount={5} totalDiscount={50} />)

    const decrease = screen.getByTestId('decrease')
    fireEvent.click(decrease)

    expect(getByTestId('inputNumber').value).toEqual('')
  })

  it('Should stop increase in 150', () => {
    const { getByTestId } = render(<Wholesale discount={5} totalDiscount={50} />)
    const increase = screen.getByTestId('increase')
    const num = screen.getByTestId('inputNumber')

    fireEvent.change(num, { target: { value: 150 } });
    fireEvent.click(increase)

    expect(getByTestId('inputNumber').value).toEqual('150')
  })

  it('Should insert in input', () => {
    render(<Wholesale discount={5} totalDiscount={50} />)
    const num = screen.getByTestId('inputNumber')
    const numWrite = 125;

    fireEvent.change(num, { target: { value: numWrite } });

    expect(num.value).toEqual('125')
  })
});