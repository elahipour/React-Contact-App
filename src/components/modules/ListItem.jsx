import React, { useContext, useEffect, useRef, useState } from "react";
import { Context } from "../../context/ContactProvider";
import EditContact from "./EditContact";
import ContactsList from "./ContactsList";

function ListItem({
  contact,
  setSelectedContacts,
  selectedContacts,
  isShowChecks,
}) {
  const [currentContact, setCurrentContact] = useState({
    ...contact,
    checked: false,
  });
  const { dispatch, state } = useContext(Context);
  const [showMenu, setShowMenu] = useState(false);
  const modal = useRef();
  function handleChange(e) {
    const checked = e.target.checked;
    setCurrentContact({ ...contact, checked: checked });
  }
  function handleMenu(e) {
    setShowMenu(true);
  }
  function handleDelete() {
    dispatch({ type: "DELETE", payload: contact });
  }
  useEffect(() => {
    if (currentContact.checked) {
      setSelectedContacts([...selectedContacts, currentContact]);
    } else {
      const isSelectedContacts = selectedContacts.findIndex((selected) => {
        return selected.id === contact.id;
      });
      selectedContacts.splice(isSelectedContacts, 1);
      setSelectedContacts([...selectedContacts]);
    }
  }, [currentContact.checked]);

  return (
    <label htmlFor={`labled-${contact.id}`}>
      <li className="flex rounded-md items-center justify-between bg-white font-[600] px-2 ">
        {!isShowChecks ? (
          <input
            id={`labled-${contact.id}`}
            className="checkbox checkbox-error size-5"
            type="checkbox"
            checked={currentContact.checked}
            onChange={handleChange}
          />
        ) : (
          ""
        )}
        <span>{contact?.firstname}</span>
        <span>{contact?.lastname}</span>
        <span>{contact?.mobile}</span>
        {!showMenu ? (
          <button
            className="grid place-items-center py-8 relative"
            onClick={handleMenu}
          >
            <span className="bg-blue-300 rounded-full w-8 h-8 absolute right-0 top-4 ">
              ...
            </span>
          </button>
        ) : (
          <div
            className="flex gap-3 px-2 py-1 my-1 rounded bg-blue-200"
          >
            <button
              className="btn bg-rose-800 px-3 py-1 rounded text-white"
              onClick={handleDelete}
            >
              Delete
            </button>
            <button
              className="btn px-3 py-1 rounded bg-slate-700 text-white"
              onClick={() => modal.current.showModal()}
            >
              Edit
            </button>
            <EditContact
              contact={currentContact}
              modal={modal}
              setShowMenu={setShowMenu}
            />
          </div>
        )}
      </li>
    </label>
  );
}

export default ListItem;
