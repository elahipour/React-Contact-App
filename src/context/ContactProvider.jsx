import { createContext, useEffect, useState } from "react";
import { useReducer } from "react";
import { getContacts } from "../utils/getContacts";
const initialContacts = {
  contact: {
    id: "",
    firstname: "",
    lastname: "",
    mobile: "",
    checked: false,
  },
};
export const Context = createContext();

function ContactProvider({ children }) {
  const [contacts, setContacts] = useState([]);
  const [state, dispatch] = useReducer(contactReducer, initialContacts);

  useEffect(() => {
    (async () => {
      const contacts = await getContacts();
      setContacts(contacts);
    })();
  }, []);

  function contactReducer(state, action) {
    switch (action.type) {
      case "ADD": {
        state.contact = { ...action.payload.contact };
        fetch("http://localhost:3001/contacts", {
          method: "POST",
          body: JSON.stringify({ ...state.contact }),
          headers: { "Content-Type": "application/json" },
        }).then(() => {
          async function fetchContacts() {
            const contacts = await getContacts();
            setContacts([...contacts]);
          }
          fetchContacts();
        });

        return {
          ...state,
          contact: { ...state.contact },
        };
      }

      case "DELETE": {
        fetch(`http://localhost:3001/contacts/${action.payload.id}`, {
          method: "DELETE",
        }).then(async () => setContacts(await getContacts()));

        return { ...state };
      }
      case "UPDATE": {
        fetch(`http://localhost:3001/contacts/${action.payload.id}`, {
          method: "PATCH",
          body: JSON.stringify({
            ...action.payload,
          }),
          headers: { "Content-Type": "application/json" },
        }).then(async () => setContacts(await getContacts()));
        return { ...state };
      }
      default:
        return state;
    }
  }
  return (
    <Context.Provider value={{ state, dispatch, contacts }}>
      {children}
    </Context.Provider>
  );
}

export default ContactProvider;
