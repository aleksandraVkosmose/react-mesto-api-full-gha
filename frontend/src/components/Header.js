import React from "react";
import logoPath from '../images/logo.svg'
import { Link, Route, Routes } from "react-router-dom";

function Header({ onSignOut, headerEmail, signUp, signIn, signOut }) {
  return (
    <header className="header">
      <img
        className="header__logo"
        src={logoPath}
        alt="логотип место"
      />
      <Routes>
        <Route path="/sign-in" element={<Link
          className="header__link"
          to="/sign-up">
          {signUp}
        </Link>} />

        <Route path="/sign-up" element={<Link
          className="header__link"
          to="sign-in">
          {signIn}
        </Link>} />

        <Route path="/*" element={<div className="header__container">
          <p className="header__email">
            {headerEmail}
          </p>
          <Link
            className="header__exit"
            onClick={onSignOut}
            to="sign-in">
            {signOut}
          </Link>
        </div>} />
      </Routes>

    </header>
  );
}
export default Header;