import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";

function Register({ isLoggedIn, onRegister }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handlePasswordChange(evt) {
        setPassword(evt.target.value);
    }

    function handleEmailChange(evt) {
        setEmail(evt.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        onRegister(email, password);
    }

    if (isLoggedIn) {
        return <Navigate to="/*" />;
    }

    return (
        <section className='login'>
            <div className='login__container'>
                <h2 className='login__title'>Регистрация</h2>
                <form
                    onSubmit={handleSubmit}
                    className="login__form"
                    name="register">
                    <input
                        className="login__input"
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={handleEmailChange}
                        autoComplete="off"
                    />

                    <input
                        className="login__input"
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Пароль"
                        value={password}
                        onChange={handlePasswordChange}
                        autoComplete="off"
                    />

                    <button type="submit" className='login__button-save'>Зарегистрироваться</button>
                    <Link to="/sign-in" className="login__link">
                        Уже зарегистрированы? Войти
                    </Link>
                </form>
            </div>
        </section>
    );
}

export default Register;