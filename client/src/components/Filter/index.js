import React, { Component } from 'react';
import {  Link,  withRouter } from 'react-router-dom';
import { Input, Button, Select, Label } from 'semantic-ui-react';
import styled from 'styled-components';

import EscapeGameList from '../EscapeGameList';
import FilterForm from '../FilterForm';
import cityArray from '../../constants/cityArray'
import themeArray from '../../constants/themeArray';
import difficultyArray from '../../constants/difficultyArray';

const FilterContainer = styled.form`
  display: flex;
  flex-direction: column;
  margin: 10px;

  .ui {
    margin-bottom: 10px;
  }
`;

class Filter extends Component {
  constructor(props) {
    super(props);

    this.state = {
	  escapeGame: '',
	  room: '',
	  prix: 0,
	  city: '',
	  priceMin: 0,
	  priceMax: 0,
	  playerNb: 0,
	  hourMin: 0,
	  hourMax: 0,
	  date: '',
	  theme: '',
	  difficulty: '',
	  error: '',
    };

    this.submitFilters = this.submitFilters.bind(this);
    this.onSelectCity = this.onSelectCity.bind(this);
  }

  submitFilters(){
	var headers = new Headers();
	var init = { method: 'GET', header: 'headers', mode: 'cors', cache: 'default' };
	fetch('http://localhost:3001/filter?city=' + this.state.city, init).then(res => res.json()).then(teamInfo => this.setState({ teamInfo: teamInfo, }));
  }

  onSelectCity(event){
  	this.setState({ city: event.target.textContent });
  }

  componentWillMount() {
  	console.log(this.state.city);
  }

  render() {
		return (
	      <FilterForm>
			  <FilterContainer style={{ display: "bloc" }}>
				<Label for="citySelect">Ville</Label>
				<Select id="citySelect" onChange={(event) => this.onSelectCity(event)} options={cityArray}/>
			  </FilterContainer>

			  <FilterContainer>
				<Label for="dateInput">Date</Label>
				<Input id="dateInput" type="date" />
			  </FilterContainer>

			  <FilterContainer>
				<Label for="playerNbInput">Nombre de place voulues</Label>
				<Input id="playerNbInput" type="number" min="1" />
			  </FilterContainer>

			  <FilterContainer>
				<Label for="themeSelect">Theme</Label>
				<Select id="themeSelect" onChange={this.onSelectTheme} options={themeArray}/>
			  </FilterContainer>

			  <FilterContainer>
				<Label for="difficultySelect">Difficulté</Label>
				<Select id="difficultySelect" onChange={this.onSelectDifficulty} options={difficultyArray}/>
			  </FilterContainer>

			  <FilterContainer>
				<Label for="priceMinInput">Prix minimum</Label>
				<Input id="priceMinInput" type="number" min="0" />
			  </FilterContainer>

			  <FilterContainer>
				<Label for="priceMaxInput">Prix maximum</Label>
				<Input id="priceMaxInput" type="number" />
			  </FilterContainer>

			  <FilterContainer>
				<Label for="hourMinInput">Heure minimum</Label>
				<Input id="hourMinInput" type="number" />
			  </FilterContainer>

			  <FilterContainer>
				<Label for="hourMaxInput">Heure maximum</Label>
				<Input id="hourMaxInput" type="number" />
			  </FilterContainer>

			  <Button onclick={this.submitFilters} />

		  </FilterForm>
    );
  }
}


export default Filter
