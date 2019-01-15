import React, {Component} from 'react';
import {CardElement, injectStripe} from 'react-stripe-elements';
import auth from '../../../services/auth';
import config from '../../../services/config.js';
import axios from 'axios';

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
  }

  async submit(ev) {
    let {token} = await this.props.stripe.createToken({name: this.props.userId});

    axios.post(`${config.apiHost}/users/${this.props.userId}/subscription`, {
      "card_token": token.id
    }).then((resp) => {
      console.log("cool");
    });

  }

  render() {
    return (
      <div className="checkout">
        <p>Would you like to complete the purchase?</p>
        <CardElement />
        <button onClick={this.submit}>Send</button>
      </div>
    );
  }
}

export default injectStripe(CheckoutForm);
