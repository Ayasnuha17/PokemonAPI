import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import styled from 'styled-components';

import spinner from '../layout/Settings.gif';

// style bentuk kotak, display none agar tidak terlihat saal loading
const Sprite = styled.img`
  width: 5em;
  height: 5em;
  display: none;
`;

// styling card
const Card = styled.div`
  opacity: 0.95;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  &:hover {
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  }
  -moz-user-select: none;
  -website-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -o-user-select: none;
`;

// styling link
const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;

  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`;

export default class PokemonCard extends Component {
   //inisialisasi untuk ambil data pokemon API
  state = {
    name: '',
    imageUrl: '',
    pokemonIndex: '',
    imageLoading: true,
    toManyRequests: false
  };

  componentDidMount() {
    const { name, url } = this.props;

    const pokemonIndex = url.split('/')[url.split('/').length - 2];
    //const imageUrl = `./sprites/pokemon/${pokemonIndex}.png`;
    const imageUrl = `https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/${pokemonIndex}.png?raw=true`;
    // mengambil nama,imageurl, dan pokemonindex dari atas
    this.setState({ name, imageUrl, pokemonIndex });
  }

  render() {
    return (
      <div className="col-md-3 col-sm-6 mb-5">
         {/* Link untuk menuju ke halaman detai dengan mengambil pokemon Index */}
        <StyledLink to={`pokemon/${this.state.pokemonIndex}`}>
          <Card className="card">
            {/* ambil berdasarkan index pokemon */}
            <h5 className="card-header text-center">{this.state.pokemonIndex}</h5>
            {/* agar ketika toManyRequests kondisinya true terdapat gambar spinnger */}
            {this.state.imageLoading ? (
              <img
                src={spinner}
                style={{ width: '5em', height: '5em' }}
                className="card-img-top rounded mx-auto d-block mt-2"
              />
            ) : null}
            <Sprite
              className="card-img-top rounded mx-auto mt-2"
              src={this.state.imageUrl}
              onLoad={() => this.setState({ imageLoading: false })}
               //ketika request banyak data
              onError={() => this.setState({ toManyRequests: true })} //ketika kondisi true akan mengaktifkan class card-title, tetapi akan ada bentuk box tanpa gambar (bisa di tambahkan gambar spin) spt di bawah card-header
              style={
                // display none agar tidak terlihat saal loading
                this.state.toManyRequests
                  ? { display: 'none' }
                  : this.state.imageLoading
                  ? null
                  : { display: 'block' }
                  // display none agar tidak terlihat saal loading
              }
            />
             {/* jika data yang diload banyak akan muncul tulisan dibawah tempat gambar 'to many request' dengan warna merah. Tetapi karena ini hanya menampilkan 20 gambar sehingga ketika loading bisa cepat (karena sedikit datanya)  */}
            {this.state.toManyRequests ? (
              <h6 className="mx-auto">
                <span className="badge badge-danger mt-2">
                  To Many Requests
                </span>
              </h6>
            ) : null}
            {/* nama pokemon */}
            <div className="card-body mx-auto">
              <h6 className="card-title">
                {this.state.name
                  .toLowerCase()
                  .split(' ')
                  .map(s => s.charAt(0).toUpperCase() + s.substring(1))
                  .join(' ')}
              </h6>
            </div>
          </Card>
        </StyledLink>
      </div>
    );
  }
}
