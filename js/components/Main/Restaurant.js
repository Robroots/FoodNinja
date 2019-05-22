import React, {Component} from "react";
import Map from 'pigeon-maps';
import Marker from 'pigeon-marker';
import { Form, Button, Col} from 'react-bootstrap'

class Restaurant extends Component {
    state = {  
        place: false,
        edit: false,
        newPlace : false
    }

    componentDidMount() {
        const placeId = this.props.match.params.id;
        fetch("http://localhost:3000/restaurants/" + placeId)
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
            console.log(data);
            this.setState({
                place: data,
                newPlace : JSON.parse(JSON.stringify(data))

            })

        }).catch(err => {
            this.setState({
                error : err.message
            })
            console.log("Error:" + err.message)
        })
    }

    handleEditBtn = () => {
        this.setState({
            edit: true
        })
    }

    handleSubmitForm = (e) => {
        e.preventDefault();
        this.setState({

        })
    }

    handleInputChange = (e) => {

        const input = e.target
        console.log(input.name)
        const newPlace =  JSON.parse(JSON.stringify(this.state.newPlace));
        newPlace[input.name] = input.value
        this.setState({
            newPlace : newPlace
        })
    }

    render() {
        if(this.state.place){
           
            const place = this.state.place
            const inputPlace = this.state.newPlace
            return (
                <section className="restaurant-item containerx">
                    <h3 className="restaurant-item-name-header">{place.name}</h3>
                    <p className="restaurant-item-address">{place.address}</p>
                    <p className="restaurant-item-phone">Telefon: {place.phone}</p>
                    <p className="restaurant-item-rating">Ocena ogólna: {(place.ratings.reduce((sum, curr) => (sum + curr),0)/ place.ratings.length).toFixed(1)}
                    </p>
                    <h4 className="restaurant-item-subheader">Godziny otwarcia: </h4>
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
                    </ul>
                    <div className="restaurant-item-map" style={{width: "80%", margin: "0 auto", padding:"10px"}}>
                        <Map    center={[place.coords[0], place.coords[1]]} 
                                zoom={14}
                                height={400} 
                                onClick={this.handleMarkerClick} >
                            <Marker anchor={[place.coords[0], place.coords[1]]} payload={1}/>
                        </Map>
                    </div>
                    <h4>Dane są nieprawidłowe? Zaktualizuj sam!</h4>
                    <Button variant="info" onClick={this.handleEditBtn}>
                        Do dzieła!
                    </Button>
                    {(this.state.edit) && 
                        <div>
                            <Form onSubmit={this.handleSubmitForm}>
                                <Form.Group controlId="form-grid-name">
                                    <Form.Label>Nazwa lokalu</Form.Label>
                                    <Form.Control 
                                        value={inputPlace.name} 
                                        onChange={this.handleInputChange} 
                                        name="name">
                                    </Form.Control>
                                    <Form.Label>Adres</Form.Label>
                                    <Form.Control 
                                        value={inputPlace.address} 
                                        onChange={this.handleInputChange} 
                                        name="address">
                                    </Form.Control>
                                </Form.Group>
                            <Form.Row>
                                <Form.Group as={Col} controlId="form-grid-name">
                                    <Form.Label>Telefon</Form.Label>
                                    <Form.Control 
                                        value={inputPlace.phone} 
                                        onChange={this.handleInputChange} 
                                        name="phone">
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group as={Col} controlId="form-grid-name">
                                    <Form.Label as="legend" column>Dostawa</Form.Label>
                                    <Form.Check inline label="Dostępna" id="delivery"></Form.Check>
                                </Form.Group>
                            </Form.Row>
                            <Form.Group as={Col} controlId="form-grid-name">
                                <Form.Label as="legend" column>Rodzaj kuchni</Form.Label>
                                <Form.Check inline label="Kuchnia domowa" id="home"></Form.Check>
                                <Form.Check inline label="Pizza" id="pizza"></Form.Check>
                                <Form.Check inline label="Kuchnia włoska" id="italian"></Form.Check>
                                <Form.Check inline label="Fast-food" id="fast-food"></Form.Check>
                                <Form.Check inline label="Kuchnia wschodnia" id="east"></Form.Check>
                                <Form.Check inline label="Burgery" id="burger" ></Form.Check>
                            </Form.Group>
                            <Form.Label>Godziny otwarcia:</Form.Label>
                            <Form.Row>
                                <Form.Group as={Col} >
                                    <Form.Label>Poniedziałek</Form.Label>
                                    <Form.Control 
                                        value={inputPlace.openHours.monday} 
                                        onChange={this.handleInputChange} 
                                        name="openHours.monday">
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group as={Col} >
                                    <Form.Label>Wtorek</Form.Label>
                                    <Form.Control 
                                        value={inputPlace.openHours.tuesday} 
                                        onChange={this.handleInputChange} 
                                        name="openHours.tuesday">
                                    </Form.Control>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} >
                                    <Form.Label>Środa</Form.Label>
                                    <Form.Control 
                                        value={inputPlace.openHours.wednesday} 
                                        onChange={this.handleInputChange} 
                                        name="openHours.wednesday">
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group as={Col} >
                                    <Form.Label>Czwartek</Form.Label>
                                    <Form.Control 
                                        value={inputPlace.openHours.thursday} 
                                        onChange={this.handleInputChange} 
                                        name="openHours.thursday">
                                    </Form.Control>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} >
                                    <Form.Label>Piątek</Form.Label>
                                    <Form.Control 
                                        value={inputPlace.openHours.friday} 
                                        onChange={this.handleInputChange} 
                                        name="openHours.friday">
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group as={Col} >
                                    <Form.Label>Sobota</Form.Label>
                                    <Form.Control 
                                        value={inputPlace.openHours.saturday} 
                                        onChange={this.handleInputChange} 
                                        name="openHours.saturday">
                                    </Form.Control>
                                </Form.Group>
                            </Form.Row>
                            <Form.Group as={Col} >
                                <Form.Label>Niedziela</Form.Label>
                                <Form.Control 
                                    value={inputPlace.openHours.sunday} 
                                    onChange={this.handleInputChange} 
                                    name="openHours.sunday">
                                </Form.Control>
                            </Form.Group>
                            <Button variant="info" type="submit">
                            Zatwierdź
                            </Button>
                        </Form>
                    </div>
                    }
                </section>
            );
        }
        return <h2>Ładujemy dane</h2>
    }
}

export default Restaurant;