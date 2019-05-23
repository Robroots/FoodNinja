import React, {Component} from "react";
import Map from 'pigeon-maps';
import Marker from 'pigeon-marker';
import { Form, Button, Col } from 'react-bootstrap';
import _ from 'lodash';

class NewRestaurant extends Component {
    state = { 
      id: "",
      name: "",
      tags: [],
      address: "",
      coords: [50.0329195897288, 20.215832961506834],
      phone: "",
      delivery: false,
      openHours: {
        monday: "",
        tuesday: "",
        wednesday: "",
        thursday: "",
        friday: "",
        saturday: "",
        sunday: ""
      },
      ratings: [],
      comments: []
    }
    

    handleInputChange = (e) => {
        const input = e.target
        this.setState({
            [input.name] : input.value
        })
    }

    handleDeliveryCheck = (e) => {
        this.setState({
            delivery : e.target.checked
        })
    }

    handleFoodTypesCheck = (e) => {
        const check = e.target;
        const foodType = check.id;
        const newTags = [...this.state.tags]
        if(check.checked){
            newTags.push(foodType);
        } else {
            const hasFoodType = newTags.indexOf(foodType);
            hasFoodType !== -1 && newTags.splice(hasFoodType,1);
        }
        this.setState({
            tags : newTags
        })
    }

    handleOpenHoursChange = (e) => {
        const input = e.target;
        const newOpenHours = {...this.state.openHours};
        newOpenHours[input.name] = input.value;
        this.setState({
            openHours: newOpenHours
        })
    }

    handleMapClick = (e) => {
        let newCoords = [...this.state.coords];
        newCoords = e.latLng;
        this.setState({
            coords: newCoords
        })
    }

    handleSubmitForm = (e) => {
        e.preventDefault();
        fetch("http://localhost:3000/restaurants/",{
            method: 'post',
            body: JSON.stringify(this.state),
            headers: {
                "Content-Type": "application/json"
            }
        })
    }

    render() {
        return (
            <section className="containerx new-restaurant">
                <Form onSubmit={this.handleSubmitForm}>
                    <Form.Group controlId="form-grid-name">
                        <Form.Label>Nazwa lokalu</Form.Label>
                        <Form.Control 
                            value={this.state.name} 
                            onChange={this.handleInputChange} 
                            name="name">
                        </Form.Control>
                        <Form.Label>Adres</Form.Label>
                        <Form.Control 
                            value={this.state.address} 
                            onChange={this.handleInputChange} 
                            name="address">
                        </Form.Control>
                    </Form.Group>
                    <Form.Row>
                        <Form.Group as={Col} controlId="form-grid-name">
                            <Form.Label>Telefon</Form.Label>
                            <Form.Control 
                                value={this.state.phone} 
                                onChange={this.handleInputChange} 
                                name="phone">
                            </Form.Control>
                        </Form.Group>
                        <Form.Group as={Col} controlId="form-grid-name">
                            <Form.Label as="legend" column>Dostawa</Form.Label>
                            <Form.Check 
                                inline label="Dostępna" 
                                id="delivery" 
                                onChange={this.handleDeliveryCheck}
                            ></Form.Check>
                        </Form.Group>
                    </Form.Row>
                    <Form.Group as={Col} controlId="form-grid-name">
                        <Form.Label as="legend" column>Rodzaj kuchni</Form.Label>
                        <Form.Check 
                            inline 
                            label="Kuchnia domowa" 
                            id="home-food" 
                            onChange={this.handleFoodTypesCheck} 
                        ></Form.Check>
                        <Form.Check
                            inline 
                            label="Pizza" 
                            id="pizza" 
                            onChange={this.handleFoodTypesCheck}
                        ></Form.Check>
                        <Form.Check 
                            inline 
                            label="Kuchnia włoska" 
                            id="italian" onChange={this.handleFoodTypesCheck} 
                        ></Form.Check>
                        <Form.Check 
                            inline 
                            label="Fast-food" 
                            id="fast-food" 
                            onChange={this.handleFoodTypesCheck} 
                        ></Form.Check>
                        <Form.Check 
                            inline 
                            label="Kuchnia wschodnia" 
                            id="east" 
                            onChange={this.handleFoodTypesCheck} 
                        ></Form.Check>
                        <Form.Check 
                            inline 
                            label="Burgery" 
                            id="burger" 
                            onChange={this.handleFoodTypesCheck} 
                        ></Form.Check>
                    </Form.Group>
                    <Form.Label>Godziny otwarcia:</Form.Label>
                    <Form.Row>
                        <Form.Group as={Col} >
                            <Form.Label>Poniedziałek</Form.Label>
                            <Form.Control 
                                value={this.state.openHours.monday} 
                                onChange={this.handleOpenHoursChange} 
                                name="monday">
                            </Form.Control>
                        </Form.Group>
                        <Form.Group as={Col} >
                            <Form.Label>Wtorek</Form.Label>
                            <Form.Control 
                                value={this.state.openHours.tuesday} 
                                onChange={this.handleOpenHoursChange} 
                                name="tuesday">
                            </Form.Control>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} >
                            <Form.Label>Środa</Form.Label>
                            <Form.Control 
                                value={this.state.openHours.wednesday}
                                onChange={this.handleOpenHoursChange} 
                                name="wednesday">
                            </Form.Control>
                        </Form.Group>
                        <Form.Group as={Col} >
                            <Form.Label>Czwartek</Form.Label>
                            <Form.Control 
                                value={this.state.openHours.thursday}
                                onChange={this.handleOpenHoursChange} 
                                name="thursday">
                            </Form.Control>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} >
                            <Form.Label>Piątek</Form.Label>
                            <Form.Control 
                                value={this.state.openHours.friday}
                                onChange={this.handleOpenHoursChange} 
                                name="friday">
                            </Form.Control>
                        </Form.Group>
                        <Form.Group as={Col} >
                            <Form.Label>Sobota</Form.Label>
                            <Form.Control 
                                value={this.state.openHours.saturday}
                                onChange={this.handleOpenHoursChange} 
                                name="saturday">
                            </Form.Control>
                        </Form.Group>
                    </Form.Row>
                    <Form.Group as={Col} >
                        <Form.Label>Niedziela</Form.Label>
                        <Form.Control 
                            value={this.state.openHours.sunday}
                            onChange={this.handleOpenHoursChange} 
                            name="sunday">
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Lokalizacja</Form.Label>
                        <div className="restaurant-item-map" style={{width: "80%", margin: "0 auto", padding:"10px"}}>
                            <Map center={this.state.coords} 
                                zoom={14}
                                height={250} 
                                onClick={this.handleMapClick} >
                                <Marker anchor={this.state.coords} payload={1}/>
                            </Map>
                        </div>
                    </Form.Group>
                    <Button size="lg" variant="info" type="submit">
                    Dodaj!
                    </Button>
                </Form>
            </section>
        );
    }
}

export default NewRestaurant;