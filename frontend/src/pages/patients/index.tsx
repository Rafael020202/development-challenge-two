import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead,
  TableRow,
  Paper,
  Button,
  Box
} from '@material-ui/core';
import { Delete } from '@material-ui/icons';

import api from '../../services/api';
import { Container } from './styles'

interface patient {
  patientid: string;
  name: string;
  phone: string;
  address: string;
  disease: string;
  arrival_date: string; 
  departure_date: string;
}

interface APIResponse {
  patients: patient[]
}

const Patients: React.FC = () => {
  const [patients, setPatient] = useState<patient[]>([]);
  const history = useHistory();

  useEffect(() => {
    api.get('/patients').then(response => {
      const data = (response.data as APIResponse).patients;
      setPatient(data);
    });
  }, []);

  const handleDelete = useCallback((patientId) => {
    api.delete(`/patient?patientId=${patientId}`).then(() => {
      window.location.reload();
    });
  }, []);

  return(
      <>
      <Container>
      <Box mb={5}>
        <Button variant="outlined" onClick={() => history.push('/patient')}>
          ADICIONAR
        </Button>
      </Box>

      <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell align="right"><strong>Código</strong></TableCell>
            <TableCell align="right"><strong>Nome</strong></TableCell>
            <TableCell align="right"><strong>Telefone</strong></TableCell>
            <TableCell align="right"><strong>Endereço</strong></TableCell>
            <TableCell align="right"><strong>Data de Chegada</strong></TableCell>
            <TableCell align="right"><strong>Data de Saída</strong></TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {patients.map(patient => (
            <TableRow key={patient.patientid}>
              <TableCell align="right">{patient.patientid}</TableCell>
              <TableCell align="right">{patient.name}</TableCell>
              <TableCell align="right">{patient.phone}</TableCell>
              <TableCell align="right">{patient.address}</TableCell>
              <TableCell align="right">{(new Date(patient.arrival_date)).toLocaleString()}</TableCell>
              <TableCell align="right">{(new Date(patient.departure_date)).toLocaleString()}</TableCell>
              <TableCell><Delete 
                            onClick={() => handleDelete(patient.patientid)} 
                            style={{color: '#CE0A31'}}/>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Container>
    </>
  );
}

export default Patients;