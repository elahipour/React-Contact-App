import React, { useCallback, useContext, useEffect, useState } from "react";
import { Context } from "../../context/ContactProvider";
import ContactsList from "../modules/ContactsList";
import { v4 as uuidv4 } from "uuid";
import { getContacts } from "../../utils/getContacts";
import { checkInputValue } from "../../utils/checkInputVal";
function ContactForm({dispatch}) {
  const [contact, setContact] = useState({
    firstname: "",
    lastname: "",
    mobile: "",
  });




  function handleChange(e) {
    const value = e.target.value;
    const name = e.target.name;

    setContact({
      ...contact,
      [name]: value,
    });
  }
  function handleAdd(e) {
    e.preventDefault();
    const emptyInputs = Object.keys(checkInputValue(contact)).length;
    if (emptyInputs === 0) {
      dispatch({
        type: "ADD",
        payload: {
          contact: { ...contact, checked: false,id: uuidv4() },
        },
      });
      setContact({
        firstname: "",
        lastname: "",
        mobile: "",
      });
    }
  }
  return (
    <div className="w-[550px] h-fit bg-gray-900">
      <form className="flex flex-col gap-2 p-2">
        <input
          className={`rounded p-2  outline-none ${
            !contact.firstname ? "focus:bg-red-200 outline-none " : ""
          }`}
          placeholder="firstaname"
          type="text"
          name="firstname"
          value={contact.firstname}
          onChange={handleChange}
        />
        <input
          className={`rounded p-2  outline-none ${
            !contact.lastname ? "focus:bg-red-200 outline-none " : ""
          }`}
          placeholder="lastname"
          type="text"
          name="lastname"
          value={contact.lastname}
          onChange={handleChange}
        />
        <input
          className={`rounded p-2  outline-none ${
            !contact.mobile ? "focus:bg-red-200 outline-none " : ""
          }`}
          placeholder="mobile"
          type="text"
          name="mobile"
          value={contact.mobile}
          onChange={handleChange}
        />
        <button
          className="btn px-3 py-1 rounded bg-teal-900 text-white"
          onClick={handleAdd}
        >
          add
        </button>
      </form>
      
    </div>
  );
}

export default ContactForm;
