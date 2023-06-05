// import React, { Component } from 'react';
// import loading from './loading.gif';

// export default class Spinner extends Component {
//   render() {
//     return (
//       <div className='text-center'>
//         <img className='my-3' src={loading} alt='Loading'/>
//       </div>
//     )
//   }
// }


import React  from 'react';
import loading from './loading.gif';

const Spinner = () => {

    return (
        <div className='text-center'>
            <img className='my-3' src={loading} alt='Loading' />
        </div>
    )
}

export default Spinner;