import React from 'react';
import { withAuth0 } from "@auth0/auth0-react";
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';


class BestBooks extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            booksData: [],
            booksStatus: false
        }
    }

    componentDidMount = async () => {
        await axios.get(`${process.env.REACT_APP_SERVER}/books?email=${this.props.auth0.user.email}`).then(response => {
            this.setState({
                booksData: response.data,
                booksStatus: true
            })
        }).catch(
            error => {
                alert(error.message);
            }
        );
    }


    render() {
        return (
            <>
                {this.state.booksStatus &&
                    <Carousel>

                    {this.state.booksData[0].Books.map(value => {
                        return (

                            
                                <Carousel.Item>
                                    <img
                                        className="d-block w-100"
                                        src="http://piracy.americanassembly.org/wp-content/uploads/2016/04/black-header-800x400.jpg"
                                        alt="First slide"
                                    />
                                    <Carousel.Caption style={{'margin-bottom':'20%'}}>
                                        <h1>{value.name}</h1>
                                        <p>{value.description}</p>
                                        <p>{value.status}</p>
                                    </Carousel.Caption>
                                </Carousel.Item>
                            
                        )
                    })}
                    </Carousel>
                }
            </>
        )
    }
}

export default withAuth0(BestBooks);
