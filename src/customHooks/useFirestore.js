import { collection, onSnapshot, query, orderBy,where } from "firebase/firestore"
import { useEffect, useState } from "react"
import { db } from "../Firebase/config"

 const useFirestore=(collection_name, condition)=>{
    const [document, setDocument]=useState([])
    useEffect(()=>{
      let collectionRef = query(collection(db,collection_name), orderBy('createAt'));
      if(condition){
          if(!condition.compareValue||+condition.compareValue.length===0){
              return;
          }
          collectionRef = query(collectionRef, where(condition.fieldname, condition.operator, condition.compareValue))
      }
    const unsubcribe = onSnapshot(collectionRef,(snapshot)=>{
        const data = snapshot.docs.map((doc)=>({
            ...doc.data(),
            id:doc.id
        }));
        setDocument(data);
        // console.log("doc:", document)
    })
    return unsubcribe;
   
  },[collection, condition]);
  return document;
}
export default useFirestore