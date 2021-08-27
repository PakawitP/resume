import React, { useState } from "react";

import App from "../../service/pdfreader/App";
import { firebaseConfig } from '../../service/config/FirebaseConfig'
import {
    useParams
  } from "react-router-dom";

const HisPdfView = () => {

    const db = firebaseConfig.firestore();
    const [doc, setDoc] = useState([])
    const [page, setPage] = useState(null);
    let { id } = useParams();
    console.log(id)
    React.useEffect(async () => {
        let colecName = id.split("&&");

        await db.collection(colecName[0].trim()).doc(colecName[1].trim()).get().then((doc) => {
            if (doc.exists) {
                setDoc(doc.data().url)
            } else {
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
    }, [])

    if (doc.length <= 0) {
        return (
            <div>
                loading........
            </div>
        )
    }


    return (
        <div>
            {doc.length > 0 && <div className="App">
                <div className="all-page-container">
                    <App url={doc} />
                </div>
            </div>}
        </div>
    );
}

export default HisPdfView