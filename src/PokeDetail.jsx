import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { getPoke } from './call';
import { ButtonCustom } from './components/button-custom/ButtonCustom';
import './PokeDetail.css';

const PokeDetail = () => {
  const location = useLocation();
  const { name, img } = location.state;
  const [data, setData] = useState({});
  const navigate = useNavigate();

  let id = location.pathname.split('/pokemon/')[1];

  useEffect(() => {
    getPoke(`https://pokeapi.co/api/v2/move/${id}`).then(res => {
      setData(res);
    }).catch(alert);
  }, [id]);


  return (
    <div className='container-detail'>
      <div className='container-detail-item'>
        <h2>{name}</h2>
        <img src={img} alt="imgPoke" />
        {data.accuracy && data.power && data.pp ?
          <div className="details">
            <div className='container-detail-poke'>
              <p>Precision</p>
              <span className='badge bg-accuracy'>{data.accuracy}</span>
            </div>
            <div className='container-detail-poke'>
              <p>Puntos de poder</p>
              <span className='badge bg-pp'>{data.pp}</span>
            </div>
            <div className='container-detail-poke'>
              <p>Poder</p>
              <span className='badge bg-power'>{data.power}</span>
            </div>
            
          </div>
        : <p>Cargando...</p>}
        <div style={{marginTop: '2rem'}}>
          <ButtonCustom type='button' onClick={() => navigate(-1)}>Volver</ButtonCustom>
        </div>
      </div>
    </div>
  )
}

export default PokeDetail;
