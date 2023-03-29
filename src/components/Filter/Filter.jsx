import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from 'redux/filterSlice';
import { getFilter } from 'redux/selectors';

import { Label, Input } from './Filter.styled';

const Filter = () => {
  const value = useSelector(getFilter);
  const dispatch = useDispatch();
  const filterChange = ({ currentTarget }) => {
    dispatch(setFilter(currentTarget.value));
  };

  return (
  <Label htmlFor="">
    Find contacts by Name:
    <Input type="text" value={value} onChange={filterChange}></Input>
  </Label>
)};

export default Filter;