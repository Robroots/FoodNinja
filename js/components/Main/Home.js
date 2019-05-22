import React, {Component} from 'react';

import SearchBar from './SearchBar';
import RestaurantsList from './RestaurantsList';

class Home extends Component {
    state = {
        placesBase: false
    }

    componentDidMount() {
        fetch("http://localhost:3000/restaurants")
        .then(resp => {
            if(resp.ok){
                return resp.json();
            } else {
                throw new Error("Error during connection")
            }
        }).then(data => {
            if (!data || data.length === 0){
                throw new Error("Data is unvalid")
            }
            console.log(data)
            this.setState({
                placesBase: data
            })
        }).catch(err => {
            this.setState({
                error : err.message
            })
            console.log("Error:" + err.message)
        })
    }

    render() {
        if(this.state.placesBase){
            return(
                <>
                <SearchBar placesBase={this.state.placesBase}/>
                <RestaurantsList placesBase={this.state.placesBase}/>
                </>
            )
        }
        return (
            <h2>Ładujemy dane</h2>
        );
    }
}

export default Home;