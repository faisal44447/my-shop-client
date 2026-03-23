import React from 'react';
import AwesomeSlider from '@rcaferati/react-awesome-slider';
import '@rcaferati/react-awesome-slider/styles.css';

const Banner = () => {
    return (
        <div className="w-full max-w-5xl mx-auto mt-5">
            <AwesomeSlider>
                <div data-src="https://picsum.photos/id/1018/1200/600" />
                <div data-src="https://picsum.photos/id/1015/1200/600" />
                <div data-src="https://picsum.photos/id/1019/1200/600" />
            </AwesomeSlider>
        </div>
    );
};

export default Banner;