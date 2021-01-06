import React, {Component, lazy} from 'react';
import {connect} from 'react-redux';
import {BrowserRouter, Switch} from 'react-router-dom';
import {withTranslation} from 'react-i18next';

import Contacts from '../../components/Contacts';
import ProductDetails from '../../components/ProductDetails';
import NotFoundPage from '../../components/ NotFoundPage';

import Home from '../Home';
import News from '../News';
import Products from '../Products';
import LogIn from '../LogIn';
import PublicLayout from '../PublicLayout';
import {makeSelectProducts} from '../Products/selectors';
import {makeSelectCars} from '../Admin/selectors';
import {getProducts} from '../Products/actions';
import PrivateLayout from '../PrivateLayout';

import {
  changeAppLanguage,
  canalDropdownHide,
  dropdownHide,
  authCheckState,
  logout,
  resetAuthError,
  unknownError,
  getContent
} from './actions';
import {
  makeSelectAppLanguage,
  makeSelectDropdownClass,
  makeSelectIsAuthenticated,
  makeSelectLoad,
  makeSelectContent
} from './selectors';
import {makeSelectNewses} from "../News/selectors";

const AdminProducts = lazy(() => import('../../components/AdminProducts'))
const AdminCars = lazy(() => import('../../components/AdminCars'))
const AdminNews = lazy(() => import('../../components/AdminNews'))
const AdminContent = lazy(() => import('../../components/AdminContent'))


class App extends Component {

  componentDidMount() {
    const userLanguagePreference = localStorage.getItem('user_language_preference');
    const language = userLanguagePreference ? userLanguagePreference : this.props.appLanguage
    this.props.getProducts(language);

    if (userLanguagePreference && this.props.appLanguage !== userLanguagePreference) {
      this.props.changeAppLanguage(language)
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.appLanguage !== this.props.appLanguage) {
      this.props.i18n.changeLanguage(this.props.appLanguage);
    }

    if (
      this.props.products &&
      this.props.appLanguage &&
      this.props.products[this.props.appLanguage] &&
      !this.props.products[this.props.appLanguage]['contentIsLoaded']
    ) {
      this.props.getProducts(this.props.appLanguage)
    }

    if (
      this.props.content &&
      this.props.appLanguage &&
      this.props.content[this.props.appLanguage] &&
      !this.props.content[this.props.appLanguage]['contentIsLoaded']
    ) {
      this.props.getContent(this.props.appLanguage)
    }
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <PublicLayout exact path='/news' component={News}{...this.props}/>
          <PublicLayout exact path='/product/:id' component={ProductDetails}{...this.props}/>
          <PublicLayout exact path={['/products', '/products/:productType']} component={Products}{...this.props}/>
          <PublicLayout exact path='/contacts' component={Contacts}{...this.props}/>
          <PublicLayout exact path='/' component={Home}{...this.props}/>
          <PublicLayout exact path='/login' component={LogIn}{...this.props}/>

          <PrivateLayout exact path='/admin/products' component={AdminProducts}{...this.props}/>
          <PrivateLayout exact path='/admin/cars' component={AdminCars}{...this.props}/>
          <PrivateLayout exact path='/admin/news' component={AdminNews}{...this.props}/>
          <PrivateLayout exact path='/admin/content' component={AdminContent}{...this.props}/>

          <PublicLayout component={NotFoundPage}{...this.props}/>
        </Switch>
      </BrowserRouter>
    )
  }
}

const mapStateToProps = state => {
  return {
    appLanguage: makeSelectAppLanguage(state),
    dropdownClass: makeSelectDropdownClass(state),
    products: makeSelectProducts(state),
    isAuthenticated: makeSelectIsAuthenticated(state),
    loading: makeSelectLoad(state),
    cars: makeSelectCars(state),
    newses: makeSelectNewses(state),
    content: makeSelectContent(state)
  }
};

const mapDispatchToProps = dispatch => {
  return {
    dropdownHide: () => dispatch(dropdownHide()),
    canalDropdownHide: () => dispatch(canalDropdownHide()),
    changeAppLanguage: language => dispatch(changeAppLanguage(language)),
    getProducts: language => dispatch(getProducts(language)),
    authCheckState: () => dispatch(authCheckState()),
    logout: () => dispatch(logout()),
    resetAuthError: () => dispatch(resetAuthError()),
    unknownError: error => dispatch(unknownError(error)),
    getContent: language => dispatch(getContent(language))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(App))
