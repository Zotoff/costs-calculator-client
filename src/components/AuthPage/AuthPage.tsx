import React, { MutableRefObject, useRef, useState } from "react"
import { Link } from "react-router-dom";
import { AuthClient } from "../../api/authClient";

export const AuthPage: React.FC<{type: string}> = ({ type }) => {
    const [spinner, setSpinner] = useState(false);

    // Refs for input fields
    const usernameRef = useRef() as MutableRefObject<HTMLInputElement>;
    const passwordRef = useRef() as MutableRefObject<HTMLInputElement>;

    const currentTitle = type === 'login' ? 'Войти' : 'Регистрация';

    const handleLogin = async (username: string, password: string) => {
      if (!username || !password) {
        return;
      } else {
        const result = await AuthClient.login(username, password);
      }
    }

    return(
        <div className="container">
            <h3>{currentTitle}</h3>
            <form action="" method="POST">
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Ваш email</label>
                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Ваш пароль</label>
                <input type="password" className="form-control" id="exampleInputPassword1" />
              </div>
              <button type="submit" className="btn btn-primary">{currentTitle}</button>
            </form>
            {
                type === 'login'
                ?
                <div>
                    <span>Еще нет аккаунта?</span>
                    <Link to={'/registration'}>Зарегистрироваться</Link>
                </div>
                :
                <div>
                    <span>Уже есть аккаунт?</span>
                    <Link to={'/login'}>Войти</Link>
                </div>
            }
        </div>
    )
}