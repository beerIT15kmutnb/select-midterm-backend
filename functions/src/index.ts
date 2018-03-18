import * as functions from 'firebase-functions';
import * as firebase from "firebase";
import * as express from 'express';
import * as wrap from 'co-express';
import * as bodyParser from 'body-parser';

const router = express();
router.use(bodyParser.json());
router.use((req, res, next) => {
    res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers")
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET, POST')
    next();
});
var config = {
    apiKey: "AIzaSyDuYRMqZ2pYlDRZU0nsb9STemKjOytomy4",
    authDomain: "midtermselect.firebaseapp.com",
    databaseURL: "https://midtermselect.firebaseio.com",
    projectId: "midtermselect",
    storageBucket: "midtermselect.appspot.com",
    messagingSenderId: "613631582566"
};
firebase.initializeApp(config);
var database = firebase.database()


router.get('/', (req, res, next) => {
    res.send({ ok: true, message: 'Welcome to API test2' });
});
router.get('/data', async (req, res, next) => {
    let midtermselect = []
    await database.ref().once('value')
    .then(snapshot => {
        midtermselect = snapshot.val()
    })
    .catch(err =>{
        res.send({ ok: false, message: 'database false' });
    })
    res.send({ ok: true, message: midtermselect });
});
export const apiUrl = functions.https.onRequest(router);
