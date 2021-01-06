import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {connect} from 'react-redux';

import news_hero_bg from '../../assets/images/news/news-hero-bg.png'
import NewsPagination from '../../components/NewsPagination';
import Spinner from '../../components/Spinner/Spinner';

import {NEWS_PAGE_PARAGRAPH} from '../App/constants';

import {getNewses, loadMoreNewses} from './actions';
import './style.css';
import {makeSelectDisplayNewsesCount} from './selectors';

function News(props) {

  const {t} = useTranslation();

  useEffect(() => {
    if (props.appLanguage && props.newses && !props.newses[props.appLanguage]['contentIsLoaded']) {
      props.getNewses(props.appLanguage)
    }
  }, []);

  useEffect(() => {
    if (props.appLanguage && props.newses && !props.newses[props.appLanguage]['contentIsLoaded']) {
      props.getNewses(props.appLanguage)
    }
  }, [props.appLanguage])


  return (
    <main>
      {/*todo <!-- Hero-image-section -->*/}
      <section
        className='hero-image-section'
        style={{backgroundImage: `url(${news_hero_bg})`}}
      ></section>

      {/*todo <!--/ Hero-image-section -->*/}

      {/*todo<!-- App-navlink-section -->*/}
      <section className='app-navlink-section'>
        <div className='container'>
          <ul className='flex'>
            <li><Link to='/'>Pandora</Link></li>
            <li><span>{t('common:NEWS')}</span></li>
          </ul>
        </div>
      </section>
      {/*todo <!-- /App-navlink-section -->*/}

      {/*todo <!-- News-section -->*/}
      <section className='app-news-section'>
        <div className='container'>
          <h2 className='app-head-title'>{t('common:NEWS')}</h2>
         <p>
            {/*{t('news:NEWS_P_1')}*/}
            {
                props.content[props.appLanguage].contentIsLoaded &&
                props.content[props.appLanguage].structuredContentData[NEWS_PAGE_PARAGRAPH]
              }
          </p>
          <div className='app-news-content'>
            <div className='row'>
              {
                props.appLanguage &&
                props.newses &&
                !props.newses[props.appLanguage]['contentIsLoaded'] &&
                <Spinner/>
                // todo Tatev please improve Spinner position and styles
              }
              {
                props.appLanguage &&
                props.newses &&
                props.newses[props.appLanguage]['contentIsLoaded'] &&
                <NewsPagination
                  displayNewsesCount={props.displayNewsesCount}
                  newsesArray={props.newses[props.appLanguage]['data']}
                  appLanguage={props.appLanguage}
                />
              }
            </div>
            <button
              type='button'
              className='app-news-more-btn'
              onClick={() => props.loadMoreNewses()}
            >{t('news:NEWS_LOAD_MORE_BUTTON')}</button>
          </div>
        </div>
      </section>
      {/*todo <!-- /News-section -->*/}
    </main>
  )
};


const mapStateToProps = state => {
  return {
    displayNewsesCount: makeSelectDisplayNewsesCount(state)
  }
};

const mapDispatchToProps = dispatch => {
  return {
    getNewses: language => dispatch(getNewses(language)),
    loadMoreNewses: () => dispatch(loadMoreNewses())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(News)





