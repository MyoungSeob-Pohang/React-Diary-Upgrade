import MyHeader from './MyHeader';
import MyButton from './MyButton';
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useRef, useState } from 'react';
import EmotionItem from './EmotionItem';
import { DiaryDispatchContext } from '../App';
import { getStringDate } from '../util/date';
import { emotionList } from '../util/emotion';

const DiaryEditor = ({ isEdit, originData }) => {
    const navigator = useNavigate();
    const [date, setDate] = useState(getStringDate(new Date()));
    const [emotion, setEmotion] = useState(3);
    const [content, setContent] = useState();
    const contentRef = useRef();
    const { onCreate, onEdit, onRemove } = useContext(DiaryDispatchContext);

    const handleClickEmotion = (emotion) => {
        setEmotion(emotion);
    };

    const handleSubmit = () => {
        if (content.length < 1) {
            contentRef.current.focus();
            return;
        }

        if (window.confirm(isEdit ? '일기를 수정 하시겠습니까?' : '일기를 작성 하시겠습니까?')) {
            if (isEdit) {
                onEdit(originData.id, date, content, emotion);
            } else {
                onCreate(date, content, emotion);
            }
        }

        navigator('/', { replace: true });
    };

    const handleRemove = () => {
        if (window.confirm('정말 삭제 하시겠습니까 ?')) {
            onRemove(originData.id);
            navigator('/', { replace: true });
        }
    };

    useEffect(() => {
        if (isEdit) {
            setDate(getStringDate(new Date(parseInt(originData.date))));
            setEmotion(originData.emotion);
            setContent(originData.content);
        }
    }, [isEdit, originData]);

    return (
        <div className="DiaryEditor">
            <MyHeader
                headText={isEdit ? '일기 수정하기' : '새 일기쓰기'}
                leftChild={<MyButton text={'< 뒤로가기'} onClick={() => navigator(-1)} />}
                rightChild={isEdit && <MyButton text={'삭제하기'} type={'negative'} onClick={handleRemove} />}
            />
            <div>
                <section>
                    <h4>오늘은 언제인가요 ?</h4>
                    <div className="input_box">
                        <input className="input_date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                    </div>
                </section>

                <section>
                    <h4>오늘의 감정</h4>
                    <div className="input_box emotion_list_wrapper">
                        {emotionList.map((it) => (
                            <EmotionItem key={it.emotion_id} {...it} onClick={handleClickEmotion} isSelected={it.emotion_id === emotion} />
                        ))}
                    </div>
                </section>

                <section>
                    <h4>오늘의 일기</h4>
                    <div className="input_box text_wrapper">
                        <textarea
                            placeholder="오늘은 어땟나요 ?"
                            ref={contentRef}
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                    </div>
                </section>

                <section>
                    <div className="control_box">
                        <MyButton text={'취소하기'} onClick={() => navigator(-1)} />
                        <MyButton text={'작성완료'} type={'positive'} onClick={handleSubmit} />
                    </div>
                </section>
            </div>
        </div>
    );
};

export default DiaryEditor;
