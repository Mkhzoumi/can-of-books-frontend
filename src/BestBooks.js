import React from 'react';
import { withAuth0 } from "@auth0/auth0-react";
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddBookButton from './Components/AddBookButton';
import DeleteButton from './Components/DeleteBook';
import UpdateBookButton from './Components/UpdateBookButton';

class BestBooks extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            booksData: [],
            booksStatus: false
        }
    }

    booksDataAfterDelet = (newDataAfterDelet) => {
        this.setState({
            booksData: newDataAfterDelet
        })}

        booksDataAfterUpdate = (newDataAfterupdate) => {
            this.setState({
                booksData: newDataAfterupdate
            })

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

        newBooks = (newBooksData) => {
            this.setState({
                booksData: newBooksData
            })
        };


        render(){
            return (
                <>
                    <AddBookButton
                        newBooks={this.newBooks}
                    />
                    {this.state.booksStatus && this.state.booksData  && 
                        <Carousel>

                            {this.state.booksData.Books.map((value, index) => {
                                return (


                                    <Carousel.Item>
                                        <img
                                            className="d-block w-100"
                                            src="http://piracy.americanassembly.org/wp-content/uploads/2016/04/black-header-800x400.jpg"
                                            alt="First slide"
                                        />
                                        <Carousel.Caption style={{ 'margin-bottom': '20%' }}>
                                            <h1>{value.name}</h1>
                                            <p>{value.description}</p>
                                            <p>{value.status}</p>
                                            <DeleteButton
                                                BookIndex={index}
                                                booksDataAfterDelet={this.booksDataAfterDelet}
                                            />
                                            <UpdateBookButton
                                                booksDataAfterUpdate={this.booksDataAfterUpdate}
                                                BookIndex={index}
                                            />
                                        </Carousel.Caption>


                                    </Carousel.Item>

                                )
                            })}
                        </Carousel>
                    }
                </>
            )
        };
    };

    export default withAuth0(BestBooks);
