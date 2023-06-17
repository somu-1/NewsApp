import React, { useState } from 'react'
import Navbar from './components/Navbar'
import News from './components/News'
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'



const App=()=> {
  const pageSize = 5;
  const [progress, setProgress] = useState(0)

    return (
      <div>
          <LoadingBar
          height={3}
            color='red'
            progress={progress}
            // onLoaderFinished={() => setProgress(100)}
          />
        <Router>
          <Navbar />
          <Routes>
            <Route exact path='/' element={<News setProgress={setProgress} key='home' pagesize={pageSize} country='in' category='general' />} />
            <Route exact path='/business' element={<News setProgress={setProgress} key='business' pagesize={pageSize} country='in' category='business' />} />
            <Route exact path='/entertainment' element={<News setProgress={setProgress} key='entertainment' pagesize={pageSize} country='in' category='entertainment' />} />
            <Route exact path='/general' element={<News setProgress={setProgress} key='general' pagesize={pageSize} country='in' category='general' />} />
            <Route exact path='/health' element={<News setProgress={setProgress} key='health' pagesize={pageSize} country='in' category='health' />} />
            <Route exact path='/science' element={<News setProgress={setProgress} key='science' pagesize={pageSize} country='in' category='science' />} />
            <Route exact path='/sports' element={<News setProgress={setProgress} key='sports' pagesize={pageSize} country='in' category='sports' />} />
            <Route exact path='/technology' element={<News setProgress={setProgress} key='technology' pagesize={pageSize} country='in' category='technology' />} />

          </Routes>
        </Router>
      </div>
    )
  }

  export default App
