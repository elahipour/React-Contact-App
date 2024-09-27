export async function getContacts(){
    const data=await fetch("http://localhost:3001/contacts");
    const contacts=await data.json();
    return contacts;
  }