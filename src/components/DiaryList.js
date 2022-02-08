import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DiaryItem from './DiaryItem';
import MyButton from './MyButton';

const ControlMenu = ({ value, onChange, optionList }) => {
    return (
        <select className="ControlMenu" value={value} onChange={(e) => onChange(e.target.value)}>
            {optionList.map((it, idx) => (
                <option key={idx} value={it.value}>
                    {it.name}
                </option>
            ))}
        </select>
    );
};

const sortOptionList = [
    { value: 'latest', name: '최신순' },
    { value: 'oldest', name: '오래된 순' },
];

const filterOptionList = [
    { value: 'all', name: '전부' },
    { value: 'good', name: '좋은감정만' },
    { value: 'bad', name: '나쁜감정만' },
];

const DiaryList = ({ diaryList }) => {
    const navigate = useNavigate();

    // 정렬을 위한 State 최신순/오래된 순 초기 값은 최신 순
    const [sortType, setSortType] = useState('latest');

    // 감정 State 초기값은 전체 표시를 위해 all
    const [filter, setFilter] = useState('all');

    // 다이어리 리스트의 정렬을 바꾸기 위한 함수
    // diaryList가 가진값의 변경을 막기 위해 JSON.stringify로 문자열로 받아온 다음 JSON.parse로 json객체로 다시 만들어서 반환받는다
    // 그 값을 compare를 사용하여 정렬 시켜준다.
    const getProcessedDiaryList = () => {
        const filterCallBack = (item) => {
            if (filter === 'good') {
                return parseInt(item.emotion) <= 3;
            }
            return parseInt(item.emotion) > 3;
        };

        const compare = (a, b) => {
            if (sortType === 'latest') {
                return parseInt(b.date) - parseInt(a.date);
            } else {
                return parseInt(a.date) - parseInt(b.date);
            }
        };

        const copyList = JSON.parse(JSON.stringify(diaryList));
        const filteredList = filter === 'all' ? copyList : copyList.filter((it) => filterCallBack(it));

        const sortedList = filteredList.sort(compare);
        return sortedList;
    };

    return (
        <div className="DiaryList">
            <div className="menu_wrapper">
                <div className="left_col">
                    {/* 최신순 / 오래된 순 정렬 */}
                    <ControlMenu value={sortType} onChange={setSortType} optionList={sortOptionList} />

                    {/* 감정에 따른 정렬 */}
                    <ControlMenu value={filter} onChange={setFilter} optionList={filterOptionList} />
                </div>
                <div className="right_col">
                    {/* 일기쓰기 버튼 */}
                    <MyButton type={'positive'} text={'새 일기쓰기'} onClick={() => navigate('/new')} />
                </div>
            </div>

            {getProcessedDiaryList().map((it) => (
                <DiaryItem key={it.id} {...it} />
            ))}
        </div>
    );
};

DiaryList.defaultProps = {
    diaryList: [],
};

export default DiaryList;
