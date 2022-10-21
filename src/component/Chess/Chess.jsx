import s from './Chess.module.css';
import MainContainer from "./Main/MainContainer";
import PopupEndContainer from "./PopupEnd/PopupEndContainer";
import PopupСhangeContainer from './PopupСhange/PopupChangeContainer';

const Chess = () => {
    /*
    <div className={s.container}>
        <MainContainer />
    </div>
    */
    return (
        <>
            <PopupEndContainer />
            <PopupСhangeContainer />
            <MainContainer />
        </>
    )
}

export default Chess;