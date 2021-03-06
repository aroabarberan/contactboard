import React from 'react';
import { QUERIES } from "../../querys";
import PropTypes from 'prop-types';
import Add from "@material-ui/icons/Add";
import {
  Divider, Button, Dialog, DialogTitle, TextField,
  ListItemText, DialogActions, DialogContent, MenuItem,
  withStyles, ListItemIcon,
} from '@material-ui/core';
import { Formik, Field } from "formik";


class CreateGroupComponent extends React.Component {
  constructor() {
    super()
    this.state = {
      open: false,
      anchorEl: null,
    }
  }

  handleOpen = () => { this.setState({ open: true }); }
  handleClose = () => { this.setState({ open: false }); }

  submit = (values, actions) => {
    const { name } = values;
    fetch(QUERIES.group, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + this.props.auth.getAccessToken(),
      },
      body: JSON.stringify({ name }),
    })
      .then(res => {
        if (res.status >= 400) {
          throw new Error('Cannot add group');
        }
        return res.json();
      })
      .then(data => this.props.addGroup(data.group))
      .catch(console.log);
    this.handleClose();
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <MenuItem className={classes.menuItem} onClick={this.handleOpen}>
          <ListItemIcon>
            <Add />
          </ListItemIcon>
          <ListItemText>Create Group</ListItemText>
        </MenuItem>

        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <Formik
            onSubmit={this.submit}
            initialValues={{ name: '' }}
            validate={({ name }) => {
              if (!name) return { name: 'Required' };
              return {};
            }}
            render={(props) => (
              <form onSubmit={props.handleSubmit}>
                <DialogTitle id="form-dialog-title">Create new group</DialogTitle>
                <Divider />
                <DialogContent style={{ marginTop: 16, marginLeft: 32, marginRight: 32 }}>
                  <Field
                    name='name'
                    render={({ field }) => (
                      <TextField
                        {...field}
                        autoFocus
                        margin="normal"
                        label={props.errors.name || 'Group Name'}
                        type="text"
                        variant='outlined'
                        fullWidth
                        error={!!props.errors.name}
                      />
                    )}
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={() => {
                    this.handleClose();
                    props.resetForm();
                  }} color="default">Cancel</Button>
                  <Button onClick={props.handleSubmit} color="primary" variant='contained'>
                    Save
                  </Button>
                </DialogActions>
              </form>
            )}
          />
        </Dialog>
      </div>
    );
  }
}

const styles = theme => ({
  menuItem: {
    color: '#666',
  },
});

CreateGroupComponent.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CreateGroupComponent);
