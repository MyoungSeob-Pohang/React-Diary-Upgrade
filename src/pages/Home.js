import { useContext, useEffect, useState } from 'react';
import { DiaryStateContext } from '../App';
import MyButton from '../components/MyButton';
import MyHeader from './../components/MyHeader';

const Home = () => {
    // 더미데이더 받아오기 dummyData는 DiaryStateContext Provider에서 전달해줌
    const diaryDummyList = useContext(DiaryStateContext);
    // 더미데이터 관리를위한 상태
    const [data, setData] = useState([]);

    // 날짜 상태
    const [curDate, setCurDate] = useState(new Date());
    // MyHeader의 headText 값
    const headText = `${curDate.getFullYear()}년 ${curDate.getMonth() + 1}월 `;

    // 더미데이터 가공
    // first는 현재 년도와 전달을 받아와 첫째날을 구해주고
    // last는 현재 년도와 현재 달을 전달해 마지막 날을 구해준다.
    // diaryDummyList를 순회하면서 it.date가 첫날보다 크고 마지막달 보다 작은것들을 구해서 반환하면 이 달의 일기만 추려낼 수 있다.
    useEffect(() => {
        // 일기의 길이가 1개보다 많아야 조건 진행
        if (diaryDummyList.length >= 1) {
            const firstDay = new Date(curDate.getFullYear(), curDate.getMonth(), 1).getTime();
            const lastDay = new Date(curDate.getFullYear(), curDate.getMonth() + 1, 0).getTime();

            // 그걸 setData에 전달하여 새로운 데이터 생성
            setData(diaryDummyList.filter((it) => firstDay <= it.date && it.date <= lastDay));
        }
        // curDate는 달이 변경되면 당연히 상태변화해야 되니 넘겨주고 , diaryDummyList도 달이 바뀌면서 각 달에 맞는 일기를 뽑아야하기에 같이 전달
    }, [diaryDummyList, curDate]);

    // 더미데이터 관리를 위한 data는 초기값으로 빈 배열을 전달했음으로 출력은 [] 빈배열이 먼저 나오고 그다음 data가 변경될 때 나온다.
    useEffect(() => {
        console.log(data);
    }, [data]);

    // 달 증가 함수
    const increaseMonth = () => {
        setCurDate(new Date(curDate.getFullYear(), curDate.getMonth() + 1, curDate.getDate()));
    };

    // 달 감소 함수
    const decreaseMonth = () => {
        setCurDate(new Date(curDate.getFullYear(), curDate.getMonth() - 1, curDate.getDate()));
    };

    return (
        <div className="Home">
            <MyHeader
                headText={headText}
                leftChild={<MyButton text={'<'} onClick={decreaseMonth} />}
                rightChild={<MyButton text={'>'} onClick={increaseMonth} />}
            />
        </div>
    );
};

export default Home;
