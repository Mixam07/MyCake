import s from './PopupChange.module.css';

const PopupChange = (props) => {
    return (
        <>
            {
                (props.colorChangeFigure !== null)?
                <div className={s.popup}>
                    <div className={s.wrapper}>
                        <div className={s.title}>Change figure</div>
                        <div className={s.list}>
                            <div onClick={() => {props.changeFigure("rook")}} className={s.item}>
                                <img src={props.imgFigures[props.colorChangeFigure.color].rook} alt="rook" />
                            </div>
                            <div onClick={() => {props.changeFigure("horse")}} className={s.item}>
                                <img src={props.imgFigures[props.colorChangeFigure.color].horse} alt="horse" />
                            </div>
                            <div onClick={() => {props.changeFigure("elephant")}} className={s.item}>
                                <img src={props.imgFigures[props.colorChangeFigure.color].elephant} alt="elephant" />
                            </div>
                            <div onClick={() => {props.changeFigure("queen")}} className={s.item}>
                                <img src={props.imgFigures[props.colorChangeFigure.color].queen} alt="queen" />
                            </div>
                        </div>
                    </div>
                </div> :null
            }
        </>
    )
}

export default PopupChange;