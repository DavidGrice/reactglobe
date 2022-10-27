import React, { Component } from 'react';
import { styled } from '@mui/system';
import styles from './SliderBox.module.css';
import { Slider, Typography } from '@mui/material';

const CustomSlider = styled(Slider)(({ theme }) => ({
    color: '#52af77',
    height: '5%',
    width: '80%',
    '& .MuiSlider-track': {
        border: 'none',
    },
    '& .MuiSlider-thumb': {
        height: 24,
        width: 24,
        backgroundColor: '#fff',
        border: '2px solid currentColor',
        '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
        boxShadow: 'inherit',
        },
        '&:before': {
        display: 'none',
        },
    },
    '& .MuiSlider-valueLabel': {
        lineHeight: 1.2,
        fontSize: 12,
        background: 'unset',
        padding: 0,
        width: 32,
        height: 32,
        borderRadius: '50% 50% 50% 0',
        backgroundColor: '#52af77',
        transformOrigin: 'bottom left',
        transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
        '&:before': { display: 'none' },
        '&.MuiSlider-valueLabelOpen': {
        transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
        },
        '& > *': {
        transform: 'rotate(45deg)',
        },
    },
  }));

class SliderBox extends Component {
    constructor(props) {
        super(props)
        this.changeSliderSettings = this.changeSliderSettings.bind(this);
    }

    changeSliderSettings = (defaultValue, text) => {
        defaultValue.preventDefault();
        this.props.functionOne(defaultValue, text);
    }

    render() {
        return (
            <>
                <div className={styles.sliderBox}>
                    <div className={styles.sliderBoxTitle}>
                        <Typography 
                        id="settings" 
                        gutterBottom={true}
                        variant="h6">
                            Settings
                        </Typography>
                    </div>
                    <div className={styles.sliderBoxItems}>
                        <Typography id="minArea" gutterBottom>
                            {this.props.textOne}
                        </Typography>
                        <CustomSlider
                            aria-label="MinArea"
                            defaultValue={this.props.minArea} 
                            valueLabelDisplay="auto"
                            step={1} 
                            min={0} 
                            max={50}
                            onChange={(defaultValue) => this.changeSliderSettings(defaultValue, "minArea")}
                            enabled={true}
                        />
                        <Typography id="maxVisibleDot" gutterBottom>
                            {this.props.textTwo}
                        </Typography>
                        <CustomSlider
                            aria-label="MaxVisibleDot"
                            defaultValue={this.props.maxVisibleDot}
                            valueLabelDisplay="auto"
                            step={0.01}
                            min={-1}
                            max={1}
                            onChange={(defaultValue) => this.changeSliderSettings(defaultValue, "maxVisibleDot")}
                            enabled={true}
                        />
                    </div>
                </div>
            </>
        )
    }
}

export default SliderBox;