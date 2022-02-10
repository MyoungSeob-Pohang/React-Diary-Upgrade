import React, { useEffect, useReducer, useRef } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import New from './pages/New';
import Edit from './pages/Edit';
import Diary from './pages/Diary';

// 실시간 state와 행동을 담은 action
const reducer = (state, action) => {
    // 새로운 상태 담을 배열
    let newState = [];

    switch (action.type) {
        case 'INIT': {
            return action.data;
        }
        // data: { id: dataId.current, date: new Date(date).getTime(), content, emotion } 을 받아오니, 새로운 상태에 그대로 담고 나머진 state그대로
        case 'CREATE': {
            newState = [action.data, ...state];
            break;
        }
        // targetId를 받아와서 해당하는 아이디가 아닌 것만 모두 골라서 새로운 상태에 저장
        case 'REMOVE': {
            newState = state.filter((it) => it.id !== action.targetId);
            break;
        }
        // data: { id: targetId, date: new Date(date).getTime(), content, emotion } 같은 아이디를 가졌으면 업데이트 시키고 아니면 그대로 반환
        case 'EDIT': {
            newState = state.map((it) => (it.id === action.data.id ? { ...action.data } : it));
            break;
        }
        default:
            return state;
    }
    localStorage.setItem('diary', JSON.stringify(newState));
    // switch 끝나고 새로운 상태 리턴
    return newState;
};

// 전체 data전달을 위한 Context
export const DiaryStateContext = React.createContext();
// 함수전달 Context
export const DiaryDispatchContext = React.createContext();

function App() {
    useEffect(() => {
        const localData = localStorage.getItem('diary');

        if (localData) {
            const diaryList = JSON.parse(localData).sort((a, b) => parseInt(b.id) - parseInt(a.id));
            dataId.current = parseInt(diaryList[0].id) + 1;

            dispatch({ type: 'INIT', data: diaryList });
        }
    }, []);

    // 상태 업데이트 로직 분리를 위한 useReducer 선언 , 초기값으로 dummyData 전달
    const [data, dispatch] = useReducer(reducer, []);
    // 아이디 값으로 쓰기위한 Ref
    const dataId = useRef(0);

    // CREATE
    // 작성일, 내용, 감정을 받아서 객채형식으로 전달.
    const onCreate = (date, content, emotion) => {
        dispatch({ type: 'CREATE', data: { id: dataId.current, date: new Date(date).getTime(), content, emotion } });
        // 아이디 값 1 증가
        dataId.current += 1;
    };

    // REMOVE
    // 아이디 값을 받아 아이디 값 그대로 전달
    const onRemove = (targetId) => {
        dispatch({ type: 'REMOVE', targetId });
    };
    // EDIT
    // 아이디, 날짜, 내용, 감정을 모두 받아 전달
    const onEdit = (targetId, date, content, emotion) => {
        dispatch({ type: 'EDIT', data: { id: targetId, date: new Date(date).getTime(), content, emotion } });
    };

    return (
        // 전체 값 전달을 위한 Context
        <DiaryStateContext.Provider value={data}>
            {/* 함수 전달을 위한 Context */}
            <DiaryDispatchContext.Provider value={{ onCreate, onEdit, onRemove }}>
                {/* 전체 라우터 */}
                <BrowserRouter>
                    <div className="App">
                        {/* 각 path 별 전달 값 */}
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/new" element={<New />} />
                            <Route path="/edit/:id" element={<Edit />} />
                            <Route path="/diary/:id" element={<Diary />} />
                        </Routes>
                    </div>
                </BrowserRouter>
            </DiaryDispatchContext.Provider>
        </DiaryStateContext.Provider>
    );
}

export default App;
