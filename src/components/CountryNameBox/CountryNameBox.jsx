import React, {Component} from 'react';
import styles from './CountryNameBox.module.css';

class CountryNameBox extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <>
                <div className={styles.countryName}>
                {this.props.name}
                </div>
            </>
        )
    }
}

export default CountryNameBox;