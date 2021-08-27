import React, { useState } from "react";
import { Button } from '@material-ui/core';
// import PdfView from "../../service/pdfreader/PdfView";
import App from "../../service/pdfreader/App";
import { firebaseConfig } from '../../service/config/FirebaseConfig'
import {
    Switch,
    Route,
    Link,
    useRouteMatch
} from "react-router-dom";

const HisView = (props) => {
    const { collection, namePage } = props;
    let { path, url } = useRouteMatch();
    const db = firebaseConfig.firestore();
    const [doc, setDoc] = useState([])
    const [page, setPage] = useState(null);

    React.useEffect(() => {
        const fetchHistory = async () => {
            const historyCollection = await db.collection(collection).get();
            console.log("historyCollection", historyCollection.docs)
            setDoc(
                historyCollection.docs.map((doc) => {
                    return doc.data();
                })
            );
        };
        fetchHistory();
    }, [])
    console.log("historyCollection", doc)
    if (doc.length <= 0) {
        return (
            <div>
                loading........
            </div>
        )
    }


    const itemView = (item, key) => {
        return (
            <li key={item.id}>
                {item.name}
                <Button color="primary"
                    component={Link}
                    to={`/pdfView${collection+'&&'+item.id}`}>
                    เเสดง
                </Button>
            </li>
        )
    }


    return (
        <div>
            <h3>{namePage}</h3>
            {doc.length > 0 &&
                <ul>
                    {doc.map(itemView)}
                </ul>
            }
            {page && <div className="App">
                <div className="all-page-container">
                    <App url={page} />
                </div>
            </div>}
        </div>
    );
}

export default HisView