import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase/config";

export class StoreService {
  static async setPremiumStatus(uid: string, isPremium: boolean) {
    try {
      await setDoc(
        doc(db, "users", uid),
        {
          premium: isPremium,
        },
        { merge: true }
    )
    } catch (error) {
      console.error("Error", error)
      throw error
    }
  }

  static async isUserPremium(uid: string) {
    try {
      const snap = await getDoc(doc(db, "users", uid));
      return snap.exists() ? snap.data().premium === true : false;
    } catch (error) {
      console.error("Error", error)
      throw error
    }
    
  }

}