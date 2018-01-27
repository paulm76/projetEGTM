import React, { Component } from 'react';
import { Loader, List, Input, Button, Select, Label } from 'semantic-ui-react';
import styled from 'styled-components';

import TeamItem from '../TeamItem';
import EscapeGameList from '../EscapeGameList';
import FilterForm from '../FilterForm';
import cityArray from '../../constants/cityArray'
import themeArray from '../../constants/themeArray';
import difficultyArray from '../../constants/difficultyArray';
import TeamsList from '../TeamList';
import Filter from '../Filter';
import FrontPageForm from '../FrontPageForm';

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
      error: '',
    };

    this.onFilterUpdate = this.onFilterUpdate.bind(this);
    this.onTeamUpdate = this.onTeamUpdate.bind(this);
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
    this.onTeamInfoUpdate = this.onTeamInfoUpdate.bind(this);
  }

  submitFilters(){
    if (this.state.teams != []){
      var filteredTeams = [];
      console.log(this.state.teams);
      if (this.state.city != ''){

      }
      if (this.state.priceMax != 0){

      }
      if (this.state.playerNb != 0){

      }
      if (this.state.hourMin != 0){

      }
      if (this.state.hourMax != 0){

      }
      if (this.state.date != ''){

      }
      if (this.state.theme != ''){

      }
      if (this.state.difficulty != ''){

      }
    }
  this.onTeamInfoUpdate()
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

  onTeamInfoUpdate(){
    this.props.onFilterUpdate(this.state.teams);
  }

  componentDidMount() {
    
  }

  onFilterUpdate(event){
    this.setState({ teams: event });
  }

  onTeamUpdate(event){
    this.setState({ teams: event });
  }

  stateUpdate(teams){
    this.setState({ teams: teams })
  }

  render() {
    if (this.state.teams == ''){
      if (this.props.teams != ''){
        this.stateUpdate(this.props.teams);
      }
      return (<p></p>);
    } else {
      console.log("toto");
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

export default FrontPageView;
