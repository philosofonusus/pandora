import React from 'react';
import {useTranslation} from 'react-i18next';
import SwiperCore, {Navigation, Pagination, Scrollbar, A11y, Autoplay} from 'swiper';
import {Swiper, SwiperSlide} from 'swiper/react';

import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';

import MyPandora from '../../components/MyPandora';
import bg1 from '../../assets/images/hero-silder/bg1.png'
import bg2 from '../../assets/images/hero-silder/bg2.png'
import bg3 from '../../assets/images/hero-silder/bg3.png'
import about_section_bg from '../../assets/images/index/about-section-bg.svg'
import about_img from '../../assets/images/index/about-img.png'

import {
  SLIDE_1_LINE_1_PART_1, SLIDE_1_LINE_1_PART_2, SLIDE_1_LINE_2_PART_1, SLIDE_1_LINE_2_PART_2, SLIDE_1_PARAGRAPH,
  SLIDE_2_LINE_1_PART_1, SLIDE_2_LINE_1_PART_2, SLIDE_2_LINE_2_PART_1, SLIDE_2_LINE_2_PART_2, SLIDE_2_PARAGRAPH,
  SLIDE_3_LINE_1_PART_1, SLIDE_3_LINE_1_PART_2, SLIDE_3_LINE_2_PART_1, SLIDE_3_LINE_2_PART_2, SLIDE_3_PARAGRAPH,
  SLIDE_4_LINE_1_PART_1, SLIDE_4_LINE_1_PART_2, SLIDE_4_LINE_2_PART_1, SLIDE_4_LINE_2_PART_2, SLIDE_4_PARAGRAPH,
  HOME_PAGE_ABOUT_US_CONTENT_P_1, HOME_PAGE_ABOUT_US_CONTENT_P_2, HOME_PAGE_ABOUT_US_CONTENT_P_3, HOME_PAGE_ABOUT_US_CONTENT_P_4
} from '../App/constants';

import './style.css'

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Autoplay]);

