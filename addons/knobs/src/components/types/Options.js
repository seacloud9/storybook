import React from 'react';
import PropTypes from 'prop-types';

import { OptionsSelect } from '@storybook/components';

import RadiosType from './Radio';
import SelectType from './Select';
import BooleanType from './Boolean';

const OptionsType = props => {
  // console.log(props);
  const { knob, onChange } = props;
  const { display } = knob.optionsObj;

  if (display === 'radio') {
    return <RadiosType {...props} />;
  }
  if (display === 'inline-radio') {
    return <RadiosType {...props} inline />;
  }
  if (display === 'check') {
    return <BooleanType name={knob.name} value={knob.value} />;
  }
  if (display === 'select' || display === 'multi-select') {
    const options = Object.keys(knob.options).map(key => ({
      value: knob.options[key],
      label: key,
    }));

    const isMulti = display === 'multi-select';
    let handleChange = e => onChange(e.value);

    if (display === 'multi-select') {
      handleChange = values => onChange(values.map(item => item.value));
    }

    return <OptionsSelect options={options} isMulti={isMulti} onChange={handleChange} />;
  }

  return <SelectType {...props} />;
};

OptionsType.defaultProps = {
  knob: {},
  onChange: value => value,
};

OptionsType.propTypes = {
  knob: PropTypes.shape({
    name: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
    options: PropTypes.object,
  }),
  onChange: PropTypes.func,
};

OptionsType.serialize = value => value;
OptionsType.deserialize = value => value;

export default OptionsType;
