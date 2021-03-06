'use strict'

import './mailboxList.less'

const React = require('react')
const flux = {
  mailbox: require('../../stores/mailbox')
}
const MailboxListItem = require('./MailboxListItem')

module.exports = React.createClass({
  displayName: 'MailboxList',

  /* **************************************************************************/
  // Lifecycle
  /* **************************************************************************/

  componentDidMount: function () {
    flux.mailbox.S.listen(this.mailboxesChanged)
  },

  componentWillUnmount: function () {
    flux.mailbox.S.unlisten(this.mailboxesChanged)
  },

  /* **************************************************************************/
  // Data lifecycle
  /* **************************************************************************/

  getInitialState: function () {
    return { mailbox_ids: flux.mailbox.S.getState().ids() }
  },

  mailboxesChanged: function (store) {
    this.setState({ mailbox_ids: store.ids() })
  },

  shouldComponentUpdate: function (nextProps, nextState) {
    if (!this.state || !nextState) { return true }
    if (this.state.mailbox_ids.length !== nextState.mailbox_ids.length) { return true }
    if (this.state.mailbox_ids.find((id, i) => id !== nextState.mailbox_ids[i].id)) { return true }

    return false
  },

  /* **************************************************************************/
  // Rendering
  /* **************************************************************************/

  /**
  * Renders the app
  */
  render: function () {
    return (
      <div {...this.props} className='mailbox-list'>
        {this.state.mailbox_ids.map((id, index) => {
          return <MailboxListItem mailbox_id={id} key={id} index={index} />
        })}
      </div>
    )
  }
})
