import React, {Component} from "react";
import Map from 'pigeon-maps';
import Marker from 'pigeon-marker';
import { Form, Button, Col, ToggleButtonGroup, ToggleButton, ButtonToolbar } from 'react-bootstrap'
import _ from 'lodash'

class Restaurant extends Component {
    state = {  
        place: false,
        edit: false,
        addOpinion: false,
        newPlace : false,
        opinion: {
            userName: '',
            rating: '',
            text: ''
        }
    }

    ratingCalc = (placeRatingsArr) => {
        const rating = (placeRatingsArr.reduce((sum, curr) => (sum + curr),0)/ placeRatingsArr.length).toFixed(1);
        if(!isNaN(rating)){
            return rating
        }
        return "Obiekt nie został jeszcze oceniony"
    }

    //Define initial value of foodType checkboxes depending on DB array "tags"
    hasFoodTypeCheckbox = (foodType) => {
        const hasFoodType = this.state.newPlace.tags.indexOf(foodType);
        if(hasFoodType !== -1){
            return true
        }
        return false
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
            this.setState({
                place: data,
                newPlace : _.cloneDeep(data)
            })

        }).catch(err => {
            this.setState({
                error : err.message
            })
            console.log("Error:" + err.message)
        })
    }

    handleEditBtn = (e) => {
        let editBtn = e.target;
        this.state.edit? editBtn.innerText = "Do dzieła!" : editBtn.innerText = "Anuluj"
        this.setState({
            edit: true
        })
    }

    handleOpinionAddBtn = (e) => {
        let addOpinionBtn = e.target;
        this.state.addOpinion? addOpinionBtn.innerText = "Do dzieła!" : addOpinionBtn.innerText = "Anuluj"
        this.setState({
            addOpinion: !this.state.addOpinion
        })
    }

    handleOpinionName = (e) => {
        const userName = e.target.value
        const newOpinion = {...this.state.opinion};
        newOpinion.userName = userName;
        this.setState({
            opinion : newOpinion
        })
    }

    handleOpinionRating = (e) => {
        const rating = e.target.value
        const newOpinion = {...this.state.opinion};
        newOpinion.rating = rating;
        this.setState({
            opinion : newOpinion
        })
    }

    handleOpinionText = (e) => {
        const text = e.target.value
        const newOpinion = {...this.state.opinion};
        newOpinion.text = text;
        this.setState({
            opinion : newOpinion
        })
    }

    handleOpinionSubmit = (e) => {
        e.preventDefault();
        const submitBtn = e.target.previousElementSibling.querySelector('button');
        const placeWithOpinion = _.cloneDeep(this.state.place);
        const newOpinion = {...this.state.opinion}
        placeWithOpinion.comments.push(newOpinion);
        this.setState({
            place: placeWithOpinion,
            addOpinion: false
        });
        submitBtn.innerText = "Do dzieła!"
        fetch("http://localhost:3000/restaurants/" + this.state.place.id, {
            method: 'put',
            body: JSON.stringify(placeWithOpinion),
            headers: {
                "Content-Type": "application/json"
            }
        })
    }

    handleInputChange = (e) => {
        const input = e.target
        const newPlace =  _.cloneDeep(this.state.newPlace);
        newPlace[input.name] = input.value
        this.setState({
            newPlace : newPlace
        })
    }

    handleOpenHoursChange = (e) => {
        const input = e.target;
        const newPlace =  _.cloneDeep(this.state.newPlace);
        newPlace.openHours[input.name] = input.value;
        this.setState({
            newPlace: newPlace
        })
    }

    handleDeliveryCheck = (e) => {
        const check = e.target;
        const newPlace = _.cloneDeep(this.state.newPlace)
        newPlace.delivery = check.checked;
        this.setState({
            newPlace : newPlace
        })
    }

    handleFoodTypesCheck = (e) => {
        const check = e.target;
        const foodType = check.id;
        const newPlace =  _.cloneDeep(this.state.newPlace);
        if(check.checked){
            newPlace.tags.push(foodType);
        } else {
            const hasFoodType = newPlace.tags.indexOf(foodType);
            hasFoodType !== -1 && newPlace.tags.splice(hasFoodType,1);
        }
        this.setState({
            newPlace : newPlace
        })
    }

    handleMapClick = (e) => {
        const newPlace =  _.cloneDeep(this.state.newPlace);
        newPlace.coords = e.latLng;
        this.setState({
            newPlace: newPlace
        })
    }

    handleSubmitForm = (e) => {
        e.preventDefault();
        this.setState({
            place : this.state.newPlace,
            edit: false
        })
        fetch("http://localhost:3000/restaurants/" + this.state.place.id, {
            method: 'put',
            body: JSON.stringify(this.state.newPlace),
            headers: {
                "Content-Type": "application/json"
            }
        })
    }

    render() {
        if(this.state.place){
            const place = this.state.place
            const inputPlace = this.state.newPlace
            const ratingBtns = [1,2,3,4,5];
            return (
                <section className="restaurant-item containerx">
                    <h3 className="restaurant-item-name-header">{place.name}</h3>
                    <p className="restaurant-item-address">{place.address}</p>
                    <p className="restaurant-item-phone">Telefon: {place.phone}</p>
                    <p className="restaurant-item-rating">Ocena ogólna: {this.ratingCalc(place.ratings)}
                    </p>
                    <h4 className="restaurant-item-subheader">Serwowane jedzenie:</h4>
                    <ul>
                        {place.tags.map((tag,i) => <li key={i}>{tag.charAt(0).toUpperCase() + tag.slice(1)}</li>)}
                    </ul>
                    <h4 className="restaurant-item-subheader">Godziny otwarcia: </h4>
                    <ul className="days-hours-ul">
                        {Object.entries(place.openHours).map(dayHours => 
                            <li className="day-hours-li" key={dayHours[0]}>{dayHours[0]}: {dayHours[1]}</li>
                        )}
                    </ul>
                    <div className="restaurant-item-map" style={{width: "80%", margin: "0 auto", padding:"10px"}}>
                        <Map    center={[place.coords[0], place.coords[1]]} 
                                zoom={14}
                                height={300} 
                                onClick={this.handleMarkerClick} >
                            <Marker anchor={[place.coords[0], place.coords[1]]} payload={1}/>
                        </Map>
                    </div>
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

                    <div className="restaurant-item-add-opinion">
                        <h4>Podziel się swoją opinią:</h4>
                        <Button size="lg" variant="info" onClick={this.handleOpinionAddBtn}>
                            Do dzieła!
                        </Button>
                    </div>


                    {/* ADD OPINION COMPONENT BELOW (has to be extracted to new component!)  */}


                    {this.state.addOpinion && 
                        <Form onSubmit={this.handleOpinionSubmit}>
                            <Form.Group>
                                <Form.Label>Wpisz swoje imię:</Form.Label>
                                <Form.Control type="text" name="userName" onChange={this.handleOpinionName}></Form.Control>
                                <Form.Label column>Twoja ocena:</Form.Label>
                                    <ToggleButtonGroup size='lg' name="rating">
                                        {ratingBtns.map(num => 
                                            <ToggleButton 
                                                variant="warning"
                                                key={num} 
                                                value={num} 
                                                onChange={this.handleOpinionRating}
                                                >{num}
                                            </ToggleButton>
                                        )}
                                    </ToggleButtonGroup>
                                <Form.Label column>Opisz swoje wrażenia:</Form.Label>
                                <Form.Control as='textarea' onChange={this.handleOpinionText}></Form.Control>
                                <Button
                                    type="submit" 
                                    size="lg" 
                                    variant="info" 
                                    >Zamieść opinię
                                </Button>
                            </Form.Group>
                        </Form>
                    }

                    <div className="restaurant-item-update">
                        <h4>Dane są nieprawidłowe? Zaktualizuj sam!</h4>
                        <Button size="lg" variant="info" onClick={this.handleEditBtn}>
                            Do dzieła!
                        </Button>
                    </div>


                    {/* FORM COMPONENT BELOW (has to be extracted to new component!) */}


                    {this.state.edit && 
                        <div>
                            <Form onSubmit={this.handleSubmitForm}>
                                <Form.Group controlId="form-grid-name-address">
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
                                <Form.Group as={Col} controlId="form-grid-phone">
                                    <Form.Label>Telefon</Form.Label>
                                    <Form.Control 
                                        value={inputPlace.phone} 
                                        onChange={this.handleInputChange} 
                                        name="phone">
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group as={Col} controlId="form-grid-delivery">
                                    <Form.Label as="legend" column>Dostawa</Form.Label>
                                    <Form.Check 
                                        inline label="Dostępna" 
                                        id="delivery" 
                                        onChange={this.handleDeliveryCheck}
                                        defaultChecked={this.state.newPlace.delivery}></Form.Check>
                                </Form.Group>
                            </Form.Row>
                            <Form.Group as={Col} controlId="form-grid-food-type">
                                <Form.Label as="legend" column>Rodzaj kuchni</Form.Label>
                                <Form.Check 
                                    inline 
                                    label="Kuchnia domowa" 
                                    id="home-food" 
                                    onChange={this.handleFoodTypesCheck} 
                                    defaultChecked={this.hasFoodTypeCheckbox("home-food")}></Form.Check>
                                <Form.Check
                                    inline 
                                    label="Pizza" 
                                    id="pizza" 
                                    onChange={this.handleFoodTypesCheck}
                                    defaultChecked={this.hasFoodTypeCheckbox("pizza")}></Form.Check>
                                <Form.Check 
                                    inline 
                                    label="Kuchnia włoska" 
                                    id="italian" onChange={this.handleFoodTypesCheck} 
                                    defaultChecked={this.hasFoodTypeCheckbox("italian")}></Form.Check>
                                <Form.Check 
                                    inline 
                                    label="Fast-food" 
                                    id="fast-food" 
                                    onChange={this.handleFoodTypesCheck} 
                                    defaultChecked={this.hasFoodTypeCheckbox("fast-food")}></Form.Check>
                                <Form.Check 
                                    inline 
                                    label="Kuchnia wschodnia" 
                                    id="east" 
                                    onChange={this.handleFoodTypesCheck} 
                                    defaultChecked={this.hasFoodTypeCheckbox("east")}></Form.Check>
                                <Form.Check 
                                    inline 
                                    label="Burgery" 
                                    id="burger" 
                                    onChange={this.handleFoodTypesCheck} 
                                    defaultChecked={this.hasFoodTypeCheckbox("burger")}></Form.Check>
                            </Form.Group>
                            <Form.Label>Godziny otwarcia:</Form.Label>
                            <Form.Row>
                                <Form.Group as={Col}>
                                    <Form.Label>Poniedziałek</Form.Label>
                                    <Form.Control 
                                        value={inputPlace.openHours.monday} 
                                        onChange={this.handleOpenHoursChange} 
                                        name="monday">
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group as={Col} >
                                    <Form.Label>Wtorek</Form.Label>
                                    <Form.Control 
                                        value={inputPlace.openHours.tuesday} 
                                        onChange={this.handleOpenHoursChange} 
                                        name="tuesday">
                                    </Form.Control>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} >
                                    <Form.Label>Środa</Form.Label>
                                    <Form.Control 
                                        value={inputPlace.openHours.wednesday} 
                                        onChange={this.handleOpenHoursChange} 
                                        name="wednesday">
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group as={Col} >
                                    <Form.Label>Czwartek</Form.Label>
                                    <Form.Control 
                                        value={inputPlace.openHours.thursday} 
                                        onChange={this.handleOpenHoursChange} 
                                        name="thursday">
                                    </Form.Control>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} >
                                    <Form.Label>Piątek</Form.Label>
                                    <Form.Control 
                                        value={inputPlace.openHours.friday} 
                                        onChange={this.handleOpenHoursChange} 
                                        name="ofriday">
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group as={Col} >
                                    <Form.Label>Sobota</Form.Label>
                                    <Form.Control 
                                        value={inputPlace.openHours.saturday} 
                                        onChange={this.handleOpenHoursChange} 
                                        name="saturday">
                                    </Form.Control>
                                </Form.Group>
                            </Form.Row>
                            <Form.Group as={Col} >
                                <Form.Label>Niedziela</Form.Label>
                                <Form.Control 
                                    value={inputPlace.openHours.sunday} 
                                    onChange={this.handleOpenHoursChange} 
                                    name="sunday">
                                </Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Nowa lokalizacja</Form.Label>
                                <div className="restaurant-item-map" style={{width: "80%", margin: "0 auto", padding:"10px"}}>
                                    <Map center={this.state.newPlace.coords} 
                                        zoom={14}
                                        height={250} 
                                        onClick={this.handleMapClick} >
                                        <Marker anchor={this.state.newPlace.coords} payload={1}/>
                                    </Map>
                                </div>
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