import { useNavigate, useSearchParams } from 'react-router-dom';

const Edit = () => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const id = searchParams.get('id');
    const mode = searchParams.get('mode');

    console.log(id, mode);

    return (
        <div className="Edit">
            <h1>Edit</h1>
            <p>이곳은 일기 수정페이지 입니다.</p>
            <button onClick={() => setSearchParams({ id: 11, mode: 'white' })}>QS 바꾸기</button>

            <button
                onClick={() => {
                    navigate('/home');
                }}
            >
                HOME 이동
            </button>

            <button
                onClick={() => {
                    navigate(-1);
                }}
            >
                뒤로가기
            </button>
        </div>
    );
};

export default Edit;
