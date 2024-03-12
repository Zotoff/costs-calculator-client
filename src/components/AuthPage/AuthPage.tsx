import React, { MutableRefObject, useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { AuthClient } from "../../api/authClient";
import { setAlert } from "../../context/alert";
import { Spinner } from "../Spinner/Spinner";
import './styles.css';
import { handleAlertMessage } from "../../utils/auth";

export const AuthPage: React.FC<{type: string}> = ({ type }) => {
    const [spinner, setSpinner] = useState(false);

    // Refs for input fields
    const usernameRef = useRef() as MutableRefObject<HTMLInputElement>;
    const passwordRef = useRef() as MutableRefObject<HTMLInputElement>;

    const currentTitle = type === 'login' ? 'Войти' : 'Регистрация';

    const navigate = useNavigate();

    const handleLogin = async (username: string, password: string) => {
      if (!username || !password) {
        setSpinner(false);
        handleAlertMessage({
          alertText: 'Заполните все поля',
          alertStatus: 'warning',
        })
        return;
      } else {
        const result = await AuthClient.login(username, password);
        if (!result) {
          setSpinner(false);
          return;
        }

        usernameRef.current.value = '';
        passwordRef.current.value = '';

        setSpinner(false);
        navigate('/costs');
        setAlert({
          alertText: 'Вход выполнен',
          alertStatus: 'success',
        })
      }
    }

    const handleRegistration = async (username: string, password: string) => {
      if (!username || !password) {
        setSpinner(false);
        handleAlertMessage({
          alertText: 'Заполните все поля',
          alertStatus: 'warning',
        })
        return;
      }

      if (password.length < 4) {
        setSpinner(false);
        handleAlertMessage({
          alertText: 'Длина пароля минимум 4 знака',
          alertStatus: 'warning',
        })
        return;
      }

      const result = await AuthClient.registration(username, password);
        if (!result) {
          setSpinner(false);
          return;
        }

        usernameRef.current.value = '';
        passwordRef.current.value = '';

        setSpinner(false);
        navigate('/login');
        setAlert({
          alertText: 'Регистрация выполнена',
          alertStatus: 'success',
        })
    }

    const handleAuth = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setSpinner(true);

      switch(type) {
        case 'login':
          handleLogin(
            usernameRef.current.value,
            passwordRef.current.value,
          )
        break;
        case 'registration':
          handleRegistration(
            usernameRef.current.value,
            passwordRef.current.value,
          )
        break;
        default:
          break;
      }
    }

    return(
        <div className="container">
            <h3>{currentTitle}</h3>
            <form action="" method="POST" onSubmit={handleAuth}>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Ваш email</label>
                <input ref={usernameRef} type="text" className="form-control"/>
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Ваш пароль</label>
                <input ref={passwordRef} type="password" className="form-control" id="exampleInputPassword1" />
              </div>
              <button type="submit" className="btn btn-primary auth-btn">
                {spinner ? <Spinner top={5} left={20} /> : currentTitle}
              </button>
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