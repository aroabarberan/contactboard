import { connect } from 'react-redux';
import ContactComponent from "../../Components/Contact/ContactComponent";
import { addContact } from "../../Actions/contactAction";


const mapStateToProps = state => ({
  contacts: state.contacts,
  form : state.contacts.form,
  favourite: state.contacts.favourite,
})

const mapDispatchToProps = dispatch => ({
  addContact: contact => {
    dispatch(addContact(contact))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(ContactComponent)