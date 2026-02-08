import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase/config";

export type PackType = 'training' | 'diet';

export interface Pack {
  id: string;
  type: PackType;
  title: string;
  description: string;
  price: number;
  duration: string;
}

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

  // Training & Diet Packs
  static getTrainingPacks(): Pack[] {
    return [
      {
        id: 'training-beginner',
        type: 'training',
        title: 'Beginner Training Pack',
        description: '4-week basic training plan with form guides and technique tips',
        price: 39,
        duration: '4 weeks',
      },
      {
        id: 'training-marathon',
        type: 'training',
        title: 'Marathon Training Pack',
        description: '12-week marathon prep with progressive distance building',
        price: 49,
        duration: '12 weeks',
      },
      {
        id: 'training-intermediate',
        type: 'training',
        title: 'Intermediate Training Pack',
        description: '6-week progressive plan with periodization and cross-training',
        price: 59,
        duration: '6 weeks',
      },
      {
        id: 'training-advanced',
        type: 'training',
        title: 'Advanced Training Pack',
        description: '8-week elite coaching with sport-specific drills and peak training',
        price: 79,
        duration: '8 weeks',
      },
    ];
  }

  static getDietPacks(): Pack[] {
    return [
      {
        id: 'diet-basic',
        type: 'diet',
        title: 'Diet Pack - Basic',
        description: 'Personalised 4-week diet plan with shopping lists and nutrition basics',
        price: 49,
        duration: '4 weeks',
      },
      {
        id: 'diet-performance',
        type: 'diet',
        title: 'Performance Diet Pack',
        description: '6-week athletic optimization plan for endurance and strength',
        price: 69,
        duration: '6 weeks',
      },
      {
        id: 'diet-premium',
        type: 'diet',
        title: 'Premium Diet Pack',
        description: '8-week premium plan with meal prep guides, recipes, and macro tracking',
        price: 89,
        duration: '8 weeks',
      },
    ];
  }

}