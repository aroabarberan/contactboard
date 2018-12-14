import React from 'react';
import PropTypes from 'prop-types';
import AddIcon from '@material-ui/icons/Add';
import {
  Divider, Button, Dialog, DialogTitle, withStyles,
} from '@material-ui/core';
import ContactFormContainer from '../../Containers/Contact/ContactFormContainer';
import { green } from '@material-ui/core/colors'

class CreateContact extends React.Component {
  state = {
    open: false,
  }

  handleOpen = () => { this.setState({ open: true }); }
  handleClose = () => { this.setState({ open: false }); }

  render() {
    const { classes, auth } = this.props;

    return (
      <div>
        <Button
          color='secondary'
          variant='contained'
          onClick={this.handleOpen}
          className={classes.addButton}
          classes={{ label: classes.addButtonLabel }}
        >
          <AddIcon className={classes.addButtonIcon} /> Create contact
        </Button>
        <Dialog
          className={classes.size}
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="scroll-dialog-title"
          scroll='paper'
        >
          <DialogTitle id="scroll-dialog-title">Create new contact</DialogTitle>
          <Divider />
          <ContactFormContainer auth={auth} handleClose={this.handleClose} />
        </Dialog>
      </div>
    );
  }
}

const styles = theme => ({
  addButton: {
    position: 'fixed',
    bottom: theme.spacing.unit * 4,
    right: theme.spacing.unit * 4,
    zIndex: 999,
    textTransform: 'none',
    borderRadius: 100,
    fontWeight: 600,
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[600],
    },
  },
  addButtonLabel: {
    paddingRight: theme.spacing.unit,
  },
  addButtonIcon: {
    width: '1.75em',
    height: '1.75em',
    paddingRight: theme.spacing.unit,
  },
});

CreateContact.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CreateContact);
