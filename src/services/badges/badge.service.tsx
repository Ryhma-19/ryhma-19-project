import { doc, setDoc, getDocs, collection } from "firebase/firestore";
import { db } from "../firebase/config";
import { Achievement } from "../../types";


export class BadgeManager {
  static async getAllBadgesWithUnlockStatus(userId: string): Promise<Achievement[]> {
    try {
      const allBadgesSnap = await getDocs(collection(db, "badges"))

      const unlockedSnap = await getDocs(
        collection(db, "users", userId, "badges")
      )
      
      const unlockedIds = new Set(unlockedSnap.docs.map(doc => doc.id))

      const progress = 10

      return allBadgesSnap.docs.map(doc => {
        const data = doc.data()

        return {
          id: doc.id,
          ...(data as Omit<Achievement, "id" | "progress" | "isUnlocked" | "unlockedAt">),
          progress,
          isUnlocked: unlockedIds.has(doc.id),
          unlockedAt: unlockedIds.has(doc.id)
            ? unlockedSnap.docs.find(d => d.id === doc.id)?.data()?.unlockedAt?.toDate()
            : undefined
        }
      })

    } catch (error) {
      console.error("Error", error)
      throw error
    }
  }
}

/*
    static async saveUserBadge(userId: string, badge: Achievement) {
        const badgeRef = doc(collection(db, "users", userId, "badges"), badge.id);

        await setDoc(badgeRef, {
            ...badge,
            unlockedAt: badge.unlockedAt ? badge.unlockedAt.toISOString() : null,
        });
    }

    static async getUserBadges(userId: string): Promise<Achievement[]> {
        const badgesSnap = await getDocs(collection(db, "badges", userId, "badges"));
        return badgesSnap.docs.map(doc => {
            const data = doc.data();
            return {
                ...data,
            unlockedAt: data.unlockedAt ? new Date(data.unlockedAt) : undefined
            } as Achievement;
        });
    }

    static async unlockBadge(userId: string, badgeId: string) {
        const badgeRef = doc(db, "users", userId, "badges", badgeId);

        await setDoc(
            badgeRef,
            {
                isUnlocked: true,
                unlockedAt: new Date().toISOString(),
            },
            { merge: true }
        );
    }

}

*/