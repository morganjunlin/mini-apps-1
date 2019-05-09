class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      form_one: true,
      form_two: false,
      form_three: false,
      name: '',
      email: '',
      password: '',
      address_line_1: '',
      address_line_2: '',
      city: '',
      state: '',
      zip: 0,
      phone_number: 0,
      credit_card: 0,
      expiry_date: 0,
      cvv: 0,
      billing_zip: 0,
      id: 0
    }

    this.handleCheckout = this.handleCheckout.bind(this)
    this.handleNext = this.handleNext.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleInput = this.handleInput.bind(this)
  }

  handleCheckout(e) {
    e.preventDefault();

    const { name, email, password } = this.state

    axios.post('/api/checkout', {
      name,
      email,
      password
    })
      .then(account => this.state.id = account.data.id)
      .catch(err => console.log(`ERROR POSTING: ${err}`))

    this.setState({
      form_one: false,
      form_two: true
    })
  }

  handleNext(e) {
    e.preventDefault();

    const { address_line_1, address_line_2, city, state, zip, phone_number, id } = this.state

    axios.put('/api/checkout', {
      id: id,
      update: {
        address_line_1,
        address_line_2,
        city,
        state,
        zip,
        phone_number
      }
    })
      .catch(err => console.log(`ERROR UPDATING: ${err}, ${this.state.id}`))

    this.setState({
      form_two: false,
      form_three: true
    })
  }

  handleSubmit(e) {
    e.preventDefault()

    const { credit_card, expiry_date, cvv, billing_zip, id } = this.state

    axios.put('/api/checkout', {
      id: id,
      update: {
        credit_card,
        expiry_date,
        cvv,
        billing_zip
      }
    })
      .catch(err => console.log(`ERROR UPDATING: ${err}`))

    alert("Thank you for your purchase!")
    window.location.reload();
  }

  handleInput(e) {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  render() {
    if (this.state.form_one) {
      return (
        <div>
          <h1>Multistep Checkout Experience</h1><br />
          <h2>Account Form</h2>
          <AccountForm handleCheckout={this.handleCheckout} handleInput={this.handleInput} />
        </div>
      )
    } else if (this.state.form_two) {
      return (
        <div>
          <h1>Multistep Checkout Experience</h1><br />
          <h2>Address Form</h2>
          <AddressForm handleNext={this.handleNext} handleInput={this.handleInput} />
        </div>
      )
    } else if (this.state.form_three) {
      return (
        <div>
          <h1>Multistep Checkout Experience</h1><br />
          <h2>Payment Form</h2>
          <PaymentForm handleSubmit={this.handleSubmit} handleInput={this.handleInput} />
        </div>
      )
    }
  }
}

const AccountForm = (props) => (
  <form id="accountForm" onSubmit={props.handleCheckout}>
    Name: <input type="text" id="name" onChange={props.handleInput} /> <br />
    Email: <input type="text" id="email" onChange={props.handleInput} /> <br />
    Password: <input type="password" id="password" onChange={props.handleInput} /> <br />
    <input type="submit" value="Checkout" />
  </form>
)

const AddressForm = (props) => (
  <form id="addressForm" onSubmit={props.handleNext}>
    Address Line 1: <input type="text" id="address_line_1" onChange={props.handleInput} /> <br />
    Address Line 2: <input type="text" id="address_line_2" onChange={props.handleInput} /> <br />
    City: <input type="text" id="city" onChange={props.handleInput} /> <br />
    State: <input type="text" id="state" onChange={props.handleInput} /> <br />
    Zip: <input type="number" id="zip" onChange={props.handleInput} /> <br />
    Phone Number: <input type="number" id="phone_number" onChange={props.handleInput} /> <br />
    <input type="submit" value="Next" />
  </form>
)

const PaymentForm = (props) => (
  <form id="paymentForm" onSubmit={props.handleSubmit}>
    Credit Card: <input type="number" id="credit_card" onChange={props.handleInput} /> <br />
    Expiry Date: <input type="number" id="expiry_date" onChange={props.handleInput} /> <br />
    CVV: <input type="number" id="cvv" onChange={props.handleInput} /> <br />
    Billing Zip: <input type="number" id="billing_zip" onChange={props.handleInput} /> <br />
    <input type="submit" />
  </form>
)

ReactDOM.render(<App />, document.getElementById('app'));