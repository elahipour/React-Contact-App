import {  useContext, useState } from "react";
import ListItem from "./ListItem";
import { Context } from "../../context/ContactProvider";
function ContactsList() {
  const { dispatch, contacts } = useContext(Context);  
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [isShowChecks, setIsShowChecks] = useState(true);
  function handleDelete() {
    const result = contacts.filter((contact) => {
      return selectedContacts.find((selected) => selected.id === contact.id);
    });
    for (const contact of result) {
      dispatch({ type: "DELETE", payload: contact });
    }
  }

  return (
    <>
      <ul className="flex mt-2 flex-col gap-3 px-2 max-h-[250px] overflow-y-scroll">
        {contacts?.map((contact, index) => {
          return (
            <ListItem
              isShowChecks={isShowChecks}
              key={index}
              contact={contact}
              setSelectedContacts={setSelectedContacts}
              selectedContacts={selectedContacts}
            />
          );
        })}
      </ul>
      {contacts.length ? (
        <>
          <button
            className="bg-teal-900 text-white p-3 rounded-md m-2 btn"
            onClick={() => setIsShowChecks((isShowChecks) => !isShowChecks)}
          >
            multiple choose
          </button>
          {selectedContacts.length > 1 && !isShowChecks ? (
            <button
              className="bg-rose-900 text-white p-3 rounded-md m-2 btn"
              onClick={handleDelete}
            >
              remove selected
            </button>
          ) : (
            ""
          )}
        </>
      ) : (
        ""
      )}
    </>
  );
}

export default ContactsList;
