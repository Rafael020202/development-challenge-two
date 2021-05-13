import React from 'react';

import { Header as HeaderStyled } from './styles';
import imgUrl from '../../assets/images/medical-file.svg';

const Header: React.FC = () => {
  return(
    <HeaderStyled>
      <img src={imgUrl} width={40} alt="app logo"/>
      <span>
        Patients Control
      </span>
    </HeaderStyled>
  );
}

export default Header;