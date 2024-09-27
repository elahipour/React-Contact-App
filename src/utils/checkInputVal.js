export function checkInputValue(contact){
    const isEmpty={}
   for (const key in contact) {
       isEmpty[key]=!!contact[key];
       if(isEmpty[key]){
        delete isEmpty[key]
       }
   }

return isEmpty;
}