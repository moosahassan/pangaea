import React from 'react';
import './NavigationLink.scss'

const NavigationLink = ({ name, url }) => <li className={'comp-navigation-link'}><a  className={'anchor-tag'} href={url}>{name}</a></li>

export default NavigationLink;
