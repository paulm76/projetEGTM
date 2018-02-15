import React, { Component } from 'react';
import { Loader, List, Input, Button, Select, Label } from 'semantic-ui-react';
import styled from 'styled-components';

import TeamItem from '../TeamItem';
import FilterForm from '../FilterForm';
import cityArray from '../../constants/cityArray'
import themeArray from '../../constants/themeArray';
import difficultyArray from '../../constants/difficultyArray';
import FrontPageForm from '../FrontPageForm';
import findPrice from '../../scripts/findPrice.js';
import formatedDate from '../../scripts/formatedDate.js';

class FrontPageView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      teams: '',
      city: '',
      priceMax: 0,
      playerNb: 0,
      hourMin: 0,
      hourMax: 0,
      date: '',
      theme: '',
      difficulty: '',
      teamsSave: '',
      filter: false,
      error: '',
    };

    this.stateUpdate = this.stateUpdate.bind(this);
    this.submitFilters = this.submitFilters.bind(this);
    this.onSelectCity = this.onSelectCity.bind(this);
    this.onSelectDate = this.onSelectDate.bind(this);
    this.onSelectPlace = this.onSelectPlace.bind(this);
    this.onSelectTheme = this.onSelectTheme.bind(this);
    this.onSelectDifficulty = this.onSelectDifficulty.bind(this);
    this.onSelectMaxPrice = this.onSelectMaxPrice.bind(this);
    this.onSelectMinHour = this.onSelectMinHour.bind(this);
    this.onSelectMaxHour = this.onSelectMaxHour.bind(this);
  }

  submitFilters(){
    if (this.state.teams != []){
      if (this.state.city || this.state.priceMax || this.state.playerNb || this.state.hourMin || this.state.hourMax || this.state.date || this.state.theme || this.state.difficulty){
        var filteredTeams = [];
        var teamsLen = this.state.teamsSave.length;
        for (var i=0; i<teamsLen; i++){
          var cityBool, priceMaxBool, playerNbBool, hourMinBool, hourMaxBool, dateBool, themeBool, difficultyBool;
          if (this.state.city != ''){
            cityBool = false;
            if (this.state.city == this.state.teamsSave[i].Ville){
              cityBool = true;
            }
          }
          if (this.state.priceMax != 0){
            priceMaxBool = false;
            var prices = findPrice(this.state.teamsSave[i].Date, this.state.teamsSave[i].Tarif_creux, this.state.teamsSave[i].Tarif_plein, this.state.teamsSave[i].Creuses_pleines, this.state.teamsSave[i].Dates_speciales);
            prices = prices.split(',');
            var price;
            if (this.state.playerNb == 0){
              price = prices[this.state.teamsSave[i].Nb_joueurs - this.state.teamsSave[i].Nb_places_min + 1];
            } else {
              price = prices[this.state.teamsSave[i].Nb_joueurs - this.state.teamsSave[i].Nb_places_min + this.state.playerNb + 1];
            }
            if (this.state.priceMax > price){
              priceMaxBool = true;
            }
          }
          if (this.state.playerNb != 0){
            playerNbBool = false;
            if (this.state.playerNb <= this.state.teamsSave[i].Nb_places_max - this.state.teamsSave[i].Nb_joueurs){
              playerNbBool = true;
            }
          }
          if (this.state.hourMin != 0){
            hourMinBool = false;
            var date = formatedDate(this.state.teamsSave[i].Date);
            var colonRegex = /:/g;
            var index = colonRegex.exec(date).index;
            var hour = date.substring(index - 2, index);
            if (this.state.hourMin <= hour){
              hourMinBool = true;
            }
          }
          if (this.state.hourMax != 0){
            hourMaxBool = false;
            var date = formatedDate(this.state.teamsSave[i].Date);
            var colonRegex = /:/g;
            var index = colonRegex.exec(date).index;
            var hour = date.substring(index - 2, index);
            if (this.state.hourMax >= hour){
              hourMaxBool = true;
            }
          }
          if (this.state.date != ''){
            dateBool = false;
            var date = this.state.teamsSave[i].Date.split('T')[0];
            var dateRegex = RegExp(date, "g");
            if (dateRegex.exec(this.state.date)){
              dateBool = true;
            }
          }
          if (this.state.theme != ''){
            themeBool = false;
            if (this.state.theme == this.state.teamsSave[i].Theme){
              themeBool = true;
            }
          }
          if (this.state.difficulty != ''){
            difficultyBool = false;
            if (this.state.difficultyBool == this.state.teamsSave[i].Difficulte){
              difficultyBool = true;
            }
          }
          var check = [];
          var valid = true;
          if (cityBool != undefined){ check.push(cityBool); }
          if (priceMaxBool != undefined){ check.push(priceMaxBool); }
          if (playerNbBool != undefined){ check.push(playerNbBool); }
          if (hourMinBool != undefined){ check.push(hourMinBool); }
          if (hourMaxBool != undefined){ check.push(hourMaxBool); }
          if (dateBool != undefined){ check.push(dateBool); }
          if (themeBool != undefined){ check.push(themeBool); }
          if (difficultyBool != undefined){ check.push(difficultyBool); }
          var checkLen = check.length;
          for (var j=0; j<checkLen; j++){
            if (!check[j]){
              valid = false;
            }
          }
          if (valid){ filteredTeams.push(this.state.teamsSave[i]); }
        }
        this.stateUpdate(filteredTeams);
        this.setState({ filter: true });
      } else {
        this.stateUpdate(this.state.teamsSave);
        this.setState({ filter: false });
      }
    }
  }

  onSelectCity(event){
    this.setState({ city: event.target.textContent });
  }

  onSelectDate(event){
    this.setState({ date: event.target.value });
  }

  onSelectPlace(event){
    this.setState({ playerNb: event.target.value });
  }

  onSelectTheme(event){
    this.setState({ theme: event.target.innerText });
  }

  onSelectDifficulty(event){
    this.setState({ difficulty: event.target.textContent });
  }

  onSelectMaxPrice(event){
    this.setState({ priceMax: event.target.value });
  }

  onSelectMinHour(event){
    this.setState({ hourMin: event.target.value });
  }

  onSelectMaxHour(event){
    this.setState({ hourMax: event.target.value });
  }

  componentDidMount() {
    
  }

  stateUpdate(teams){
    if (this.state.teamsSave.length < teams.length){
      this.setState({ teamsSave: teams });
    }
    this.setState({ teams: teams })
  }

  render() {
    if (this.state.teams == ''){
      if (this.props.teams != ''){
        this.stateUpdate(this.props.teams);
      }
      return (
        <FrontPageForm>
        <div>
          <FilterForm>
            <FilterContainer style={{ display: "none" }}>
              <Label for="citySelect">Ville</Label>
              <Select id="citySelect" onChange={(event) => this.onSelectCity(event)} options={cityArray}/>
            </FilterContainer>

            <FilterContainer>
              <Label for="dateInput">Date</Label>
              <Input id="dateInput" type="date" onChange={(event) => this.onSelectDate(event)} />
            </FilterContainer>

            <FilterContainer>
              <Label for="playerNbInput">Nombre de place voulues</Label>
              <Input id="playerNbInput" type="number" min="1" onChange={(event) => this.onSelectPlace(event)} />
            </FilterContainer>

            <FilterContainer>
              <Label for="themeSelect">Theme</Label>
              <Select id="themeSelect" onChange={(event) => this.onSelectTheme(event) } options={themeArray}/>
            </FilterContainer>

            <FilterContainer>
              <Label for="difficultySelect">Difficulté</Label>
              <Select id="difficultySelect" onChange={(event) => this.onSelectDifficulty(event)} options={difficultyArray}/>
            </FilterContainer>

            <FilterContainer>
              <Label for="priceMaxInput">Prix maximum</Label>
              <Input id="priceMaxInput" type="number" onChange={(event) => this.onSelectMaxPrice(event)}/>
            </FilterContainer>

            <FilterContainer>
              <Label for="hourMinInput">Heure minimum</Label>
              <Input id="hourMinInput" type="number" onChange={(event) => this.onSelectMinHour(event)}/>
            </FilterContainer>

            <FilterContainer>
              <Label for="hourMaxInput">Heure maximum</Label>
              <Input id="hourMaxInput" type="number" onChange={(event) => this.onSelectMaxHour(event)}/>
            </FilterContainer>

            <FilterContainer>
              <Button onClick={this.submitFilters} content="Filtrer" type="button" disable/>
            </FilterContainer>
          </FilterForm>
        </div>
        <div>
          <h1 style={{ marginLeft: '15px' }}>Aucune équipe </h1>
        </div>
        </FrontPageForm>
      );
    } else {
      return(
      <FrontPageForm>
        <div>
          <FilterForm>
            <FilterContainer style={{ display: "none" }}>
              <Label for="citySelect">Ville</Label>
              <Select id="citySelect" onChange={(event) => this.onSelectCity(event)} options={cityArray}/>
            </FilterContainer>

            <FilterContainer>
              <Label for="dateInput">Date</Label>
              <Input id="dateInput" type="date" onChange={(event) => this.onSelectDate(event)} />
            </FilterContainer>

            <FilterContainer>
              <Label for="playerNbInput">Nombre de place voulues</Label>
              <Input id="playerNbInput" type="number" min="1" onChange={(event) => this.onSelectPlace(event)} />
            </FilterContainer>

            <FilterContainer>
              <Label for="themeSelect">Theme</Label>
              <Select id="themeSelect" onChange={(event) => this.onSelectTheme(event) } options={themeArray}/>
            </FilterContainer>

            <FilterContainer>
              <Label for="difficultySelect">Difficulté</Label>
              <Select id="difficultySelect" onChange={(event) => this.onSelectDifficulty(event)} options={difficultyArray}/>
            </FilterContainer>

            <FilterContainer>
              <Label for="priceMaxInput">Prix maximum</Label>
              <Input id="priceMaxInput" type="number" onChange={(event) => this.onSelectMaxPrice(event)}/>
            </FilterContainer>

            <FilterContainer>
              <Label for="hourMinInput">Heure minimum</Label>
              <Input id="hourMinInput" type="number" onChange={(event) => this.onSelectMinHour(event)}/>
            </FilterContainer>

            <FilterContainer>
              <Label for="hourMaxInput">Heure maximum</Label>
              <Input id="hourMaxInput" type="number" onChange={(event) => this.onSelectMaxHour(event)}/>
            </FilterContainer>

            <FilterContainer>
              <Button onClick={this.submitFilters} content="Filtrer" type="button"/>
            </FilterContainer>
          </FilterForm>
        </div>
        <div>
          <List divided relaxed>
            {this.state.teams.map(team =>
              <TeamItem
                key={team.objectID}
                team={team}
                playerNb={this.state.playerNb}
                filter={this.state.filter}
              >
                <TeamHeader team={team} />
              </TeamItem>
            )}
          </List>
        </div>
      </FrontPageForm>
      );
    }
  }

}

const FilterContainer = styled.form`
  display: flex;
  flex-direction: column;
  margin: 10px;

  .ui {
    margin-bottom: 10px;
  }
`;

const TeamHeader = ({ team }) =>
  <span>
    <p>{team.nom}</p>
  </span>

export default FrontPageView;