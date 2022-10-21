import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
import IconPoke from './assets/icons/pokebola.png';
import { getPoke } from './call';
import { ButtonCustom } from './components/button-custom/ButtonCustom';
import { CardPokemon } from './components/card-pokemon/CardPokemon';

const App = () => {
  const [data, setData] = useState([]);
  const [list, setList] = useState([]);
  const [fieldFilter, setFieldFilter] = useState('');
  const [next, setNext] = useState();
  const navigate = useNavigate();
  const [loading, setLoading] = useState();

  const [urlNext, setUrlNext] = useState();

  useEffect(() => {
    setLoading(true);
    getPoke("https://pokeapi.co/api/v2/pokemon/").then(data => {
      setLoading(false);
      if (data.results) {
        setUrlNext(data.next);
        setData(data.results);
        setList(data.results);
      }
    }).catch(alert);
  }, []);

  useEffect(() => {
    if (next) {
      setNext(false);
      setList(data);
      setFieldFilter('');
    }
  }, [next, data])

  const onLoadMore = useCallback((e) => {
    e.preventDefault();
    setLoading(true);
    getPoke(urlNext).then(data => {
      setLoading(false);
      setNext(true);
      if (data.results && data.results.length > 0) {
        setUrlNext(data.next);
        setData(current => {
          return [...current, ...data.results];
        });
      }
    }).catch(setError);
  }, [urlNext]);

  const onSearch = useCallback((e) => {
    let value = e.target.value;
    setFieldFilter(value);
    let copyData = data.filter(d => {
      if (d.name.includes(value)) return d;
    });
    setList(copyData);
  }, [data]);

  const onOpenDetail = useCallback((id, name, img) => {
    navigate(`/pokemon/${id}`, { state: { name, img } });
  }, []);

  return (
    <div className='container-app'>
      <div className="title-app">
        <img className='icon-poke-title' src={IconPoke} alt="pokebola" />
        <h2>
          POKE APP
        </h2>
      </div>
      <div className="header-container">
        <div className="filter-container">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input value={fieldFilter} type="text" onChange={onSearch} />
        </div>
        <ButtonCustom disabled={loading} type="button" onClick={onLoadMore}>
          {loading ? 'Cargando' : 'Cargar Mas'}
        </ButtonCustom>

      </div>
      <div className="container-list">
        <div className='list-pokemons'>
          {list && list.map((pokemon, index) => (
            <CardPokemon key={index} pokemon={pokemon} onOpenDetail={onOpenDetail} />
          ))}
        </div>
      </div>

    </div>
  );
}

export default App;
