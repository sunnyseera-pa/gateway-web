import React from 'react';
import ReactDOM from 'react-dom';
import {SearchBar} from './searchBar';
import {ResultsProject} from './resultsProject';
import {ResultsTool} from './resultsTool';
import {ResultsPerson} from './resultsPerson';

class Search extends React.Component{
    render(){
        return(
            <div>
                <style>{'body {background-color: #eeeeee;}'}</style>
                <SearchBar />
                <ResultsProject />
                <ResultsTool />
                <ResultsPerson />
            </div>
        );
    }
}

export {Search};