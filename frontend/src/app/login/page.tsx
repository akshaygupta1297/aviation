"use client";

import { Button, Tabs } from "@heroui/react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import Card from "@/components/common/Card";
import { DEFAULT_AUTHED_REDIRECT } from "@/config/routes";
import { useAppDispatch } from "@/lib/hooks";
import { loginAdmin, loginUser, userSignup } from "@/lib/services/api";
import sideImg from "../../assets/images/login-half.png";
import tajImg from "../../assets/images/login-taj.svg";
import towerImg from "../../assets/images/login-tower.svg";
import planImg from "../../assets/images/login-plan.svg";

const phoneRegex = /^[6-9]\d{9}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const nameRegex = /^[A-Za-z]+$/;
const schema = yup.object().shape({
    firstName: yup.string().matches(nameRegex, "Invalid first name").required("Required"),
    lastName: yup.string().matches(nameRegex, "Invalid last name").required("Required"),
    password: yup.string().matches(passwordRegex, "Invalid password").required("Required"),
    number: yup.string().matches(phoneRegex, "Invalid phone number (10 digits)").required("Required"),
    email: yup.string().matches(emailRegex, "Invalid email").required("Required"),
});

const schemaLogin = yup.object().shape({
    password: yup.string().matches(passwordRegex, "Invalid password").required("Required"),
    email: yup.string().matches(emailRegex, "Invalid email").required("Required"),
});

export default function Login() {
    const dispatch = useAppDispatch();
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl") ?? DEFAULT_AUTHED_REDIRECT;
    const router = useRouter()

    const { register: signupRegister, handleSubmit: signupSubmit, control: signupControl, watch: signupWatch, formState: { errors: signupErrors } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            firstName: "",
            lastName: "",
            password: "",
            email: "",
            number: "",
        },
        mode: "onTouched",
    });
    const { register: loginUsers, handleSubmit: userLoginSubmit, control: userLoginControl, watch: userLoginWatch, formState: { errors: userLoginErrors } } = useForm({
        resolver: yupResolver(schemaLogin),
        defaultValues: {
            password: "",
            email: "",
        },
        mode: "onTouched",
    });

    const signup = async (data: any) => {
        console.log(data);
        const res = await userSignup(dispatch, data)
        console.log(res);
        if (res.isLogin) {
            if (callbackUrl === "/flights-review") {
                router.push(`${callbackUrl}?flight=${searchParams.get("flight")}&passengers=${searchParams.get("passengers")}`)
            } else {
                router.push(callbackUrl)
            }
        }
    };
    const login = async (data: any) => {
        console.log(data);
        const res = await loginUser(dispatch, data)
        console.log(res);
        if (res.isLogin) {
            if (callbackUrl === "/flights-review") {
                router.push(`${callbackUrl}?flight=${searchParams.get("flight")}&passengers=${searchParams.get("passengers")}`)
            } else {
                router.push(callbackUrl)
            }
        }
    }

    return (
        <div className="relative grid md:grid-cols-2 h-[calc(100vh-70px)]">
            <Image src={planImg} alt="sideImg" className="absolute top-3 md:right-0 right-0 xl:w-70 lg:w-45 md:w-40 w-100" />
            <div className="w-full">
                <Image src={sideImg} alt="sideImg" className="h-[calc(100vh-70px)] w-full" />
            </div>
            <div className="mx-auto w-3/4 items-center justify-center font-sans mt-8">

                <h1 className="font-bold text-2xl">Welcome to Aviation App</h1>
                <h1 className="font-bold text-2xl">Login</h1>
                <br />

                <Tabs className="w-full max-w-xl z-10">
                    <Tabs.ListContainer>
                        <Tabs.List aria-label="Options">
                            <Tabs.Tab id="login">
                                Login
                                <Tabs.Indicator />
                            </Tabs.Tab>
                            <Tabs.Tab id="signup">
                                SignUp
                                <Tabs.Indicator />
                            </Tabs.Tab>
                        </Tabs.List>
                    </Tabs.ListContainer>
                    <Tabs.Panel id="login">
                        <Card className="mt-4 w-full">
                            <form onSubmit={userLoginSubmit(login)} className="flex flex-col w-full flex-1 gap-4">
                                <div className="">
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                                    <input type="email" id="email" {...loginUsers("email")} className="w-full px-3 py-2 border rounded-lg" />
                                    {userLoginErrors.email?.message && <p className="text-red-500">{userLoginErrors.email.message}</p>}
                                </div>
                                <div className="">
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                                    <input type="password" id="password" {...loginUsers("password")} className="w-full px-3 py-2 border rounded-lg" />
                                    {userLoginErrors.password?.message && <p className="text-red-500">{userLoginErrors.password.message}</p>}
                                </div>
                                <Button type="submit" className={"bg-amber-400"}>
                                    Submit
                                </Button>
                            </form>
                        </Card>
                    </Tabs.Panel>
                    <Tabs.Panel id="signup">
                        <Card className="mt-4 w-full">
                            <form onSubmit={signupSubmit(signup)} className="flex flex-col w-full flex-1 gap-4 z-10">
                                <div className="">
                                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
                                    <input type="text" id="firstName" {...signupRegister("firstName")} className="w-full px-3 py-2 border rounded-lg" />
                                    {signupErrors.firstName?.message && <p className="text-red-500">{signupErrors.firstName.message}</p>}
                                </div>
                                <div className="">
                                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
                                    <input type="text" id="lastName" {...signupRegister("lastName")} className="w-full px-3 py-2 border rounded-lg" />
                                    {signupErrors.lastName?.message && <p className="text-red-500">{signupErrors.lastName.message}</p>}
                                </div>
                                <div className="">
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                                    <input type="email" id="email" {...signupRegister("email")} className="w-full px-3 py-2 border rounded-lg" />
                                    {signupErrors.email?.message && <p className="text-red-500">{signupErrors.email.message}</p>}
                                </div>
                                <div className="">
                                    <label htmlFor="number" className="block text-sm font-medium text-gray-700">Number</label>
                                    <input type="text" id="number" {...signupRegister("number")} className="w-full px-3 py-2 border rounded-lg" />
                                    {signupErrors.number?.message && <p className="text-red-500">{signupErrors.number.message}</p>}
                                </div>
                                <div className="">
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                                    <input type="password" id="password" {...signupRegister("password")} className="w-full px-3 py-2 border rounded-lg" />
                                    {signupErrors.password?.message && <p className="text-red-500">{signupErrors.password.message}</p>}
                                </div>
                                <Button type="submit" className={"bg-amber-400 z-10"}>
                                    Submit
                                </Button>
                            </form>
                        </Card>
                    </Tabs.Panel>
                </Tabs>
            </div>
            <Image src={tajImg} alt="sideImg" className="absolute bottom-0 md:left-1/2 left-0 xl:w-50 lg:w-25 md:w-20 w-20" />
            <Image src={towerImg} alt="sideImg" className="absolute bottom-0 md:right-0 right-0 xl:w-45 lg:w-30 md:w-25 w-25" />
        </div>
    );
}
