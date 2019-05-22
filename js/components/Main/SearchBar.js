import React, {Component} from "react"

class SearchBar extends Component {
    state = {  
        search: "",
        placesBase: this.props.placesBase
    }
    handleSearchChange = (e) => {
        this.setState({
            search: e.target.value
        })
    }
    render() {
        return (
            <section className="search-box">
                <div>
                    <h2>Znajdź lokal w okolicy!</h2>
                    <input  type="text"
                            value={this.state.search} 
                            name="search" 
                            placeholder="Zacznij szukać!" 
                            onChange={this.handleSearchChange}></input>
                </div>
            </section>
        );
    }
}

export default SearchBar;