import React, { Component } from 'react';
import {  Link,  withRouter } from 'react-router-dom';
import { Input, Button, Select, Label } from 'semantic-ui-react';
import styled from 'styled-components';

import EscapeGameList from '../EscapeGameList';
import FilterForm from '../FilterForm';
import cityArray from '../../constants/cityArray'
import themeArray from '../../constants/themeArray';
import difficultyArray from '../../constants/difficultyArray';

const Filter = ({
  escapeGame,
  room,
  prix,
  city,
  priceMin,
  priceMax,
  playerNb,
  hourMin,
  hourMax,
  date,
  theme,
  difficulty,
  error,
}) => 

	<FilterForm>
	  <FilterContainer>
		<Label for="citySelect">Ville</Label>
		<Select id="citySelect" onChange={this.onSelectCity} options={cityArray}/>
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
	  	<Label for="playerNbInput">Nombre de place voulues</Label>
	  	<Input id="playerNbInput" type="number" min="1" />
	  </FilterContainer>

	  <FilterContainer>
	  	<Label for="hourMinInput">Heure minimum</Label>
	  	<Input id="hourMinInput" type="number" />
	  </FilterContainer>

	  <FilterContainer>
	  	<Label for="hourMaxInput">Heure maximum</Label>
	  	<Input id="hourMaxInput" type="number" />
	  </FilterContainer>

	  <FilterContainer>
	  	<Label for="dateInput">Date</Label>
	  	<Input id="dateInput" type="date" />
	  </FilterContainer>

	</FilterForm>
	
const FilterContainer = styled.form`
  display: flex;
  flex-direction: column;
  margin: 20px;

  .ui {
    margin-bottom: 10px;
  }
`;

export default Filter
