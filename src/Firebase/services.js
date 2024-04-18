import { collection, addDoc, serverTimestamp, getDoc, doc, updateDoc } from "firebase/firestore";
import app,{ db } from './config';
export const addDocument = (collection_name, data)=>{
    addDoc(collection(db, collection_name), {
        ...data,
        createAt: serverTimestamp()
      })
}
export const updateMergeDocument = async(collection_name, docId, attrDocument, data)=>{
   const docRef = doc(db, collection_name, docId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const currentMembers = docSnap.data()[attrDocument] || [];
      const mergedMembers = [...new Set([...currentMembers, ...data])];
      await updateDoc(docRef, { members: mergedMembers });
    }
}