function Home(props) {
  const {t} = useTranslation();
  const {appLanguage, content} = props;

  return (
    <main>
      <section className='hero-slider-section'>
        <div className='swiper-container'>
          <div className='swiper-wrapper'>
            <div className='swiper-slide'>
              <Swiper
                loop={true}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false
                }}
                effect='slide'
                pagination={{
                  el: 'swiper-pagination',
                  clickable: true,
                }}
                navigation={{
                  nextEl: '.hero-slider-section .swiper-button-next',
                  prevEl: '.hero-slider-section .swiper-button-prev',
                }}
              >
                <SwiperSlide>
                  <div className='hero-slider_item' style={{backgroundImage: `url(${bg1})`}}>
                    <div className='container'>
                      <div className='hero-slider_info'>
                        <h2
                          className='hero-slider_title'
                          style={{color: 'var(--white)'}}
                          // todo plese move styles to respective place
                        >
                          {/*{t('home:h2_1_1')}*/}
                          {
                            content[appLanguage].contentIsLoaded &&
                            content[appLanguage].structuredContentData[SLIDE_1_LINE_1_PART_1]
                          }
                          <br/>
                          {/*{t('home:h2_1_2')}*/}
                          {
                            content[appLanguage].contentIsLoaded &&
                            content[appLanguage].structuredContentData[SLIDE_1_LINE_1_PART_2]
                          }
                        </h2>
                        <div className='hero-slider_big-desc'>
                          {
                            content[appLanguage].contentIsLoaded &&
                            content[appLanguage].structuredContentData[SLIDE_1_LINE_2_PART_1]
                          }
                          <span>
                            {
                              content[appLanguage].contentIsLoaded &&
                              content[appLanguage].structuredContentData[SLIDE_1_LINE_2_PART_2]
                            }
                          </span></div>
                        <p>
                          {
                            content[appLanguage].contentIsLoaded &&
                            content[appLanguage].structuredContentData[SLIDE_1_PARAGRAPH]
                          }
                        </p>
                        {/*<button className='hero-silder_btn'>{t('home:MY_PANDORA')}</button>*/}
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className='hero-slider_item' style={{backgroundImage: `url(${bg2})`}}>
                    <div className='container'>
                      <div className='hero-slider_info'>
                        <h2
                          className='hero-slider_title'
                          style={{color: 'var(--white)'}}
                          // todo plese move styles to respective place
                        >
                          {/*{t('home:h2_2_1')}*/}
                          {
                            content[appLanguage].contentIsLoaded &&
                            content[appLanguage].structuredContentData[SLIDE_2_LINE_1_PART_1]
                          }
                          <br/>
                          {/*{t('home:h2_2_2')}*/}
                          {
                            content[appLanguage].contentIsLoaded &&
                            content[appLanguage].structuredContentData[SLIDE_2_LINE_1_PART_2]
                          }
                        </h2>
                        <div className='hero-slider_big-desc'>
                          {
                            content[appLanguage].contentIsLoaded &&
                            content[appLanguage].structuredContentData[SLIDE_2_LINE_2_PART_1]
                          }
                          <span>
                            {
                              content[appLanguage].contentIsLoaded &&
                              content[appLanguage].structuredContentData[SLIDE_2_LINE_2_PART_2]
                            }
                          </span></div>
                        <p>
                          {/*{t('home:P_2')}*/}
                          {
                            content[appLanguage].contentIsLoaded &&
                            content[appLanguage].structuredContentData[SLIDE_2_PARAGRAPH]
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className='hero-slider_item' style={{backgroundImage: `url(${bg3})`}}>
                    <div className='container'>
                      <div className='hero-slider_info'>
                        <h2
                          className='hero-slider_title'
                          style={{color: 'var(--white)'}}
                          // todo plese move styles to respective place
                        >
                          {/*{t('home:h2_3_1')}*/}
                          {
                            content[appLanguage].contentIsLoaded &&
                            content[appLanguage].structuredContentData[SLIDE_3_LINE_1_PART_1]
                          }
                          <br/>
                          {/*{t('home:h2_3_2')}*/}
                          {
                            content[appLanguage].contentIsLoaded &&
                            content[appLanguage].structuredContentData[SLIDE_3_LINE_1_PART_2]
                          }

                        </h2>
                        <div className='hero-slider_big-desc'>
                          {
                            content[appLanguage].contentIsLoaded &&
                            content[appLanguage].structuredContentData[SLIDE_3_LINE_2_PART_1]
                          }
                          <span>
                            {
                              content[appLanguage].contentIsLoaded &&
                              content[appLanguage].structuredContentData[SLIDE_3_LINE_2_PART_2]
                            }
                          </span></div>
                        <p>
                          {/*{t('home:P_3')}*/}
                          {
                            content[appLanguage].contentIsLoaded &&
                            content[appLanguage].structuredContentData[SLIDE_3_PARAGRAPH]
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className='hero-slider_item' style={{backgroundImage: `url(${bg2})`}}>
                    <div className='container'>
                      <div className='hero-slider_info'>
                        <h2
                          className='hero-slider_title'
                          style={{color: 'var(--white)'}}
                          // todo plese move styles to respective place
                        >
                          {/*{t('home:h2_4_1')}*/}
                          {
                            content[appLanguage].contentIsLoaded &&
                            content[appLanguage].structuredContentData[SLIDE_4_LINE_1_PART_1]
                          }
                          <br/>
                          {/*{t('home:h2_4_2')}*/}
                          {
                            content[appLanguage].contentIsLoaded &&
                            content[appLanguage].structuredContentData[SLIDE_4_LINE_1_PART_2]
                          }
                        </h2>
                        <div className='hero-slider_big-desc'>
                          {
                            content[appLanguage].contentIsLoaded &&
                            content[appLanguage].structuredContentData[SLIDE_4_LINE_2_PART_1]
                          }
                          <span>
                            {
                              content[appLanguage].contentIsLoaded &&
                              content[appLanguage].structuredContentData[SLIDE_4_LINE_2_PART_2]
                            }
                          </span></div>
                        <p>
                          {/*{t('home:P_4')}!*/}
                          {
                            content[appLanguage].contentIsLoaded &&
                            content[appLanguage].structuredContentData[SLIDE_4_PARAGRAPH]
                          }
                        </p>
                        {/*<button className='hero-silder_btn'>{t('home:MY_PANDORA')}</button>*/}
                        {/*<MyPandora*/}
                        {/*  className='app-navbar_btn'*/}
                        {/*  // todo add activeClassName*/}
                        {/*>{t('common:MY_PANDORA')}*/}
                        {/*</MyPandora>*/}
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              </Swiper>
              <div className='swiper-pagination '></div>

              <div className='swiper-button-next'></div>
              <div className='swiper-button-prev'></div>

            </div>
          </div>
        </div>
      </section>

      <section className='app-about-section'>
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-12 col-md-7 col-lg-6'>
              <div className='app-about_info'>
                <div className='app-about_info-bg' style={{backgroundImage: `url(${about_section_bg})`}}></div>
                <div className='app-about_info-content'>
                  <h1 className='app-about-title'>{t('home:ABOUT US')}</h1>
                    <p>
                    <strong>
                    {/*{t('home:P_5_1')}*/}
                      {
                          content[appLanguage].contentIsLoaded &&
                          content[appLanguage].structuredContentData[HOME_PAGE_ABOUT_US_CONTENT_P_1]
                        }
                  </strong>
                    {/*{t('home:P_5_2')}*/}
                    {
                      content[appLanguage].contentIsLoaded &&
                      content[appLanguage].structuredContentData[HOME_PAGE_ABOUT_US_CONTENT_P_2]
                    }
                  </p>
                  <p>
                    {/*{t('home:P_6')}*/}
                    {
                      content[appLanguage].contentIsLoaded &&
                      content[appLanguage].structuredContentData[HOME_PAGE_ABOUT_US_CONTENT_P_3]
                    }
                  </p>
                  <p>
                    {/*{t('home:P_7')}*/}
                    {
                      content[appLanguage].contentIsLoaded &&
                      content[appLanguage].structuredContentData[HOME_PAGE_ABOUT_US_CONTENT_P_4]
                    }
                  </p>
                </div>
              </div>

            </div>
            <div className='col-12 col-md-5 col-lg-6'>
              <div className='app-about_img'>
                <img src={about_img} alt=''/>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Home


