// src/LiquidGauge.js
import React, { useState } from 'react';
import LiquidFillGauge from 'react-liquid-gauge';
import { color } from 'd3-color';
import { interpolateRgb } from 'd3-interpolate';

const LiquidGaugeComponent = () => {
    let testint = 57;
    const [value, setValue] = useState(0);
    const startColor = '#6495ed'; // cornflowerblue
    const endColor = '#00008B'; // crimson

    const radius = 70;
    const interpolate = interpolateRgb(startColor, endColor);
    const fillColor = interpolate(value / 100);
    const gradientStops = [
        {
            key: '0%',
            stopColor: color(fillColor).darker(0.5).toString(),
            stopOpacity: 1,
            offset: '0%'
        },
        {
            key: '50%',
            stopColor: fillColor,
            stopOpacity: 0.75,
            offset: '50%'
        },
        {
            key: '100%',
            stopColor: color(fillColor).brighter(0.5).toString(),
            stopOpacity: 0.5,
            offset: '100%'
        }
    ];

    return (
        <div>
            <LiquidFillGauge
                style={{ margin: '0 auto' }}
                width={radius * 2}
                height={radius * 2}
                value={value}
                percent="%"
                textSize={1}
                textOffsetX={0}
                textOffsetY={0}
                textRenderer={(props) => {
                    const value = Math.round(props.value);
                    const radius = Math.min(props.height / 2, props.width / 2);
                    const textPixels = (props.textSize * radius / 2);
                    const valueStyle = {
                        fontSize: textPixels
                    };
                    const percentStyle = {
                        fontSize: textPixels * 0.6
                    };

                    return (
                        <tspan>
                            <tspan className="value" style={valueStyle}>{value}</tspan>
                            <tspan style={percentStyle}>{props.percent}</tspan>
                        </tspan>
                    );
                }}
                riseAnimation
                waveAnimation
                waveFrequency={2}
                waveAmplitude={1}
                gradient
                gradientStops={gradientStops}
                circleStyle={{
                    fill: fillColor
                }}
                waveStyle={{
                    fill: fillColor
                }}
                textStyle={{
                    fill: color('#444').toString(),
                    fontFamily: 'Arial'
                }}
                waveTextStyle={{
                    fill: color('#fff').toString(),
                    fontFamily: 'Arial'
                }}
                onClick={() => {
                    setValue(Math.random() * 100);
                }}
            />
            <div
                style={{
                    margin: '20px auto',
                    width: 120
                }}
            >
                <button
                    type="button"
                    className="btn btn-default btn-block"
                    onClick={() => {
                        setValue(testint);
                    }}
                >
                    Refresh
                </button>
            </div>
        </div>
    );
};

export default LiquidGaugeComponent;
