import React from 'react';
import FooterButtons from '../../footer-buttons';
import read from '../../../components/read-state';
import Styles from '../styles';

const Contact = (state) => (
      <div className={ Styles.container }>
        <div>
          <h1 className={ Styles.title }>Contact Us</h1>
        </div>
        <div className={ Styles.footerButtons }> 
          <FooterButtons id='FooterButtons'></FooterButtons>
        </div>
        <div className={ Styles.contactUs }> 
          <div className={ Styles.companyDetails }>
            <ul className={ Styles.items }>
                <li className={ Styles.subTitle }>Company Details</li>
                <li>
                  <div className={ Styles.iconMosaic }>
                    <img src='http://test.volo.nz/images/mosaic.png' className={ Styles.imageMosaic } />
                  </div>
                  Mosaic Enterprises Ltd
                </li>
                <li>Brand: Volo</li>
                <li>New Zealand registered: #5275301</li>
                <li>GST: 114 376 507</li>
                <li className='logos'>
                  <div className='mosaic-logo'></div>
                  <div className='volo-logo'></div>
                </li>
            </ul>
          </div>
          <div className={ Styles.contactDetails }>
            <ul className={ Styles.items }>
                <li className={ Styles.subTitle }>Contact</li>
                <li>
                  <div className={ Styles.iconPhone }>
                    <i className="fa fa-phone"></i>
                  </div>
                  <span>0800 86 56 63</span>
                </li>
                <li>
                  <span>enquiry@mosaic.gen.nz</span>
                </li>
            </ul>
          </div>
          <div className={ Styles.postalAddress }>
            <ul className={ Styles.items }>
                <li className='icon-item'>
                  <div className={ Styles.iconEnvelope }>
                    <i className="fa fa-envelope"></i>
                  </div>
                </li>
                <li className={ Styles.subTitle }>Postal Address</li>
                <li>Mosaic Enterprises Ltd</li>
                <li>PO Box 56180</li>
                <li>Dominion Rd</li>
                <li>Auckland</li>
                <li>1446</li>
            </ul>
          </div>
          <div className={ Styles.physicalAddress }>
            <ul className={ Styles.items }>
                <li className={ Styles.subTitle }>Office</li>
                <li>Level 1</li>
                <li>56 Shackleton Rd</li>
                <li>Auckland</li>
                <li>Mt Eden</li>
                <li>1024</li>
                <li>
                  <div className={ Styles.iconBuilding }>
                    <i className="fa fa-building"></i>
                  </div>
                </li>
            </ul>
          </div>
        </div>
        <div className={ Styles.footer }> 
          <span className={ Styles.footerField }>&copy; Mosaic Enterprises Limited { new Date().getFullYear() } </span>
          <span className={ Styles.footerField }>| </span>
          <span className={ Styles.footerField }>Proudly Kiwi </span>
        </div>
      </div>
);

export default read(Contact);