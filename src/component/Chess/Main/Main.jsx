import s from './Main.module.css';

const Main = (props) => {
    const Block = (props) => {
        return (
            <div onClick={props.onClick} className={props.style}>
                {props.fugura? props.fugura: null}
            </div>
        );
    }

    const cell = props.arrangement.map((arr, q) => {
        let count = ((q%2) === 0)? 0: 1;

        return arr.map((item, i) => {
            count++;

            function onClick() {
                if(item.isPossibleMove === true){
                    props.figureMove(q, i);
                }else{
                    if(item.type === "pawn"){
                        props.pawnClick(q, i);
                    }else if(item.type === "rook"){
                        props.rookClick(q, i);
                    }else if(item.type === "horse"){
                        props.horseClick(q, i);
                    }else if(item.type === "elephant"){
                        props.elephantClick(q, i);
                    }else if(item.type === "queen"){
                        props.queenClick(q, i);
                    }else if(item.type === "king"){
                        props.kingClick(q, i);
                    }else if(!item.color && !item.type){
                        props.cleanClick();
                    }
                }
            }

            let fugura = (item && item.type)? <img className={item.color} src={props.imgFigures[item.color][item.type]} alt={item.type} />: null;

            if(item.isPossibleMove === true){
                if((count % 2) === 1){
                    return <Block key={(q*8) + (i+1)} fugura={fugura} onClick={onClick} style={`${s.cell} ${s.white} ${s.isPossibleMove}`} />
                }else{
                    return <Block key={(q*8) + (i+1)} fugura={fugura} onClick={onClick} style={`${s.cell} ${s.black} ${s.isPossibleMove}`} />
                }
            }else{
                if((count % 2) === 1){
                    return <Block key={(q*8) + (i+1)} fugura={fugura} onClick={onClick} style={`${s.cell} ${s.white}`} />
                }else{
                    return <Block key={(q*8) + (i+1)} fugura={fugura} onClick={onClick} style={`${s.cell} ${s.black}`} />
                }
           }
        });
    });

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

    return(
        <main className={s.main}>
            <div className={s.button}>
                <button onClick={() => {setState()}} className={s.btn}>New game</button>
            </div>
            <div className={s.wrapper}>
                <div className={s.item}></div>
                <div className={`${s.item} ${s.top}`}>a</div>
                <div className={`${s.item} ${s.top}`}>b</div>
                <div className={`${s.item} ${s.top}`}>c</div>
                <div className={`${s.item} ${s.top}`}>d</div>
                <div className={`${s.item} ${s.top}`}>e</div>
                <div className={`${s.item} ${s.top}`}>f</div>
                <div className={`${s.item} ${s.top}`}>g</div>
                <div className={`${s.item} ${s.top}`}>h</div>
                <div className={s.item}></div>

                <div className={`${s.item} ${s.bottom}`}>8</div>
                <div className={`${s.item} ${s.top}`}>8</div>
                <div className={`${s.item} ${s.bottom}`}>7</div>
                <div className={`${s.item} ${s.top}`}>7</div>
                <div className={`${s.item} ${s.bottom}`}>6</div>
                <div className={`${s.item} ${s.top}`}>6</div>
                <div className={`${s.item} ${s.bottom}`}>5</div>
                <div className={`${s.item} ${s.top}`}>5</div>
                <div className={`${s.item} ${s.bottom}`}>4</div>
                <div className={`${s.item} ${s.top}`}>4</div>
                <div className={`${s.item} ${s.bottom}`}>3</div>
                <div className={`${s.item} ${s.top}`}>3</div>
                <div className={`${s.item} ${s.bottom}`}>2</div>
                <div className={`${s.item} ${s.top}`}>2</div>
                <div className={`${s.item} ${s.bottom}`}>1</div>
                <div className={`${s.item} ${s.top}`}>1</div>

                <div className={s.item}></div>
                <div className={`${s.item} ${s.bottom}`}>a</div>
                <div className={`${s.item} ${s.bottom}`}>b</div>
                <div className={`${s.item} ${s.bottom}`}>c</div>
                <div className={`${s.item} ${s.bottom}`}>d</div>
                <div className={`${s.item} ${s.bottom}`}>e</div>
                <div className={`${s.item} ${s.bottom}`}>f</div>
                <div className={`${s.item} ${s.bottom}`}>g</div>
                <div className={`${s.item} ${s.bottom}`}>h</div>
                <div className={s.item}></div>

                <div className={s.mainItem}>
                    {cell}
                </div>
            </div>
        </main>
    )
}

export default Main;