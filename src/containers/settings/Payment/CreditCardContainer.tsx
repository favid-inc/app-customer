import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import { CreditCard } from './CreditCard';
interface CreditCardContainerProps {
  // loading: boolean;
  onSend: (creditCard) => void;
}

class CreditCardContainerComponent extends Component<CreditCardContainerProps> {
  public render(): React.ReactNode {
    const { onSend } = this.props;
    return <CreditCard loading={false} onSend={onSend} />;
  }
}

// const mapStateToProps = ({ payment }) => {
//   return {
//     loading: payment.loading,
//     creditCard: payment.creditCard,
//   };
// };

const mapDispatchToProps = dispatch => ({
  onSend: creditCard => dispatch(actions.onSendPayment(creditCard)),
});

export const CreditCardContainer = connect(
  null,
  mapDispatchToProps,
)(CreditCardContainerComponent);
