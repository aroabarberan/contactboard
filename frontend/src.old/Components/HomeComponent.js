import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Contact from "./ContactComponent";
import {
  Grid, Paper, Typography, withStyles
} from '@material-ui/core';

const url_getContact = 'http://localhost:3010/api/contacts/';

class Home extends Component {

  componentWillMount() {
    this.setState({ profile: {} });

    const { userProfile, getProfile } = this.props.auth;
    if (!userProfile) {
      getProfile((err, profile) => {
        this.setState({ profile });
        const { getAccessToken } = this.props.auth;

        fetch(url_getContact,
          {
            method: "POST",
            headers: {
              'Accept': 'application/json',
              'Content-type': 'application/json',
              'Authorization': 'Bearer ' + getAccessToken(),
            },
            body: JSON.stringify({ sub: this.state.profile.sub }),
          })
          .then(res => res.json())
          .then(contacts => contacts.map(contact => this.props.addContact(contact)))
          .catch(console.log)
      });
    } else {
      this.setState({ profile: userProfile });
    }
  }
  render() {
    const { classes } = this.props;
    const { contacts } = this.props.contacts;
    return (
      <div>
        <Paper className={classes.paper} elevation={1}>
          {contacts.map((contact, i) =>
            <div key={i}>
              <Contact auth={this.props.auth} contact={contact} />
            </div>
          )}

        </Paper>
      </div>
    );
  }
}

const styles = theme => ({
  paper: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
})

Home.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
}

export default withStyles(styles, { withTheme: true })(Home)