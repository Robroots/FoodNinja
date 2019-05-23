import React, {Component} from "react";
import {NavLink} from "react-router-dom"
import {Button} from "react-bootstrap"

class RestaurantsList extends Component {
    state = { 
        placesBase: this.props.placesBase,
        filteredBase: false
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            filteredBase: nextProps.filteredBase
        })
    }

    filteredOrWholeDb = () => {
        if(!this.state.filteredBase){
            return this.state.placesBase;
        }
        return this.state.filteredBase;
    }

    render() {
        let whichDatabase = this.filteredOrWholeDb();
        let jsxPlaces = whichDatabase.map(place => {
            return(
                <li className="restaurant-item" key={place.id}>
                    <img className="shuriken" src="images/wurfstern-1741226_1280.png"></img>
                    <h3 className="restaurant-item-name-header">{place.name}</h3>
                    <p className="restaurant-item-address">{place.address}</p>
                    <p className="restaurant-item-phone">Telefon: {place.phone}</p>
                    <p className="restaurant-item-rating">Ocena ogólna: {this.props.ratingCalc(place.ratings)}
                    </p>
                    <h3 className="restaurant-item-subheader">Serwowane jedzenie:</h3>
                    <ul>
                        {place.tags.map((tag,i) => <li key={i}>{tag.charAt(0).toUpperCase() + tag.slice(1)}</li>)}
                    </ul>
                    
                    <NavLink 
                        to={"/restaurant/"+ place.id} 
                        className="nav-link" 
                        activeClassName="nav-active" >
                        <Button 
                            size="lg" 
                            variant="info" 
                            className="restaurant-item-morebtn"
                            >Szczegóły lokalu
                        </Button>
                    </NavLink>
                </li>
            )
        })
        return (
            <section className="list-box">
                <h2 className="box-header">Lokale w Twojej okolicy:</h2>
                <ul>
                    {jsxPlaces}
                </ul>
            </section>
        );
    }
}

export default RestaurantsList;