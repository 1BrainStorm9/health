import {initializeApp} from "firebase/app";
import {createUserWithEmailAndPassword, initializeAuth, signInWithEmailAndPassword, signOut} from "firebase/auth";
import {addDoc, arrayUnion, collection, doc, getDoc, getDocs, getFirestore, updateDoc, query,where} from "firebase/firestore";

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

        const itemData = item;
        let result = {};
        const nutritionalValueRef = itemData.nutritionalValueRef;
        const nutritionalValueDoc = await getDoc(nutritionalValueRef);
        result.nutritionalValue = nutritionalValueDoc.data();

        result.ingredients = itemData.ingredients;
        result.calories = itemData.calories;
        result.description = itemData.description;
        result.id = itemData.id;
        result.imageUrl = itemData.imageUrl;
        result.recipeText = itemData.recipeText;
        result.title = itemData.title;
        result.weight = itemData.weight;
        arr.push(result);
    }

    return arr;

}


export const getPlansData = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, "plan"));
        let data = [];
        querySnapshot.forEach((doc) => {
            const docData = {
                ...doc.data(),
                docId: doc.id
            }
            data.push(docData);
        });

        let arr = []

        for (const item of data) {
            let result = {};
            const recipeDataPromises = item.recipesId.map(async (recipeRef) => {
                const respData = await getDoc(recipeRef);
                return respData.data();
            });

            const recipeData = await Promise.all(recipeDataPromises);

            result.background = item.background;
            result.calories = item.calories;
            result.meals = item.meals;
            result.id = item.id;
            result.price  = item.price ;
            result.title = item.title;
            result.planId = item.docId;

            result.recipesId = await transformRecipeData(recipeData);

            arr.push(result);
        }

        return arr;
    } catch (error) {
        console.error("Ошибка получения документов: ", error);
    }
};

const ordersCollectionRef = collection(db, 'order');

export const addOrder = async (object,productsList) => {
    try {
        const newOrderRef = await addDoc(ordersCollectionRef, object);

        let docsRef = []
        productsList.forEach(item => {
            const someDocumentRef = doc(db, 'plan', item);
            docsRef.push(someDocumentRef);
        })

        await updateDoc(newOrderRef, {
            productList: arrayUnion(...docsRef),
            status: "in progress",
            id: newOrderRef.id,
        });

    } catch (e) {
        console.error('Error adding document: ', e);
    }
};

export const getOrdersByUserId = async (userId) => {
    try {
        const ordersQuery = query(collection(db, 'order'), where('userId', '==', userId));
        const querySnapshot = await getDocs(ordersQuery);

        let ordersData = [];
        querySnapshot.forEach((doc) => {
            ordersData.push(doc.data());
        });

        return ordersData;
    } catch (error) {
        console.error("Ошибка получения документов: ", error);
        throw error;
    }
};