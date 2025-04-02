import { Navigate, Route, Routes } from 'react-router-dom';
import Search from './Search';
import Queue from './Queue';

const Display = () => {
  return (
    <>
    <Routes>
        <Route path='/' element={<Search />} />
        <Route path='/queue' element={<Queue />} />
        <Route path='*' element={<Navigate to='/' />} />
    </Routes>
    </>
  )
}

export default Display
