import React, {Component} from 'react';
import styled from '@emotion/styled';
import styles from './ButtonBox.module.css';

const Button = styled.button `
    background-color: purple;
    color: white;
    width: 50%;
    height: 25%;
    border-radius: 10%;
    &:hover {
        background-color: orangered;
        cursor: pointer
    }
    &:focus {
        background-color: orangered;
    }
`;

class ButtonBox extends Component {
    constructor(props) {
        super(props)
        this.handlePointClick = this.handlePointClick.bind(this);
        this.handleNameClick = this.handleNameClick.bind(this);
    }

    handlePointClick = (event) => {
        event.preventDefault();
        this.props.addEmbassyPoints(event);
    }

    handleNameClick = (event) => {
        event.preventDefault();
        this.props.addEmbassyPointsNames(event);
    }

    render() {
        const button = this.props.titleActive
        const pointsActive = this.props.pointsActive
        const nameActive = this.props.nameActive
        return (
            <>
                <div className={styles.buttonBox}>
                    <Button 
                    variant="contained"
                    onClick={(event) => this.handlePointClick(event)}
                    >
                        {this.props.textOne}
                    </Button>
                    <div className={styles.break} />
                    <Button 
                    variant="contained"
                    onClick={(event) => this.handleNameClick(event)}
                    >
                        {this.props.textTwo}
                    </Button>
                </div>
            </>
        )
    }
}

export default ButtonBox;