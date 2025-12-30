import React from 'react'
import Header from './components/Header'
import Main from './components/Main'

const App = () => {
  return (
    <React.Fragment>
      <div className='container mx-auto max-w-5xl'>
        <Header />
        <Main />
      </div>
    </React.Fragment>
  )
}

export default App