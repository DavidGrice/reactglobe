import React, {Component} from 'react';
import styled from '@emotion/styled';
import styles from './NavigationBar.module.css';

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

class NavigationBar extends Component {
    constructor(props) {
        super(props)
        this.changeToGlobe = this.changeToGlobe.bind(this);
    }

    changeToGlobe = (event, type) => {
        event.preventDefault();
        if (type === "Point") {
            this.props.functionOne(event, type);
        }
        else if (type === "Polygon") {
            this.props.functionTwo(event,type);
        }
    }

    render() {
        return (
            <>
                <div className={styles.buttonBox}>
                    <div className={styles.title}>
                        <h3>Navigation</h3>
                    </div>
                    { this.props.textOne ? 
                        <>
                            <Button 
                            variant="contained"
                            onClick={(event) => this.changeToGlobe(event, "Point")}
                            >
                                {this.props.textOne}
                            </Button> 
                        </> : <></>
                    }
                    { this.props.textTwo ? 
                        <>
                            <div className={styles.break} /> 
                            <Button 
                            variant="contained"
                            onClick={(event) => this.changeToGlobe(event, "Polygon")}
                            >
                                {this.props.textTwo}
                            </Button> 
                        </> : <></>
                    }
                </div>
            </>
        )
    }
}

export default NavigationBar;