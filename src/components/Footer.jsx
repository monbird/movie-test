import React, { Component } from 'react';

class Footer extends Component {
    render() {
        return (
            <footer>
                <p id="author">
                    Designed and Coded by{' '}
                    <a
                        href="http://monbird.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Monbird
                    </a>
                </p>
            </footer>
        );
    }
}

export default Footer;
