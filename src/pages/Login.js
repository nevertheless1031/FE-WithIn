import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useInput } from "../hooks/useInput";
import { useDispatch, useSelector } from "react-redux";
import { useMutation } from "react-query";
import { signInDb } from "../api/auth";
import jwtDecode from "jwt-decode";
import Cookies from "js-cookie";
import { AuthenticationInputCard } from "../components/assets/InputField";
import { SET_TOKEN } from "../redux/modules/authSlice";

export const Login = () => {
    // const [isError, setIsError] = useState({
    //     error: false,
    //     message: "",
    // });
    const [inputs, setInputChange, onClearInput] = useInput({
        email: "",
        password: "",
    });
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userId = useSelector((store) => store.auth.userName);

    const moveToSignup = () => {
        navigate("/signup");
    };

    const moveToMainPage = () => {
        navigate("/");
    };

    const onLoginHandler = () => {
        if (inputs.id !== "" && inputs.password !== "") {
            mutate2.mutate(inputs);
        } else {
            // console.log(inputs);
            alert("공백은 불가능합니다!");
        }
    };

    // -------------------------------------------SignIn---------------------------

    const mutate2 = useMutation(signInDb, {
        onMutate: () => {
            //mutationFunction인 signIndb가 실행되기 전에 실행. mutationFunc가 받을 동일한 변수가 전달됨.
            // console.log("useMutation의 onMutate, 서버에 요청 시작합니다!");
        },
        onSuccess: (data) => {
            // ---------------------------입력 초기화---------------------------
            onClearInput();

            // ---------------------------서버에서 가져온 데이터 확인하기---------------------------
            // console.log("data : ", data);
            const name = data.data.username;
            alert(`로그인 성공! 환영합니다 ${name}님`);

            // ---------------------------토큰 해체 및 쿠키에 저장.---------------------------
            const token = data.headers.authorization.split(" ")[1];
            moveToMainPage();
            // console.log(jwtDecode(token)); // {id: 'gkdgo99', iat: 1683075561, exp: 1683079161}  두 번째는 발급시간, 세 번째는 유효기간
            const decodedToken = jwtDecode(token);
            console.log(decodedToken);
            const { sub, exp, auth, username } = decodedToken;
            const expireDate = new Date(exp * 1000); // 날짜단위로 변환해서 넣기.
            Cookies.set("access", token, {
                expires: expireDate,
            });

            // ---------------------------Reducer 에서 토큰 관리할 것임. useName도 Page 넘어갈 때마다 useSelector로 받을 수 있게 넘기는 거 ------------------------------------------------------
            // --------------------------- 페이지 넘어갈 때 Reducer에서 토큰 꺼내와서 살아있는지 확인할 거임. ------------------------------------------------------
            dispatch(
                SET_TOKEN({
                    userName: username,
                    role: auth,
                    email: sub,
                })
            );
            // setIsError({ error: false, message: "" });

            // 페이지 이동
            moveToMainPage();
        },
        onError: (error) => {
            console.log(error);
            alert(error.data.message);
            // setIsError({ error: false, message: "" });
        },
    });

    useEffect(() => {
        if (userId) {
            navigate(-1);
        }
    });

    return (
        <div className="flex justify-center">
            <div className="rounded-md space-y-6 flex flex-col items-center w-full max-w-xl bg-backgroundPurple py-16 parent text-commonTextColor">
                <div className="text-4xl mb-5 text-commonTextColor font-bold">
                    LOGIN
                </div>
                <AuthenticationInputCard
                    value={inputs.email}
                    name="email"
                    placeholder="이메일을 입력해주세요"
                    onChangeHandler={setInputChange}
                    title="Email"
                    onClearHandler={onClearInput}
                />
                <AuthenticationInputCard
                    value={inputs.password}
                    name="password"
                    placeholder="비밀번호를 입력해주세요"
                    onChangeHandler={setInputChange}
                    title="Password"
                    onClearHandler={onClearInput}
                    type="password"
                />
                <div className="w-2/3 p-3 px-4 rounded-md">
                    <button
                        onClick={onLoginHandler}
                        className="text-lg font-bold text-white bg-buttonPurple cursor-pointer py-2.5 px-3.5 w-full rounded-md hover:bg-[#826b99] transition duration-300 shadow-md"
                    >
                        Login
                    </button>
                </div>
                <div className="text-lg text-questionTextGray my-2">
                    아직 계정이 없으신가요?{" "}
                    <span
                        className="text-textPurple cursor-pointer"
                        onClick={moveToSignup}
                    >
                        회원가입
                    </span>
                </div>
            </div>
        </div>
    );
};
