class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      accountForm: true,
      addressForm: false,
      paymentForm: false,
      submitForm: false,
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
      id: 0,
      information: []
    }

    this.handleCheckout = this.handleCheckout.bind(this)
    this.handleAddress = this.handleAddress.bind(this)
    this.handlePayment = this.handlePayment.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleInput = this.handleInput.bind(this)
    this.handleData = this.handleData.bind(this)
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
      accountForm: false,
      addressForm: true
    })
  }

  handleAddress(e) {
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
      addressForm: false,
      paymentForm: true
    })
  }

  handlePayment(e) {
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
      .then(() => this.handleData())
      .catch(err => console.log(`ERROR UPDATING: ${err}`))

    this.setState({
      paymentForm: false,
      submitForm: true
    })
  }

  handleSubmit(e) {
    e.preventDefault()

    alert("Thank you for your purchase!")
    window.location.reload();
  }

  handleInput(e) {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleData() {
    let arr = []
    let obj = {}

    for (let key in this.state) {
      if (key !== 'accountForm' && key !== 'addressForm' && key !== 'paymentForm' && key !== 'submitForm' && key !== 'id' && key !== 'information') {
        obj[key] = this.state[key]
        arr.push(obj)
        obj = {}
      }
    }

    this.setState({
      information: arr
    })
  }

  render() {
    if (this.state.accountForm) {
      return (
        <div>
          <h1>Multistep Checkout Experience</h1><br />
          <h2>Account Form</h2>
          <AccountForm handleCheckout={this.handleCheckout} handleInput={this.handleInput} />
        </div>
      )
    } else if (this.state.addressForm) {
      return (
        <div>
          <h1>Multistep Checkout Experience</h1><br />
          <h2>Address Form</h2>
          <AddressForm handleAddress={this.handleAddress} handleInput={this.handleInput} />
        </div>
      )
    } else if (this.state.paymentForm) {
      return (
        <div>
          <h1>Multistep Checkout Experience</h1><br />
          <h2>Payment Form</h2>
          <PaymentForm handlePayment={this.handlePayment} handleInput={this.handleInput} />
        </div>
      )
    } else if (this.state.submitForm) {
      return (
        <div>
          <h1>Multistep Checkout Experience</h1><br />
          <h2>Confirm Information</h2>
          <SubmitForm handleSubmit={this.handleSubmit} information={this.state.information} />
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
  <form id="addressForm" onSubmit={props.handleAddress}>
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
  <form id="paymentForm" onSubmit={props.handlePayment}>
    Credit Card: <input type="number" id="credit_card" onChange={props.handleInput} /> <br />
    Expiry Date: <input type="number" id="expiry_date" onChange={props.handleInput} /> <br />
    CVV: <input type="number" id="cvv" onChange={props.handleInput} /> <br />
    Billing Zip: <input type="number" id="billing_zip" onChange={props.handleInput} /> <br />
    <input type="submit" value="Next" />
  </form>
)

const SubmitForm = (props) => (
  <form id="submitForm" onSubmit={props.handleSubmit}>
    <List information={props.information} /> <br />
    <input type="submit" value="Purchase" />
  </form>
)

const List = (props) => (
  <div>
    {props.information.map((item, index) => <ListItem key={index} item={item} />)}
  </div>
)

const ListItem = (props) => (
  <div>
    {Object.keys(props.item)[0]}: {Object.values(props.item)[0]}
  </div>
)

ReactDOM.render(<App />, document.getElementById('app'));