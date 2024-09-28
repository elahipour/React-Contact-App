import React, {  useContext,  useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
import { v4 as uuidv4 } from "uuid";
import { checkInputValue } from "../../utils/checkInputVal";
import { Context } from "../../context/ContactProvider";
function ContactForm() {
  const {dispatch}=useContext(Context)
  const [contact, setContact] = useState({
    firstname: "",
    lastname: "",
    mobile: "",
  });


  const notify = (message) => toast(message);

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
    const mobileForm=new RegExp(/^(\+\d{1,3}[- ]?)?\d{11}$/)
    if(!mobileForm.test(contact.mobile)){
      notify('Incorrect mobile number format');
      return;
    }
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
          type="number"
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
      <Toaster />
    </div>
  );
}

export default ContactForm;
