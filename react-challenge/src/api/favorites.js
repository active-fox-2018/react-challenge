import { db } from './firebase'

function uid() {
    return JSON.parse(localStorage.getItem('userData')).uid
}

async function get() {
    let querySnapshot = await db.collection("favorites").where("uid", "==", uid())
        .get().catch(error)
    let favoritesData = []
    querySnapshot.forEach(function (doc) {
        // doc.data() is never undefined for query doc snapshots
        favoritesData.push({ id: doc.id, ...doc.data() });
    });
    return favoritesData
}

async function add(article) {
    let docRef = await db.collection("favorites").add({
        uid: uid(),
        article
    }).catch(error)
    console.log("Document written with ID: ", docRef.id);
    get()
}

async function remove(id) {
    await db.collection("favorites").doc(id).delete().catch(error)
    console.log("Document successfully deleted!");
    get()
}

function error(error) {
    console.log(error)
}

export { add, remove, get }
