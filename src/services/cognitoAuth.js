// src/services/cognitoAuth.js

const CLIENT_ID = "5rfqdq73lpo0c2aqq2oqnh6vi2";
const REDIRECT_URI = "http://localhost:3000/callback";
const DOMAIN = "https://cloud-app-demo.auth.ap-southeast-1.amazoncognito.com";
const RESPONSE_TYPE = "code";
const SCOPE = "email openid phone";

export const loginWithCognito = () => {
    const loginUrl = `${DOMAIN}/login?client_id=${CLIENT_ID}&response_type=${RESPONSE_TYPE}&scope=${encodeURIComponent(SCOPE)}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}`;
    window.location.href = loginUrl;
};

export const signupWithCognito = () => {
    const signupUrl = `${DOMAIN}/signup?client_id=${CLIENT_ID}&response_type=${RESPONSE_TYPE}&scope=${encodeURIComponent(SCOPE)}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}`;
    window.location.href = signupUrl;
};
