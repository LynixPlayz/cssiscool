import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const BrandButton = ({ href, brandicon }) => {
    console.log(brandicon);
    return (
        <a href={href}>
            <button className="aspect-square w-16 m-5 backdrop-blur-2xl rounded-lg hover:bg-white hover:bg-opacity-50 transition-colors">
                <FontAwesomeIcon icon={brandicon} size="2xl" />
            </button>
        </a>
    );
};

export default BrandButton;
