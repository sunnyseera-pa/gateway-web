import React from 'react';
import ReactDOM from 'react-dom';
import {SearchBar} from './components/searchBar';
import {ResultsProject} from './components/resultsProject';
import {ResultsTool} from './components/resultsTool';
import {ResultsPerson} from './components/resultsPerson';

class SearchPage extends React.Component{
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

export default SearchPage;