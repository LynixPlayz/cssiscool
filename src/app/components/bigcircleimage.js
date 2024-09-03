import React from 'react';
import Image from 'next/image';

const BigCircleImage = () => {
    return (
        <div
            style={{
                height: '640px',
                width: '640px',
                borderRadius: '50%',
                overflow: 'hidden',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative', // Add position relative
            }}
        >
            <Image
                src="/image.png"
                alt="Big Circle Image"
                layout="fill"
                objectFit="cover"
                style={{ position: 'absolute', top: 0, left: 0 }} // Add position absolute and adjust top and left to 0
            />
        </div>
    );
};

export default BigCircleImage;
