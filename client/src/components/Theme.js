import React, { useEffect, useState } from 'react'
import { BsFillMoonStarsFill } from "react-icons/bs";
import { IoMdSunny } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux"
import { changeTheme } from "../redux/user/userSlice.js"

const Theme = () => {
    const { theme } = useSelector((state) => state.user);
    const [theme1, setTheme1] = useState(theme);
    const dispatch = useDispatch();

    useEffect(() => {
        document.documentElement.classList.add(theme);
        setTheme1(theme);
    }, [])

    const themeChangeHandler = () => {
        if (theme === "light") {
            document.documentElement.classList.add('dark');
            dispatch(changeTheme("dark"));
            setTheme1("dark");
        } else {
            document.documentElement.classList.remove('dark');
            dispatch(changeTheme("light"));
            setTheme1("light");
        }
    }

    return (
        <button onClick={themeChangeHandler}>
            {
                theme1 === "light" ? (
                    <IoMdSunny className="mr-6" />
                ) : (
                    <BsFillMoonStarsFill className="mr-6" />
                )
            }
        </button>
    )
}

export default Theme;