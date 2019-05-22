import React, {Component} from "react";
import {NavLink} from "react-router-dom"
import Restaurant from "./Restaurant";

class RestaurantsList extends Component {
    state = { 
        placesBase: this.props.placesBase
    }

    render() {
        let jsxPlaces = this.state.placesBase.map(place => {
            return(
                <li className="restaurant-item" key={place.id}>
                    <h3 className="restaurant-item-name-header">{place.name}</h3>
                    <p className="restaurant-item-address">{place.address}</p>
                    <p className="restaurant-item-phone">Telefon: {place.phone}</p>
                    <p className="restaurant-item-rating">Ocena ogólna: {(place.ratings.reduce((sum, curr) => (sum + curr),0)/ place.ratings.length).toFixed(1)}
                    </p>
                    <h3 className="restaurant-item-subheader">Serwowane jedzenie:</h3>
                    <ul>
                        {place.tags.map((tag,i) => <li key={i}>{tag.charAt(0).toUpperCase() + tag.slice(1)}</li>)}
                    </ul>
                    {/* <h4 className="restaurant-item-subheader">Godziny otwarcia: </h4>
                    <ul className="days-hours-ul">
                        {Object.entries(place.openHours).map(dayHours => 
                            <li className="day-hours-li" key={dayHours[0]}>{dayHours[0]}: {dayHours[1]}</li>
                        )}
                    </ul>
                    <h4 className="restaurant-item-subheader">Opinie: </h4>
                    <ul className="comments-ul">
                        {place.comments.map((comment, i) => 
                            <li className="comments-li" key={i}>
                                <span className="comments-user">{comment.userName}: </span>
                                <span className="comments-text">"{comment.text}"</span>
                                <p className="comments-rating">Ocena: {comment.rating}</p>                    
                            </li>
                        )}
                    </ul> */}
                    <button className="restaurant-item-morebtn">Więcej komentarzy</button>
                    <button className="restaurant-item-morebtn">
                        <NavLink 
                            to={"/restaurant/"+ place.id} 
                            className="nav-link" 
                            activeClassName="nav-active" 
                            >Szczegóły lokalu</NavLink>
                    </button>
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