import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { setUser } from "../slices/profileSlice";

const CognitoRedirectHandler = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        // ✅ Nếu đã login rồi, không cần fetch lại token
        const existingToken = localStorage.getItem("token");
        const existingUser = localStorage.getItem("user");

        if (existingToken && existingUser) {
            dispatch(setUser(JSON.parse(existingUser)));
            navigate("/dashboard/my-profile", { replace: true });
            return;
        }

        const code = new URLSearchParams(window.location.search).get("code");
        if (!code) return;

        const fetchTokens = async () => {
            try {
                const response = await axios.post(
                    "https://cloud-app-demo.auth.ap-southeast-1.amazoncognito.com/oauth2/token",
                    new URLSearchParams({
                        grant_type: "authorization_code",
                        client_id: "5rfqdq73lpo0c2aqq2oqnh6vi2",
                        redirect_uri: "http://localhost:3000/dashboard/my-profile",
                        code: code,
                    }),
                    {
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded",
                        },
                    }
                );

                const id_token = response.data.id_token;
                const userInfo = jwtDecode(id_token);

                // 👉 Tạo object user
                const userObj = {
                    firstName: userInfo.given_name || "AWS",
                    lastName: userInfo.family_name || "User",
                    email: userInfo.email,
                    image: userInfo.picture || "",
                    additionalDetails: {},
                };

                // 👉 Lưu token và user vào localStorage
                localStorage.setItem("token", id_token);
                localStorage.setItem("user", JSON.stringify(userObj));

                // 👉 Cập nhật Redux
                dispatch(setUser(userObj));

                // 👉 Redirect thật
                navigate("/dashboard/my-profile", { replace: true });
            } catch (error) {
                console.error("Token Exchange Error", error);
                navigate("/login");
            }
        };

        fetchTokens();
    }, [dispatch, navigate]);

    return <p className="text-white p-5">Logging you in...</p>;
};

export default CognitoRedirectHandler;
