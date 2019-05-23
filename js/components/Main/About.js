import React, {Component} from "react"

class About extends Component {
    state = {  }
    render() {
        return (
            <section className="about-box containerx">
                <h2>Z czym to się je?</h2>
                <article>
                    <p>
                        Food Ninja to aplikacja umożliwiająca znalezienie w okolicy miejsca, gdzie dobrze zjesz! Z łatwością wyszukasz lokal w naszej bazie, którą tworzycie Wy, Użytkownicy. 
                    </p>
                    <p>
                        Zauważyłeś, że w okolicy powstał lokal, którego jeszcze nie widziałeś w internecie? Zmieniły się godziny otwarcia Twojej ulubionej knajpy? A może byłeś ostatnio w pobliskiej restauracji i chcesz podzielić się wrażeniami? Żaden problem! Zaloguj się w naszym serwisie, dodawaj opinie, nowe miejsca do bazy i aktualizuj dane!
                    </p>
                    <p>
                        Może jesteś nowy w okolicy lub po prostu wpadłeś przejazdem do ---Tutaj nazwa miejscowości---? Odpal Food Ninja i ciesz się z natychmiastowego dostępu do naszej bazy! 
                    </p>
                    <p>
                        Smacznego!
                    </p>
                </article>
            </section>
        );
    }
}

export default About;