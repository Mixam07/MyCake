import s from './PopupEnd.module.css';

const PopupEnd = (props) => {
    function setState() {
        props.setState({
            arrangement:[
                [
                    {type: "rook", color: "black"}, {type: "horse", color: "black"}, {type: "elephant", color: "black"}, {type: "queen", color: "black"},
                    {type: "king", color: "black"}, {type: "elephant", color: "black"}, {type: "horse", color: "black"}, {type: "rook", color: "black"}
                ],
                [
                    {type: "pawn", color: "black", isFirstMove: true}, {type: "pawn", color: "black", isFirstMove: true}, {type: "pawn", color: "black", isFirstMove: true},
                    {type: "pawn", color: "black", isFirstMove: true}, {type: "pawn", color: "black", isFirstMove: true},
                    {type: "pawn", color: "black", isFirstMove: true}, {type: "pawn", color: "black", isFirstMove: true}, {type: "pawn", color: "black", isFirstMove: true}
                ],
                [{}, {}, {}, {}, {}, {}, {}, {}],
                [{}, {}, {}, {}, {}, {}, {}, {}],
                [{}, {}, {}, {}, {}, {}, {}, {}],
                [{}, {}, {}, {}, {}, {}, {}, {}],
                [
                    {type: "pawn", color: "white", isFirstMove: true}, {type: "pawn", color: "white", isFirstMove: true}, {type: "pawn", color: "white", isFirstMove: true},
                    {type: "pawn", color: "white", isFirstMove: true}, {type: "pawn", color: "white", isFirstMove: true},
                    {type: "pawn", color: "white", isFirstMove: true}, {type: "pawn", color: "white" , isFirstMove: true}, {type: "pawn", color: "white", isFirstMove: true}
                ],
                [
                    {type: "rook", color: "white"}, {type: "horse", color: "white"}, {type: "elephant", color: "white"}, {type: "queen", color: "white"},
                    {type: "king", color: "white"}, {type: "elephant", color: "white"}, {type: "horse", color: "white"}, {type: "rook", color: "white"}
                ]
            ]
        });
    }
    return (
        <>
            {
                (props.winner !== null)? 
                <div className={s.popup}>
                    <div className={s.wrapper}>
                        <div className={s.text}>Winner - {props.winner}</div>
                        <button onClick={() => { setState() }} className={s.btn}>New game</button>
                    </div>
                </div>: null
            }
        </>
    )
}

export default PopupEnd;