import React, {Fragment} from 'react';
import {Route} from 'react-router-dom';
import {Layout} from 'antd';
import {Helmet} from 'react-helmet';

import favicon from '../../assets/images/general/favicon.png';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

import './style.css'


const {Content} = Layout;
const PublicLayout = ({component: Component, ...rest}) => {
  const {
    appLanguage,
    changeAppLanguage,
    dropdownClass,
    computedMatch,
    dropdownHide,
    canalDropdownHide
  } = rest;
  return (
    <Route render={routeProps => (
      <Fragment>
        <Helmet>
          <title>Pandora</title>
          <link rel="icon" href={favicon}/>
        </Helmet>
        <Header
          {...routeProps}
          appLanguage={appLanguage}
          changeAppLanguage={changeAppLanguage}
          dropdownClass={dropdownClass}
          computedMatch={computedMatch}
          dropdownHide={dropdownHide}
          canalDropdownHide={canalDropdownHide}
        />
        <Content>
          <Component
            {...rest}
            {...routeProps}
          />
        </Content>
        <Footer/>
      </Fragment>
    )}
    />
  )
};

export default PublicLayout;

