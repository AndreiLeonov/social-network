import React from 'react';
import { Link } from "react-router-dom";
import { Layout, Menu, Avatar, Row, Col, Button } from 'antd'
import { UserOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentUserLogin, selectIsAuth } from '../../redux/auth-selectors';
import { logout } from '../../redux/auth-reducer';

export type MapPropsType = {
    // isAuth: boolean
    // login: string | null
}

export const Header: React.FC<MapPropsType> = () => {

    const isAuth = useSelector(selectIsAuth);
    const login = useSelector(selectCurrentUserLogin);

    const dispatch = useDispatch();

    const logoutCallback = () => {
        dispatch(logout())
    }

    const { Header } = Layout;

    return (<Header className="header">
    <div className="logo" />
    <Row>
        <Col span={21}> <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
            <Menu.Item key="1"><Link to="/users">Users</Link></Menu.Item>
        </Menu>
        </Col>
        <Col span={3}>
            {isAuth ? <div>
                <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
                {login} <Button onClick={logoutCallback}>Log out</Button> 
                </div>
                : <Button><Link to={'/login'}>Login</Link></Button>}
        </Col>
    </Row>
</Header>);
    

    // <header className={s.header}>
    //     <img src='https://www.freelogodesign.org/Content/img/logo-ex-7.png' />

    //     <div className={s.loginBlock}>
    //         { props.isAuth
    //             ? <div>{props.login} - <button onClick={props.logout}>Log out</button> </div>
    //             : <NavLink to={'/login'}>Login</NavLink> }
    //     </div>
    // </header>
}