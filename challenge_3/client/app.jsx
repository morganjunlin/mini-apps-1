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
      billing_zip: 0
    }

    this.handleCheckout = this.handleCheckout.bind(this)
    this.handleNext = this.handleNext.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleInput = this.handleInput.bind(this)
  }

  // TODO: POST new record on submit
  handleCheckout(e) {
    e.preventDefault();

    this.setState({
      form_one: false,
      form_two: true
    })

    document.getElementById('form1').reset();
  }

  // TODO: find key and perform Axios PUT on submit
  handleNext(e) {
    e.preventDefault();
    
    this.setState({
      form_two: false,
      form_three: true
    })

    document.getElementById('form2').reset();
  }

  // TODO: find key and perform Axios PUT on submit
  handleSubmit(e) {
    e.preventDefault()

    const { name, email, password, address_line_1, address_line_2, city, state, zip, phone_number, credit_card, expiry_date, cvv, billing_zip } = this.state

    axios.post('/api/checkout', {
      name,
      email,
      password,
      address_line_1,
      address_line_2,
      city,
      state,
      zip,
      phone_number,
      credit_card,
      expiry_date,
      cvv,
      billing_zip
    })
      .catch(err => console.log(`ERROR POSTING: ${err}`))

    alert("Thank you for your purchase!")
    window.location.reload();
  }

  handleInput(e) {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  // TODO: create additional components to handle different forms
  render() {
    if (this.state.form_one) {
      return (
        <div>
          <h1>Checkout Form</h1>
          <form id="form1" onSubmit={this.handleCheckout}>
            Name: <input type="text" id="name" onChange={this.handleInput} /> <br />
            Email: <input type="text" id="email" onChange={this.handleInput} /> <br />
            Password: <input type="password" id="password" onChange={this.handleInput} /> <br />
            <input type="submit" value="Checkout" />
          </form>
        </div>
      )
    } else if (this.state.form_two) {
      return (
        <div>
          <h1>Address Form</h1>
          <form id="form2" onSubmit={this.handleNext}>
            Address Line 1: <input type="text" id="address_line_1" onChange={this.handleInput} /> <br />
            Address Line 2: <input type="text" id="address_line_2" onChange={this.handleInput} /> <br />
            City: <input type="text" id="city" onChange={this.handleInput} /> <br />
            State: <input type="text" id="state" onChange={this.handleInput} /> <br />
            Zip: <input type="number" id="zip" onChange={this.handleInput} /> <br />
            Phone Number: <input type="number" id="phone_number" onChange={this.handleInput} /> <br />
            <input type="submit" value="Next" />
          </form>
        </div>
      )
    } else if (this.state.form_three) {
      return (
        <div>
          <h1>Credit Card Form</h1>
          <form id="form3" onSubmit={this.handleSubmit}>
            Credit Card: <input type="number" id="credit_card" onChange={this.handleInput} /> <br />
            Expiry Date: <input type="number" id="expiry_date" onChange={this.handleInput} /> <br />
            CVV: <input type="number" id="cvv" onChange={this.handleInput} /> <br />
            Billing Zip: <input type="number" id="billing_zip" onChange={this.handleInput} /> <br />
            <input type="submit" />
          </form>
        </div>
      )
    }
  }
}

ReactDOM.render(<App />, document.getElementById('app'));