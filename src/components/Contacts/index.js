import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import emailjs from 'emailjs-com'
import contact_hero_bg from '../../assets/images/contact/contact-hero-bg.png';
import about_section_bg from '../../assets/images/index/about-section-bg.svg';

import './style.css'


function Contacts(props) {
  const {t} = useTranslation()
    const [isEmptyChecked, setIsEmptyChecked] = useState({
        name: true,
        phone: true,
        email: true,
        message: true
    })
  const [form, setForm] = useState({
      name: '',
      phone: '',
      email: '',
      message: '',
  })
    const send = () => {
      let send = true
        const data = Object.entries(form).filter(([k,v],i)=>!(!!v))
        const keys = Object.keys(Object.fromEntries(data))
        for(let i of Object.keys(isEmptyChecked)){
            if (keys.includes(i)){
                setIsEmptyChecked({...isEmptyChecked, [i]: false})
                send = false
            }
        }
      if(send) {
          emailjs.send(`service_4h5b9jm`, `template_ta9cj93`, form, `user_FN1lFoPWBQUKmhijE32ec`)
              .then(result => console.log(result))
      }
    }
  return (
    <main>
      <section className='hero-image-section' style={{backgroundImage: `url(${contact_hero_bg})`}}></section>

      <section className='app-navlink-section'>
        <div className='container'>
          <ul className='flex'>
            <li><Link to='/'>Pandora</Link></li>
            <li><span>{t('common:CONTACTS')}</span></li>
          </ul>
        </div>
      </section>

      <section className="app-contact-section" style={{backgroundImage: `url(${about_section_bg})`}}>
        <div className="container">
          <h2 className="app-head-title">{t('common:CONTACT_US')}</h2>
          <div>
              <div className={'app_form'}>
                  <div className="row">
                      <div className="col-12 col-lg-6">
                          <label htmlFor="name_id">Имя Фамилия <span>*</span></label>
                          <input
                              style={!isEmptyChecked.name ? {borderColor: "red"} : {}}
                              value={form.name}
                              onChange={e => setForm({...form, name: e.target.value})}
                              id={'name_id'} type="text"
                          />
                      </div>
                      <div className="col-12 col-lg-6">
                          <label htmlFor="email_id">Электронный Адрес  <span>*</span></label>
                          <input style={!isEmptyChecked.email ? {borderColor: "red"} : {}}
                                 value={form.email} onChange={e => setForm({...form, email: e.target.value})}
                                 id={'email_id'} type="email"
                          />
                      </div>
                      <div className="col-12">
                          <label htmlFor="tel_id">Телефон  <span>*</span></label>
                          <input style={!isEmptyChecked.phone ? {borderColor: "red"} : {}}
                                 value={form.phone}
                                 onChange={e => setForm({...form, phone: e.target.value})}
                                 id={'tel_id'} type="telephone"
                          />
                      </div>
                      <div className="col-12">
                          <label htmlFor="mess_id">Сообщение  <span>*</span></label>
                          <textarea style={!isEmptyChecked.message ? {borderColor: "red"} : {}}
                                    value={form.message}
                                    onChange={e => setForm({...form, message: e.target.value})} id={'mess_id'}
                          ></textarea>
                      </div>
                      <div className="col-12">
                          <button onClick={() => send()} className={'ant-btn ant-btn-primary'}>ОТПРАВИТЬ СООБЩЕНИЕ</button>
                      </div>
                  </div>
              </div>
          </div>
        </div>
      </section>
    </main>
  )

}

export default Contacts


