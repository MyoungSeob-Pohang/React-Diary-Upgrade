import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DiaryStateContext } from '../App';
import DiaryEditor from '../components/DiaryEditor';

const Edit = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const diaryList = useContext(DiaryStateContext);
    const [originData, setOriginData] = useState();

    useEffect(() => {
        const titleElement = document.getElementsByTagName('title')[0];
        titleElement.innerText = `감정 일기장 - ${id}번 수정`;
    }, [id]);

    useEffect(() => {
        if (diaryList.length >= 1) {
            const targetDiary = diaryList.find((it) => parseInt(it.id) === parseInt(id));

            if (targetDiary) {
                setOriginData(targetDiary);
            } else {
                alert('없는 일기입니다.');
                navigate('/', { replace: true });
            }
        }
    }, [id, diaryList, navigate]);

    return <div className="Edit">{originData && <DiaryEditor isEdit={true} originData={originData} />}</div>;
};

export default Edit;
