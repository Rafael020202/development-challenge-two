import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  
  background-color: white;
  border-radius: 10px;
`;

export const Card = styled.div`
  width: 100%;
  max-width: 500px;
  border-radius: 10px;
  background-color: white;
  box-shadow: 1px 1px 4px 3px rgba(0,0,0,0.1);

  padding: 15px;

  form {
    width: 100%;
  
  }
`;