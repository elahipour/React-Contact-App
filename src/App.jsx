import { useContext, useEffect, useState } from "react";
import ContactForm from "./components/templates/ContactForm";
import ContactsList from "./components/modules/ContactsList";
import { Context } from "./context/ContactProvider";

function App() {
  const { dispatch, contacts } = useContext(Context);
  const [allContacts, setAllContacts] = useState([]);

  useEffect(() => {
    async function fetchContacts() {
      setAllContacts([...(await contacts)]);
    }

    fetchContacts();
  }, [contacts]);
  return (
    <div className="min-h-[100vh] w-full grid place-items-center bg-emerald-600">
      <div className="rounded-md overflow-hidden bg-gray-900 px-2">
        <h1 className="text-center py-3 font-[600]">Contact App</h1>
        <ContactForm dispatch={dispatch} />
        <ContactsList contacts={allContacts} dispatch={dispatch} />
      </div>
    </div>
  );
}

export default App;
