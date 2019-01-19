import React, {Component} from 'react';
import {CardElement, injectStripe} from 'react-stripe-elements';
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
      if (this.props.cb) {
        this.props.cb();
      }
    });

  }

  render() {
    return (
      <div className="checkout">
        <p>Subscribe for <strong>$1</strong> per month, cancel anytime</p>
        <CardElement />
        <button onClick={this.submit}>Subscribe for $1</button>
      </div>
    );
  }
}

export default injectStripe(CheckoutForm);
