/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { ChangeEvent, Dispatch, FormEvent, SetStateAction, useRef, useState } from 'react';

import DeleteAllIcon from '@/assets/svg/delete-all.svg';
import SearchIcon from '@/assets/svg/search.svg';
import { colors } from '@/styles/colors';

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
    <form css={searchForm} onSubmit={handleSubmitSearch}>
      <div css={searchInputBox}>
        <input
          type="text"
          value={searchValue}
          ref={searchInputRef}
          placeholder="이름을 입력해주세요"
          onChange={handleChangeSearch}
        />
        <button type="button" css={deleteAllButton} onClick={handleClickDeleteAll}>
          <DeleteAllIcon />
        </button>
      </div>
      <button type="submit" css={searchButton}>
        <SearchIcon />
      </button>
    </form>
  );
};

const searchForm = css`
  display: flex;
`;

const searchInputBox = css`
  position: relative;

  input {
    padding: 10px 40px 10px 20px;
    font-size: 16px;
    line-height: 16px;
    width: 260px;
    height: 40px;
    border-radius: 10px 0 0 10px;
    background-color: ${colors.LIGHT_BROWN};
  }
`;

const deleteAllButton = css`
  position: absolute;
  top: 0;
  right: 0;
  width: 40px;
  height: 40px;
  background-color: ${colors.LIGHT_BROWN};
  cursor: pointer;

  svg {
    width: 16px;
    height: 16px;
    fill: ${colors.TEXT_39};
  }
`;

const searchButton = css`
  width: 70px;
  height: 40px;
  border-radius: 0 10px 10px 0;
  background-color: ${colors.DARK_BROWN};
  cursor: pointer;

  svg {
    width: 26px;
    height: 26px;
    fill: ${colors.TEXT_39};
  }
`;

export default ContactSearch;
