import { useParams } from 'react-router-dom';

const Diary = () => {
    const { id } = useParams();

    return (
        <div className="Diary">
            <h1>Diary</h1>
            <p>이곳은 일기 상세페이지 입니다.</p>
        </div>
    );
};

export default Diary;
