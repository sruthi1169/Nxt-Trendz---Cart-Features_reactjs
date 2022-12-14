import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item

  // remove a item from the cartlist first we get the id and then if the id is not equal to the item id then remove from the list and update a new carList
  removeCartItem = id => {
    const {cartList} = this.state
    const updatedCartList = cartList.filter(eachId => eachId.id !== id)
    this.setState({cartList: updatedCartList})
  }

  // here what we wrote on this method is firs we get the cartlist and the iterate over the cartlist get the item id if id is equal then increment by 1 and return the eachItem & updated quantity
  incrementCartItemQuantity = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(eachId => {
        if (id === eachId.id) {
          const updatedQuantity = eachId.quantity + 1
          return {...eachId, quantity: updatedQuantity}
        }
        return eachId
      }),
    }))
  }

  // here we first we take the cartlist from state later find the cartlist eachitem id and if eachItem id is greater than 1 then remove the item from the list.
  decrementCartItemQuantity = id => {
    const {cartList} = this.state
    const productObjItem = cartList.find(
      eachObjectItem => eachObjectItem.id === id,
    )
    if (productObjItem.quantity > 1) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(eachItem => {
          if (id === eachItem.id) {
            const updatedQuantity = eachItem.quantity - 1
            return {...eachItem, quantity: updatedQuantity}
          }
          return eachItem
        }),
      }))
    } else {
      this.removeCartItem(id)
    }
  }

  // remove all the the items in the cart list
  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  // add a unique item to the cart that means if we select on item in products later we again select a same item  on that time we only add one item in the cart duplicate item quantity will be updated

  addCartItem = product => {
    // this.setState(prevState => ({cartList: [...prevState.cartList, product]})) => this line is only add the items in the cart
    //   TODO: Update the code here to implement addCartItem

    // the below code is add a unique item in the cart
    const {cartList} = this.state
    const productObject = cartList.find(eachItem => eachItem.id === product.id) // first find the item id

    // if the same product item is found add the item quantity and then display the item
    if (productObject) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(eachItem => {
          if (productObject.id === eachItem.id) {
            const updatedQuantity = eachItem.quantity + product.quantity // same item is found then update the quantity
            return {...eachItem, quantity: updatedQuantity} // finally return the updated Quantity list
          }
          return eachItem
        }),
      }))
    }

    // else return the empty list
    else {
      const updatedCartList = [...cartList, product]
      this.setState({cartList: updatedCartList})
    }
  }

  render() {
    const {cartList} = this.state

    return (
      // updating all the context methods
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          removeAllCartItems: this.removeAllCartItems,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
