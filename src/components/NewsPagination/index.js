import React, {Fragment, useState} from 'react';
import ReactPlayer from 'react-player/lazy'

import moment from 'moment';


const CheckVideoOrImg = ({imageUrl, videoUrl, title}) => {
  const [className, setPlayClass] = useState('news-cart-header')

  if (videoUrl) {
    return (
      <div className={`${className}`}>
        <ReactPlayer
          url={videoUrl}
          onPlay={() => {
            setPlayClass('news-cart-header-play')
          }}
          onPause={() => setPlayClass('news-cart-header')}
          onEnded={() => setPlayClass('news-cart-header')}
        />
      </div>
    )
  }

  return (
    <div className='news-cart-header'>
      <img src={imageUrl} alt={title}/>
    </div>
  )
}

function NewsPagination({newsesArray, displayNewsesCount, appLanguage}) {

  return (
    <Fragment>
      {
        newsesArray
          .slice(0, displayNewsesCount)
          .map(news => {
            const {imageUrl, videoUrl, title, description} = news;
            return (
              <div
                className='col-12 col-md-6 col-lg-4'
                key={`${news.id}_${appLanguage}`}
              >
                <div className='news-cart'>
                  {
                    <CheckVideoOrImg
                      imageUrl={imageUrl}
                      videoUrl={videoUrl}
                      title={title}
                    />
                  }
                  <div className='news-cart-body'>
                    <h4 className='news-cart-title'>{title}</h4>
                    <div className='flex'>
                                            <span className='news-cart-date'>
                                                <span className='news-day'>{new Date(news.createdDate).getDate()}</span>
                                              {moment(news.createdDate).format('MM')}/{moment(news.createdDate).format('YY')}
                                            </span>
                      <p>
                        {description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )
          })
      }
    </Fragment>
  )
}

export default NewsPagination;
