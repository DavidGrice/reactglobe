import React, {Component} from 'react';
import styles from './Title.module.css';

class Title extends Component {
    render() {
        return (
            <div id="title-subtitle" className={styles.title_subtitle}>
			<div id="main-title" className={styles.main_title}>IMPACT GLOBE</div>
			<div id="main-subtitle" className={styles.main_subtitle}>By David Grice</div>
		    </div>
        )
    }
      
}

export default Title;