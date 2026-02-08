import { doc, getDocs, collection, Timestamp, setDoc, updateDoc, getDoc, query, where } from "firebase/firestore";
import { db } from "../firebase/config";
import { Achievement, IconKey } from "../../types";


export class BadgeService {
  static async getAllBadges(userId: string): Promise<Achievement[]> {
    try {
      const allBadgesSnap = await getDocs(collection(db, "badges"))

      const unlockedSnap = await getDocs(
        collection(db, "users", userId, "badges")
      )

      const unlockedIds = new Set(unlockedSnap.docs.map(doc => doc.id))

      return allBadgesSnap.docs.map(doc => {
        const data = doc.data()

        return {
          id: doc.id,
          ...(data as Omit<Achievement, "id" | "progress" | "isUnlocked" | "unlockedAt" | "isProfile">),
          progress: unlockedIds.has(doc.id)
            ? unlockedSnap.docs.find(d => d.id === doc.id)?.data()?.progress
            : undefined,
          isUnlocked: unlockedIds.has(doc.id),
          unlockedAt: unlockedIds.has(doc.id)
            ? unlockedSnap.docs.find(d => d.id === doc.id)?.data()?.unlockedAt?.toDate()
            : undefined,
          isProfile: unlockedIds.has(doc.id)
            ? unlockedSnap.docs.find(d => d.id === doc.id)?.data()?.isProfile
            : undefined,
        }
      })
    } catch (error) {
      console.error("Error", error)
      throw error
    }
  }

  static async getUserProfileBadges(userId: string): Promise<Achievement[]> {
    try {
      const q = query(
        collection(db, "users", userId, "badges"),
        where("isProfile", "==", true)
      );

      const snap = await getDocs(q);

      const profileBadges: Achievement[] = snap.docs.map((doc) => {
        const data = doc.data();

        return {
          id: doc.id,
          type: data.type as IconKey,
          title: data.title as string,
          milestones: (data.milestones ?? null) as number[] | null,
          progress: data.progress ?? 0,
          isUnlocked: data.isUnlocked ?? true,
          unlockedAt: data.unlockedAt?.toDate?.() ?? new Date(0),
          isProfile: true,
        };
      });

      return profileBadges;
    } catch (error) {
      console.error("Error", error)
      throw error
    }

  }

  static async saveBadgeToUser(userId: string | undefined, badgeId: string) {
    try {
      const badgeRef = doc(db, "badges", badgeId);
      const badgeSnap = await getDoc(badgeRef);

      if (!badgeSnap.exists()) {
        throw new Error("Badge does not exist");
      }

      const badgeData = badgeSnap.data();

      if (!userId) {
        throw new Error("user id is missing");
      }
      const userBadgeRef = doc(db, "users", userId, "badges", badgeId);

      await setDoc(userBadgeRef, {
        badgeId,
        progress: 10,
        milestones: badgeData.milestones ?? [],
        title: badgeData.title,
        type: badgeData.type,
        unlockedAt: Timestamp.now(),
        isProfile: false,
      });
    } catch (error) {
      console.error("Error", error)
      throw error
    } 
  }

  static async changeProfileBadgeStatus(userId: string | undefined, badgeId: string, status: boolean) {
    try {
      if (!userId) {
        throw new Error("User ID is required");
      }

      const q = query(
        collection(db, "users", userId, "badges"),
        where("isProfile", "==", true)
      );

      const snap = await getDocs(q);

      if (snap.docs.length >= 3) {
        throw new Error("User can't have more than 3 badges displayed on profile");
      }

      const badgeRef = doc(db, "users", userId, "badges", badgeId);

      await updateDoc(badgeRef, {
        isProfile: status,
      });
    } catch (error) {
      console.error("Error", error);
      throw error;
    }
  }
}