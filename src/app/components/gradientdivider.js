import React from 'react';
import Image from 'next/image';

class GradientDivider extends React.Component {
    render() {
        return (
            <div className="flex flex-col items-center justify-center w-screen h-auto">
                <div className='w-full h-16 bg-black'></div>
                <div className="w-full h-[128px] bg-gradient-to-b from-black to-transparent"></div>
            </div>
        );
    }
}

export default GradientDivider;