import React, { FormEvent, useCallback, useState } from 'react';
import {v4} from 'uuid';
import { useHistory } from 'react-router-dom';
import { Button, FormControl, Input, InputLabel, OutlinedInput } from '@material-ui/core';

import api from '../../services/api';
import { Container, Card } from './styles';

interface patient {
  [patientid: string]: string;
  name: string;
  phone: string;
  address: string;
  disease: string;
  arrival_date: string; 
  departure_date: string;
}


const Patient: React.FC = () => {
  const getCurrentDateTime = () => {
    const date = new Date(Date.now());

    return `${date.getFullYear()}-${date.getMonth() >= 10 ? (date.getMonth() + 1) :('0'.concat((date.getMonth() + 1).toString()))}-${date.getDate() >= 10 ?(date.getDate()) :('0'.concat(date.getDate().toString()))}T${date.getHours()}:${date.getMinutes()}`;
  }
console.log(getCurrentDateTime());
  const [patientData, setPatientData] = useState<patient>({
    name: '',
    phone: '',
    address: '',
    disease: '',
    arrival_date: getCurrentDateTime(), 
    departure_date: getCurrentDateTime()
  });

  const history = useHistory();

  const handleChange = useCallback((e) => {
    const key = e.target.name;
    const value = e.target.value;
    const newPatientData = patientData;

    newPatientData[key] = value;

    setPatientData({...newPatientData});
  }, [patientData]);

  const handleSave = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    api.post('/patient', {patientid: v4(), ...patientData}).then(() => {
      history.push('/')
    }).catch(err => {
      console.log(err)
    });
  }, [patientData]);

  return (
    <Container>
      <Card>
      <form onSubmit={handleSave}>
        <div>
          <FormControl fullWidth style={{ marginBottom: '15px'}}>
            <InputLabel>Nome</InputLabel>
            <Input 
              value={patientData.name}
              name='name'
              required
              onChange={e => handleChange(e)}
            />
          </FormControl>
        </div>

        <div>
          <FormControl fullWidth style={{ marginBottom: '15px'}}>
            <InputLabel>Telefone</InputLabel>
            <Input 
              value={patientData.phone}
              name='phone'
              required
              onChange={e => handleChange(e)}
            />
          </FormControl>
        </div>

        <div>
          <FormControl fullWidth style={{marginBottom: '15px'}}>
            <InputLabel>Endereço</InputLabel>
            <Input 
              value={patientData.address}
              name='address'
              required
              onChange={e => handleChange(e)}
            />
          </FormControl>
        </div>
        
        <div>
          <FormControl fullWidth style={{marginBottom: '15px'}}>
            <InputLabel>Doença</InputLabel>
            <Input 
              value={patientData.disease}
              name='disease'
              required
              onChange={e => handleChange(e)}
            />
          </FormControl>
        </div>

        <div>
          <FormControl variant="outlined" fullWidth style={{marginBottom: '15px'}}>
            <InputLabel>Data de Chegada</InputLabel>
            <OutlinedInput
              type='datetime-local'         
              labelWidth={120}
              value={patientData.arrival_date}
              name='arrival_date'
              onChange={e => handleChange(e)}
            />
          </FormControl>
        </div>
        
        <div>
          <FormControl variant="outlined" fullWidth style={{marginBottom: '15px'}}>
            <InputLabel>Data de Chegada</InputLabel>
            <OutlinedInput
            defaultValue=''
              name='departure_date'
              onChange={e => handleChange(e)}
              type='datetime-local'  
              labelWidth={120}
              value={patientData.departure_date}
            />
          </FormControl>
        </div>

        <div>
          <Button color='primary' type='submit'>Salvar</Button>
          <Button color='primary' onClick={() => history.push('/')}>Fechar</Button>
        </div>
    </form>
      </Card>
    </Container>
  );
}

export default Patient;