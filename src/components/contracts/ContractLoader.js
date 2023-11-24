//React
import React, { Component } from 'react';

// Spinning
import LoaderLittle from '../loader/LoaderLittle'

class ContractLoader extends Component {

    constructor(props) {
        super(props);
    }

    //--------------------------------------------------------------------------------------------

    returnProps(){
    }

    render() {
       return(
         <div>
            <LoaderLittle colorDark={this.props.colorDark} />
         </div>
       )
    }
}

export default ContractLoader;
