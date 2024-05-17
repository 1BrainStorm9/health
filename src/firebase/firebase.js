import {initializeApp} from "firebase/app";
import {createUserWithEmailAndPassword, initializeAuth, signInWithEmailAndPassword, signOut} from "firebase/auth";
import {collection, getDoc, getDocs, getFirestore} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDFowRqVcVaSlwMTCa0OPX8sCCHQK2rcOQ",
    authDomain: "health-884be.firebaseapp.com",
    projectId: "health-884be",
    storageBucket: "health-884be.appspot.com",
    messagingSenderId: "602707593021",
    appId: "1:602707593021:web:199ae958744fb69aece754",
    measurementId: "G-VC0EZZGMDW"
};


const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const auth = initializeAuth(app, {});

export const login = (email,password) => {
    return signInWithEmailAndPassword(auth,email,password)
}

export const create = (email,password) => {
    return createUserWithEmailAndPassword(auth,email,password)
}

export const logout = () => {
    return signOut(auth)
}

export const getRecipesData = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, "recipe"));
        let data = [];
        querySnapshot.forEach((doc) => {
            data.push(doc.data());
        });

        return await transformRecipeData(data);
    } catch (error) {
        console.error("Ошибка получения документов: ", error);
    }
};

const transformRecipeData = async (data) => {

    let arr = []

    for (const item of data) {
        let result = {};
        const nutritionalValueRef = item.nutritionalValueRef;
        const nutritionalValueDoc = await getDoc(nutritionalValueRef);
        result.nutritionalValue = nutritionalValueDoc.data();

        result.ingredients = item.ingredients;
        result.calories = item.calories;
        result.description = item.description;
        result.id = item.id;
        result.imageUrl = item.imageUrl;
        result.recipeText = item.recipeText;
        result.title = item.title;
        result.weight = item.weight;
        arr.push(result);
    }

    return arr;

}


export const getPlansData = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, "plan"));
        let data = [];
        querySnapshot.forEach((doc) => {
            data.push(doc.data());
        });

        let arr = []

        for (const item of data) {
            let result = {};
            const recipeDataPromises = item.recipesId.map(async (recipeRef) => {
                const recipeDoc = await getDoc(recipeRef);
                return recipeDoc.data();
            });

            const recipeData = await Promise.all(recipeDataPromises);
            result.background = item.background;
            result.calories = item.calories;
            result.meals = item.meals;
            result.id = item.id;
            result.price  = item.price ;
            result.title = item.title;
            result.recipesId = await transformRecipeData(recipeData);

            arr.push(result);
        }

        return arr;
    } catch (error) {
        console.error("Ошибка получения документов: ", error);
    }
};