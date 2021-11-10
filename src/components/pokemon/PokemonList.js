import React, { Component } from 'react';

import PokemonCard from './PokemonCard';
import Loading from '../layout/Loading';
import axios from 'axios';

export default class PokemonList extends Component {
  state = {
    url: 'https://pokeapi.co/api/v2/pokemon/',
    pokemon: null
  };

  async componentDidMount() {
    const res = await axios.get(this.state.url);
    this.setState({ pokemon: res.data['results'] });
  }

  render() {
    return (
      
        
      <div>
        <h1 className="choose text-center">Pokemon List</h1>
        {this.state.pokemon ? (
          <div className="row">
            {this.state.pokemon.map(pokemon => (
              <PokemonCard
                //untuk mengambil data nama dan gambar dari API
                //var key untuk variable unik. setiap pokemon mempunyainama unik
                key={pokemon.name}
                name={pokemon.name}
                url={pokemon.url}
              />
            ))}
          </div>
        ) : (
          <Loading />
        )}
      </div>
    );
  }
}
