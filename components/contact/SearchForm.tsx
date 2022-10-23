import { ChangeEvent, Dispatch, FormEvent, SetStateAction, useRef, useState } from 'react';
import styled from '@emotion/styled';

import { colors } from '@/styles/colors';
import DeleteAllIcon from '@/assets/svg/delete-all.svg';
import SearchIcon from '@/assets/svg/search.svg';

interface Props {
  setQuery: Dispatch<SetStateAction<string>>;
}

const ContactSearch = ({ setQuery }: Props) => {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [searchValue, setSearchValue] = useState('');

  const handleSubmitSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!searchValue) return;
    const filteredSearchValue = searchValue.trim();
    if (!filteredSearchValue) return;
    setQuery(filteredSearchValue);
  };

  const handleClickDeleteAll = () => {
    setSearchValue('');
    if (!searchInputRef.current) return;
    searchInputRef.current.focus();
  };

  const handleChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.currentTarget.value);
  };

  return (
    <SearchForm onSubmit={handleSubmitSearch}>
      <SearchInputBox>
        <input
          type="text"
          value={searchValue}
          ref={searchInputRef}
          placeholder="이름을 입력해주세요"
          onChange={handleChangeSearch}
        />
        <DeleteAllButton type="button" onClick={handleClickDeleteAll}>
          <DeleteAllIcon />
        </DeleteAllButton>
      </SearchInputBox>
      <SearchButton type="submit">
        <SearchIcon />
      </SearchButton>
    </SearchForm>
  );
};

const SearchForm = styled.form`
  display: flex;
  justify-content: center;
`;

const SearchInputBox = styled.div`
  position: relative;

  input {
    padding: 10px 40px 10px 20px;
    font-size: 16px;
    line-height: 16px;
    width: 100%;
    height: 40px;
    border-radius: 10px 0 0 10px;
    color: ${colors.TEXT_39};
    background-color: ${colors.LIGHT_BROWN};
  }
`;

const DeleteAllButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  width: 40px;
  height: 40px;
  background-color: ${colors.LIGHT_BROWN};
  cursor: pointer;

  svg {
    width: 14px;
    height: 14px;
    fill: ${colors.TEXT_39};
  }
`;

const SearchButton = styled.button`
  width: 50px;
  height: 40px;
  border-radius: 0 10px 10px 0;
  background-color: ${colors.DARK_BROWN};
  cursor: pointer;

  svg {
    width: 22px;
    height: 22px;
    fill: ${colors.TEXT_39};
  }
`;

export default ContactSearch;
