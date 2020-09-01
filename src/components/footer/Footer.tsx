import * as React from 'react';
import './Footer.less'
import {version} from '../../../package.json'

const Footer = () => {
    return (
        <div className='footerWrapper'>
            <span>当前版本号：{version}</span>
        </div>
    )
}

export default Footer;