import React, {Component} from 'react';
import styles from './CountryModal.module.css';
import styled from '@emotion/styled';

const Button = styled.button `
    background-color: salmon;
    color: white;
    width: 50%;
    height: 25%;
    border-radius: 10%;
    align-self: center;
    &:hover {
        background-color: purple;
        cursor: pointer
    }
`;

class CountryModal extends Component {

    closeModal = (event) => {
        event.preventDefault();
        this.props.modalActive(event);
    }

    render() {
        return (
            <>
                <main>
                    <section>
                        <div className={styles.modalMain}>
                            <div className={styles.mainContainer}>
                                <div className={styles.header}>
                                    <h1 className={styles.headerFont}>{this.props.data.Country}</h1>
                                </div>
                                <div className={styles.dataContainer}>
                                    <div className={styles.dataDivContainer}>
                                        { this.props.data.Status != null ? (
                                            <div className={styles.dataDiv}>
                                                <div className={styles.dataDivText}>
                                                    Status: {this.props.data.Status}
                                                </div>
                                            </div>
                                            ): <></>
                                        }
                                        { this.props.data.Bureau != null ? (
                                            <div className={styles.dataDiv}>
                                                <div className={styles.dataDivText}>
                                                    Bureau: {this.props.data.Bureau}
                                                </div>
                                            </div>
                                            ): <></>
                                        }
                                        { this.props.data.Post != null ? (
                                            <div className={styles.dataDiv}>
                                                <div className={styles.dataDivText}>
                                                    Post: {this.props.data.Post}
                                                </div>
                                            </div>
                                            ): <></>
                                        }
                                        { this.props.data.Property_Name != null ? (
                                            <div className={styles.dataDiv}>
                                                <div className={styles.dataDivText}>
                                                    Property Name: {this.props.data.Property_Name}
                                                </div>
                                            </div>
                                            ): <></>
                                        }
                                        { this.props.data.Property_Use != null ? (
                                            <div className={styles.dataDiv}>
                                                <div className={styles.dataDivText}>
                                                    Property Use: {this.props.data.Property_Use}
                                                </div>
                                            </div>
                                            ): <></>
                                        }
                                        { this.props.data.Ownership_Type != null ? (
                                            <div className={styles.dataDiv}>
                                                <div className={styles.dataDivText}>
                                                    Ownership Type: {this.props.data.Ownership_Type}
                                                </div>
                                            </div>
                                            ): <></>
                                        }
                                        { this.props.data.Property_ID != null ? (
                                            <div className={styles.dataDiv}>
                                                <div className={styles.dataDivText}>
                                                    Property ID: {this.props.data.Property_ID}
                                                </div>
                                            </div>
                                            ): <></>
                                        }
                                        { this.props.data.Real_Property_Unique_ID != null ? (
                                            <div className={styles.dataDiv}>
                                                <div className={styles.dataDivText}>
                                                    Real Property Unique ID: {this.props.data.Real_Property_Unique_ID}
                                                </div>
                                            </div>
                                            ): <></>
                                        }
                                    </div>
                                    <div className={styles.dataDivContainer}>
                                        { this.props.data.Street_Address_1 != null ? (
                                            <div className={styles.dataDiv}>
                                                <div className={styles.dataDivText}>
                                                    Street_Address: {this.props.data.Street_Address_1}
                                                </div>
                                            </div>
                                            ): <></>
                                        }
                                        { this.props.data.Street_Address_2 != null ? (
                                            <div className={styles.dataDiv}>
                                                <div className={styles.dataDivText}>
                                                    {this.props.data.Street_Address_2}
                                                </div>
                                            </div>
                                            ): <></>
                                        }
                                        { this.props.data.Street_Address_3 != null ? (
                                            <div className={styles.dataDiv}>
                                                <div className={styles.dataDivText}>
                                                    {this.props.data.Street_Address_3}
                                                </div>
                                            </div>
                                            ): <></>
                                        }
                                        { this.props.data.City != null ? (
                                            <div className={styles.dataDiv}>
                                                <div className={styles.dataDivText}>
                                                    City: {this.props.data.City}
                                                </div>
                                            </div>
                                            ): <></>
                                        }
                                        { this.props.data.Latitude != null ? (
                                            <div className={styles.dataDiv}>
                                                <div className={styles.dataDivText}>
                                                    Latitude: {this.props.data.Latitude}
                                                </div>
                                            </div>
                                            ): <></>
                                        }
                                        { this.props.data.Longitude != null ? (
                                            <div className={styles.dataDiv}>
                                                <div className={styles.dataDivText}>
                                                    Longitude: {this.props.data.Longitude}
                                                </div>
                                            </div>
                                            ): <></>
                                        }
                                        { this.props.data.Date_First_Acq != null ? (
                                            <div className={styles.dataDiv}>
                                                <div className={styles.dataDivText}>
                                                    Date First Acq: {this.props.data.Date_First_Acq}
                                                </div>
                                            </div>
                                            ): <></>
                                        }
                                        { this.props.data.Funding_Agency != null ? (
                                            <div className={styles.dataDiv}>
                                                <div className={styles.dataDivText}>
                                                    Funding Agency: {this.props.data.Funding_Agency}
                                                </div>
                                            </div>
                                            ): <></>
                                        }
                                        { this.props.data.Unnamed_17 != null ? (
                                            <div className={styles.dataDiv}>
                                                <div className={styles.dataDivText}>
                                                    Unnamed 17: {this.props.data.Unnamed_17}
                                                </div>
                                            </div>
                                            ): <></>
                                        }
                                    </div>
                                </div>
                                <div className={styles.buttonDiv}>
                                    <Button
                                    variant="contained"
                                    onClick={(event) => this.closeModal(event)}
                                    >
                                        Close
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>
            </>
        )
    }
}

export default CountryModal;