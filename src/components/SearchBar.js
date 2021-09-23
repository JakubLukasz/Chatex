import React, { useRef } from 'react';
import styled from 'styled-components';
import Icon from './Icon';
import SearchIcon from '../assets/images/searchIcon.svg';
import PropTypes from 'prop-types';

const Form = styled.form`
  display: flex;
  align-items: center;
  background-color: #ffffff;
  margin: 20px 0 0;
  padding: 0 10px;
  border-radius: 7px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
`;

const Input = styled.input`
  font-size: 1.3rem;
  flex: 1;
  padding: 10px 0;
  border: none;
  outline: none;
  font-weight: ${({ theme }) => theme.font.weight.medium};
`;

const Search = styled(Icon)`
  width: 1.5rem;
  height: auto;
  margin: 0 10px 0 5px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SearchBar = ({ setSearchPhrase }) => {
  const inputRef = useRef();

  const handleChange = () => {
    setSearchPhrase(inputRef.current.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchPhrase(inputRef.current.value);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Search src={SearchIcon} />
      <Input
        ref={inputRef}
        onChange={handleChange}
        placeholder="Search"
        type="text"
      />
    </Form>
  );
};

SearchBar.propTypes = {
  setSearchPhrase: PropTypes.func,
};

export default SearchBar;
