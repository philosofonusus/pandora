import React, {useEffect, useState} from 'react';
import {Link, NavLink} from 'react-router-dom';
import {useTranslation} from 'react-i18next';

import logo from '../../assets/images/general/logo.svg'
import fb_icon from '../../assets/images/general/fb-icon.svg'
import ins_icon from '../../assets/images/general/ins-icon.svg'

import SelectLanguage from '../SelectLanguage';
import MyPandora from '../MyPandora';

import './style.css';

const PublicHeader = (props) => {
  let [isActive, setActive] = useState("false");

  const handleToggle = () => {
    setActive(!isActive);
  };

  const handleClose = () => {
    setActive(isActive == true? isActive : !isActive);
  };

  useEffect(() => {
    if (props.dropdownClass) {
      setTimeout(() => {
        props.canalDropdownHide()
      }, 100)
    }
  }, [props.dropdownClass])
  const {t} = useTranslation();
  // useEffect( () => {
  //   props.history.listen((location, action) => {
  //     handleClose();
  //   });
  // });

  return (
    <header>
      <div className='app-header-top'>
        <div className='container'>
          <div className='row'>
            <div className='col-8 col-md'>
              <a
                className='app-header-top_phone-link'
                href='tel:+37498223464'
              >
                <span>{t('common:CALL_US')}</span> 098223464
              </a>
            </div>
            <div className='col-4 col-md flex'>
              <div className='app-socPages-list'>
                <a href='https://www.facebook.com/pandora.alarm.armenia/' className='soc-pages-item' target='_blank'>
                  <span style={{backgroundImage: `url(${fb_icon})`}}
                  ></span>
                </a>
                <a  href='https://www.instagram.com/pandora.alarm.armenia/' className='soc-pages-item' target='_blank'>
                  <span style={{backgroundImage: `url(${ins_icon})`}}></span>
                </a>
              </div>
              <SelectLanguage
                className='app-lang'
                appLanguage={props.appLanguage}
                changeAppLanguage={props.changeAppLanguage}
              >
              </SelectLanguage>

            </div>
          </div>
        </div>
      </div>
      <nav className='app-navbar'>
        <div className='container'>
          <div className='flex'>
            <Link to='/' className='app-brend' onClick={handleClose}>
              <span style={{backgroundImage: `url(${logo})`}}></span>
            </Link>

            <button  type='button' className={!isActive ? 'active app-navbar_toggle-btn' : 'app-navbar_toggle-btn'} onClick={handleToggle}>
              <span className='navbar-toggle-icon'></span>
            </button>

            <div className={!isActive ? 'active app-navbar_content' : 'app-navbar_content'}>
              <ul className='app-navbar_list flex'>
                <li><NavLink
                  to='/'
                  className='navbar-item'
                  activeClassName='active'
                  exact onClick={handleClose}
                >{t('common:HOME')}</NavLink></li>
                <li>
                  <NavLink
                    to='/products'
                    className={`navbar-item`}
                    activeClassName='active' onClick={handleClose}
                  >{t('common:CATALOG')}</NavLink>
                  <ul
                    className={`app-navbar-dropdown ${props.dropdownClass}`}

                  >
                    <li className={props.dropdownClass}
                        onClick={() => {
                          props.dropdownHide()
                        }}
                    ><Link
                      to='/products/car'
                      className={`navbar-dropdown-item ${props.dropdownClass}`}
                      onClick={() => props.dropdownHide()} onMouseUp={handleClose}
                    >
                      {t('common:PRODUCTS_TYPE_CAR_ALARM')}
                    </Link></li>
                    <li
                    ><Link
                      to='/products/motorcycle'
                      className='navbar-dropdown-item'
                      onClick={() => props.dropdownHide()}  onMouseUp={handleClose}
                    >
                      {t('common:PRODUCTS_TYPE_MOTO_ALARM')
                      }</Link>
                    </li>
                    <li>
                      <Link
                        to='/products/immobilizers'
                        className='navbar-dropdown-item'
                        onClick={() => props.dropdownHide()}  onMouseUp={handleClose}
                      >{t('common:PRODUCTS_TYPE_IMMOBILIZERS')}</Link></li>
                    <li>
                      <Link
                        to='/products/accessories'
                        className='navbar-dropdown-item'
                        onClick={() => props.dropdownHide()} onMouseUp={handleClose}
                      >{t('common:PRODUCTS_TYPE_ACCESSORIES')}
                      </Link>
                    </li>
                  </ul>
                </li>
                <li><NavLink
                  to='/news'
                  className='navbar-item'
                  activeClassName='active' onClick={handleClose}
                >{t('common:NEWS')}</NavLink></li>
                <li><NavLink
                  to='/contacts'
                  className='navbar-item'
                  activeClassName='active' onClick={handleClose}
                >{t('common:CONTACTS')}</NavLink></li>
              </ul>
              <MyPandora
                className='app-navbar_btn'
              >{t('common:MY_PANDORA')}
              </MyPandora>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
};

export default PublicHeader





