import React, {Component} from 'react';

import SearchBar from './SearchBar';
import RestaurantsList from './RestaurantsList';

class Home extends Component {
    state = {
        placesBase: false,
        filteredBase: false
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

    searchDb = (filteredBase) => {
        this.setState({
            filteredBase: filteredBase
        })
    }

    ratingCalc = (placeRatingsArr) => {
        const rating = (placeRatingsArr.reduce((sum, curr) => (sum + curr),0)/ placeRatingsArr.length).toFixed(1);
        if(!isNaN(rating)){
            return rating
        }
        return "Obiekt nie został jeszcze oceniony"
    }

    render() {
        if(this.state.placesBase){
            return(
                <>
                <SearchBar 
                    placesBase={this.state.placesBase} 
                    searchDb={this.searchDb}
                    ratingCalc={this.ratingCalc}/>
                <RestaurantsList 
                    placesBase={this.state.placesBase} 
                    filteredBase={this.state.filteredBase}
                    ratingCalc={this.ratingCalc}/>
                </>
            )
        }
        return (
            <h2>Ładujemy dane</h2>
        );
    }
}

export default Home;