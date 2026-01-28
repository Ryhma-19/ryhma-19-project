import { doc, setDoc, getDocs, collection } from "firebase/firestore";
import { db } from "../firebase/config";
import { Achievement } from "../../types";

/*
export class badgeManager {
    static async initializeUserBadges(userId: string) {


        const batch = ALL_USER_BADGES.map(async (badge) => {
            const badgeRef = doc(db, "users", userId, "badges", badge.id);
            return setDoc(badgeRef, {
                ...badge,
                progress: 0,
                isUnlocked: false,
                unlockedAt: null,
            });
        });

        await Promise.all(batch);
    }

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