import React, { useContext, useState } from "react";
import { Context } from "../../context/ContactProvider";

function EditContact({ modal, contact,setShowMenu }) {
  const { dispatch, state } = useContext(Context);
  const [editContact, setEditContact] = useState({
    firstname: contact?.firstname||"",
    lastname: contact?.lastname||"",
    mobile: contact?.mobile||"",
    checked: false,
  });

  function handleChange(e) {
    const value = e.target.value;
    const name = e.target.name;
    setEditContact({
      ...editContact,
      [name]: value,
    });
  }

  function handleUpdate(e) {
    e.preventDefault();
    dispatch({
      type: "UPDATE",
      payload: { ...editContact , id: contact.id },
    });
  }

  return (
    <dialog ref={modal} className="modal text-black">
      <div className="modal-box">
        <h3 className="text-lg font-bold">Edit Contact</h3>
        <form>
          <input
            className={`rounded p-2  outline-none ${
              !contact.firstname ? "focus:bg-red-200 outline-none " : ""
            }`}
            placeholder="firstaname"
            type="text"
            name="firstname"
            value={editContact.firstname}
            onChange={handleChange}
          />
          <input
            className={`rounded p-2  outline-none ${
              !contact.lastname ? "focus:bg-red-200 outline-none " : ""
            }`}
            placeholder="lastname"
            type="text"
            name="lastname"
            value={editContact.lastname}
            onChange={handleChange}
          />
          <input
            className={`rounded p-2  outline-none ${
              !contact.mobile ? "focus:bg-red-200 outline-none " : ""
            }`}
            placeholder="mobile"
            type="text"
            name="mobile"
            value={editContact.mobile}
            onChange={handleChange}
          />
          <button
            className="px-3 py-1 rounded bg-gray-800 text-white"
            onClick={handleUpdate}
          >
            Update
          </button>
        </form>
        <div className="modal-action">
          <form method="dialog">
            <button className="btn" onClick={()=>setShowMenu(false)}>Close</button>
          </form>
        </div>
      </div>
    </dialog>
  );
}

export default EditContact;
