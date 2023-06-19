import React from 'react';
import '../styles/Footer.css';
const Footer = () => {
  return (
    <div className='footer'>
      <div className='footer-recent'>
        <a href='' target='_blank'>
          About me
        </a>
        <a href='' target='_blank'>
          Services
        </a>
      </div>
      
      <ul className='footer-social-handles'>
        <li>
            <a href='https://github.com/Akash-cloud001' target='_blank'>
              <i className="ri-github-line"></i>
            </a>
        </li>
        <li>
          <a href='https://twitter.com/parmarSKY_' target='_blank'>
            <i className="ri-twitter-line"></i>
          </a>
        </li>
        <li>
          <a href='https://www.linkedin.com/in/akash-parmar-/' target='_blank'>
            <i className="ri-linkedin-line"></i>
          </a>
        </li>
      </ul>

      <div className='footer-trademark'>
        <i className="ri-copyright-line"></i> 2023 E-Store
      </div>
    </div>
  )
}

export default Footer;