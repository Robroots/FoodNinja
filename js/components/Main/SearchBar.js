import React, {Component} from "react";
import { Form ,FormControl } from "react-bootstrap"

class SearchBar extends Component {
    state = {  
        search: "",
        placesBase: this.props.placesBase,
    }
    handleSearchChange = (e) => {
        this.setState({
            search: e.target.value
        })
    }

    handleSearchStart = (e) => {
        e.preventDefault();
        const {search, placesBase} = this.state
        let filtered = placesBase.filter(place => {
            if( place.name.toLowerCase().indexOf(search.toLowerCase()) >= 0 ||
                place.tags.indexOf(search.toLowerCase()) >= 0 ||
                place.address.toLowerCase().indexOf(search.toLowerCase()) >= 0 ||
                this.props.ratingCalc(place.ratings).toString().indexOf(search) >= 0){
                return true
            }
            return false
        })
        this.props.searchDb(filtered);
    }

    render() {
        return (
            <section className="search-box">
                <div>
                    <h2>Znajdź lokal w okolicy!</h2>
                    <Form onSubmit={this.handleSearchStart}>
                        <FormControl
                        type="text"
                        value={this.state.search}
                        name="search"  placeholder="Zacznij szukać!"
                        onChange={this.handleSearchChange} >
                        </FormControl>
                    </Form>
                </div>
            </section>
        );
    }
}

export default SearchBar;