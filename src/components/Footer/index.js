import React from 'react';
import {Link} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import 'antd/dist/antd.css';

import fb_icon from '../../assets/images/general/fb-icon.svg'
import ins_icon from '../../assets/images/general/ins-icon.svg'
import logo_dark from '../../assets/images/general/logo-dark.svg'
import footer_brend from '../../assets/images/general/footer-brend.svg'

import './style.css';


const PublicFooter = (props) => {
  const {t} = useTranslation();
  return (
    <footer>
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-12 col-md-5 app-footer-info'>
            <div className='app-footer-info_content'>
              <h4 className='app-footer_title'>
                {t('common:OUR_CONTACTS')}
              </h4>
              <p>{t('common:FOOTER_P_1')}</p>

              <dl>
                <dt>{t('common:ADDRESS')}:</dt>
                <dd><a target='_blank' href='https://goo.gl/maps/NbKS4nxZrnqhyfAn6'>{t('common:_ADDRESS')}</a></dd>
                <dt>{t('common:TELEPHONE')}:</dt>
                <dd>
                  <a target='_blank' href='tel:080003008'>080003008 {t('common:TELEPHONE_CALL_TEXT')},</a> <br/>
                  <a target='_blank' href='tel:+37498223464'>+37498223464,</a> <br/>
                  <a target='_blank' href='tel:+37496223464'>+37496223464 </a>

                </dd>
                <dt>{t('common:EMAIL_ADDRESS')}:</dt>
                <dd><a target='_blank' href='mailto:support@pandora-alarm.am'>support@pandora-alarm.am</a></dd>
              </dl>

              <div className='app-socPages-list'>
                <a href='https://www.facebook.com/pandora.alarm.armenia/' className='soc-pages-item' target='_blank'>
                  <span style={{backgroundImage: `url(${fb_icon})`}}></span>
                </a>
                <a href='https://www.instagram.com/pandora.alarm.armenia/' className='soc-pages-item' target='_blank'>
                  <span style={{backgroundImage: `url(${ins_icon})`}}></span>
                </a>
              </div>

              <ul className='flex'>
                <li><Link to='#'><img src={logo_dark} alt=''/></Link></li>
                <li><Link to='#'><img src={footer_brend} alt=''/></Link></li>
                {/*todo add links to */}
              </ul>
            </div>
          </div>
          <div className='col-12 col-md-7 app-footer-map'>
            <div className='app-footer-map_content'>
              <iframe
                src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6173.499838278929!2d44.51204317188887!3d40.2114433246941!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x83a4b44536c517a8!2zQXV0b0RldGFsINWK1aHVsNWl1b3Vv9Wh1bTVodW91aXWgCDVhtW41oAg1ocg1ZXVo9W_1aHVo9W41oDVrtW-1aHVrg!5e0!3m2!1sen!2s!4v1608197714902!5m2!1sen!2s'
                width='1180'
                height='500'
                frameBorder='0'
                allowFullScreen=''
                aria-hidden='false'
                tabIndex='0'
                style={{border: 0}}
              ></iframe>
            </div>
          </div>
        </div>
      </div>
      <div className='container app-footer_foot'>
        <p>
          &copy; {new Date().getFullYear()} BeCoworker. All Rights Reserved.
        </p>
      </div>
    </footer>
  )
};

export default PublicFooter;
