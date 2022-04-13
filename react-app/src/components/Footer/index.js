import './Footer.css';

function Footer() {
    return (
        <div className='footer'>
            <span className='footer-ele about'>About</span>
            <a
                className='footer-ele'
                href='https://github.com/pierikm/shreddit'
                rel="noreferrer"
                target="_blank">
                <i
                    className='footer-icon fa-brands fa-github fa-xl'>
                </i>
            </a>
            <a
                className='footer-ele'
                href='https://www.linkedin.com/in/matthew-pierik-197042156/'
                rel="noreferrer"
                target="_blank">
                <i
                    className='footer-icon fa-brands fa-linkedin fa-xl'>
                </i>
            </a>
        </div>
    )
}

export default Footer;
