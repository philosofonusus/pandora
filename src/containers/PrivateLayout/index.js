import React, {useEffect} from 'react';
import {Route, Redirect, NavLink} from 'react-router-dom';
import {Layout, Col, Row, Button} from 'antd';


import PrivateHeader from '../../components/PrivateHeader';
import Spinner from '../../components/Spinner/Spinner';

import './style.css'


const PrivateLayout = ({component: Component, isAuthenticated, authCheckState, ...rest}) => {

  useEffect(() => {
     authCheckState()
  }, [isAuthenticated]);


  if (isAuthenticated === true) {
    return (
      <Route render={routeProps => (
        <Layout className='privateLayout'>
          <PrivateHeader {...rest}/>
          <main>
            <Row type='flex' className='privateRow'>
              <Col span={5} align='left'>
                <ul className='privateList'>
                  <li>
                    <NavLink to='/' exact activeClassName={`ant-btn-primary-active`}>
                      <Button type='primary' block>Pandora</Button>
                    </NavLink>
                  </li>

                  <li>
                    <NavLink to='/admin/products' activeClassName={`ant-btn-primary-active`}>
                      <Button type='primary' block>Products</Button>
                    </NavLink>
                  </li>

                  <li><NavLink to='/admin/cars' activeClassName={`ant-btn-primary-active`}>
                      <Button type='primary' block>Cars</Button>
                    </NavLink>
                  </li>

                  <li><NavLink to='/admin/news' activeClassName={`ant-btn-primary-active`}>
                      <Button type='primary' block>News</Button>
                    </NavLink>
                  </li>

                  <li><NavLink to='/admin/content' activeClassName={`ant-btn-primary-active`}>
                      <Button type='primary' block>Content</Button>
                    </NavLink>
                  </li>

                </ul>
              </Col>
              <Col span={19} align='middle' className='privateComponent'>
                <Component
                  {...rest}
                  {...routeProps}
                />
              </Col>
            </Row>
          </main>
        </Layout>
      )}
      />
    )
  } else if (isAuthenticated === false) {
    return <Redirect to='/login'/>
  } else {
    return <Spinner/>
  }

};

export default PrivateLayout;

