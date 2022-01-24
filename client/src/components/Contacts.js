import * as React from "react";

const Contact = ({ id,name,surname, email, phone, onDelete,onEdit }) => (
  <div>
    <p id={id} >{name} {surname}</p>
    <p>Contact details:{email},{phone} </p>
    <button onClick={onDelete}>Delete</button>
    <button onClick={onEdit}>Edit</button>
  </div>
);

export default ({ list, onDelete, onEdit }) => [
  list.map(p => (
    <Contact
      key={p.id}
      id={p.id}
      name={p.name}
      surname={p.surname}
      email={p.email}
      phone={p.phone}
      onDelete={() => onDelete(p.id)}
      onEdit={() => onEdit(p.id)}
    />
  ))
];