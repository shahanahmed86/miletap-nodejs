const firebaseAdmin = require('firebase-admin');
const firebaseApp = require('firebase/app');
const firebaseAuth = require('firebase/auth');
const configs = require('../config/app');

const { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } =
	firebaseAuth;

const {
	clientEmail,
	privateKey,
	projectId,
	apiKey,
	authDomain,
	storageBucket,
	messagingSenderId,
	appId
} = configs.firebase;

class FirebaseAuth {
	constructor() {
		firebaseAdmin.initializeApp({
			credential: firebaseAdmin.credential.cert({ clientEmail, privateKey, projectId })
		});

		firebaseApp.initializeApp({
			apiKey,
			authDomain,
			projectId,
			storageBucket,
			messagingSenderId,
			appId
		});
	}

	/**
	 * signup
	 * @param {string} email
	 * @param {string} password
	 * @returns {Promise<string>}
	 */
	async signup(email, password) {
		try {
			const auth = await getAuth();
			const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
			const idToken = await userCredentials.user.getIdToken();

			return idToken;
		} catch (error) {
			console.log('catched err', error);
			throw error;
		}
	}

	/**
	 * login
	 * @param {string} email
	 * @param {string} password
	 * @returns {Promise<string>}
	 */
	async login(email, password) {
		try {
			const auth = await getAuth();
			const userCredentials = await signInWithEmailAndPassword(auth, email, password);
			const idToken = await userCredentials.user.getIdToken();

			return idToken;
		} catch (error) {
			console.log('catched err', error);
			throw error;
		}
	}

	async logout() {
		const auth = await getAuth();
		await signOut(auth);
	}

	/**
	 * verifyToken
	 * @param {string} idToken
	 * @returns {Promise<Partial<import('firebase-admin/auth').DecodedIdToken>}
	 */
	async verifyToken(idToken) {
		try {
			return await firebaseAdmin.auth().verifyIdToken(idToken);
		} catch (error) {
			console.log('catched err', error);
			throw error;
		}
	}
}

const firebaseAuth = new FirebaseAuth();

module.exports = firebaseAuth;
