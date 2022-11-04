import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';

const Header = ({title , onAdd , showAdd}) => {
  return (
    <header className='header'>
        <h1>{title}</h1>
        <Button color={showAdd ? 'red' : 'green' } text={showAdd ? 'Close' : 'Add'} onClick={onAdd}/>
    </header>
  )
}
Header.defaultProps ={
  title: 'Task Tracker'
}
Header.propTypes ={
title :PropTypes.string.isRequired,
}


//use inline css
//<h1 style={StyleCss}>{props.title}</h1>
// const StyleCss ={
//   color:'red',
//   background:'black'
// }


export default Header