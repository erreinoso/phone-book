import React from "react";

const ContactForm = ({
  name,
  surname,
  email,
  phone,
  onNameChange,
  onSurnameChange,
  onEmailChange,
  onPhoneChange,
  onSubmit
}) => {
  const handleNameChange = event => {
    onNameChange(event.target.value);
  };
  const handleSurnameChange = event => {
    onSurnameChange(event.target.value);
  };
  const handleEmailChange = event => {
    onEmailChange(event.target.value);
  };
    const handlePhoneChange = event => {
    onPhoneChange(event.target.value);
  };
  return (
    <form onSubmit={onSubmit}>
      <div>
        name: <input value={name} name='nameInput' onChange={handleNameChange} />
      </div>
      <div>
        surname: <input value={surname} name='surnameInput' onChange={handleSurnameChange} />
      </div>
      <div>
         email: <input value={email} name='emailInput' type='email' onChange={handleEmailChange} /> 
      </div>
      <div>
        phone: <input value={phone} name='phoneInput' type='number' onChange={handlePhoneChange} />
      </div>
      <div>
        <input type='submit' value='add' />
      </div>
    </form>
  );
};

export default ContactForm;