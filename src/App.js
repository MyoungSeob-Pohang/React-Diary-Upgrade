import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import New from './pages/New';
import Edit from './pages/Edit';
import Diary from './pages/Diary';
import MyButton from './components/MyButton';
import MyHeader from './components/MyHeader';
function App() {
    const env = process.env;
    env.PUBLIC_URL = env.PUBLIC_URL || '';

    return (
        <BrowserRouter>
            <div className="App">
                <MyHeader
                    headText={'App'}
                    leftChild={<MyButton text={'왼쪽버튼'} onClick={() => alert('왼쪽버튼 클릭')} />}
                    rightChild={<MyButton text={'우측버튼'} onClick={() => alert('우측버튼 클릭')} />}
                />
                <h2>App.js</h2>

                {/* <img src={process.env.PUBLIC_URL + 'assets/emotion1.png'} /> */}

                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/new" element={<New />} />
                    <Route path="/edit" element={<Edit />} />
                    <Route path="/diary/:id" element={<Diary />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
