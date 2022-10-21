import pawnBlack from '../../assets/icons/black/pawn.svg';
import rookBlack from '../../assets/icons/black/rook.svg';
import horseBlack from '../../assets/icons/black/horse.svg';
import elephantBlack from '../../assets/icons/black/elephant.svg';
import queenBlack from '../../assets/icons/black/queen.svg';
import kingBlack from '../../assets/icons/black/king.svg';

import pawnWhite from '../../assets/icons/white/pawn.svg';
import rookWhite from '../../assets/icons/white/rook.svg';
import horseWhite from '../../assets/icons/white/horse.svg';
import elephantWhite from '../../assets/icons/white/elephant.svg';
import queenWhite from '../../assets/icons/white/queen.svg';
import kingWhite from '../../assets/icons/white/king.svg';

const PAWN_CLICK = "PAWN-CLICK";
const ROOK_CLICK = "ROOK-CLICK";
const HORSE_CLICK = "HORSE-CLICK";
const ELEPHANT_CLICK = "ELEPHANT-CLICK";
const QUEEN_CLICK = "QUEEN-CLICK";
const KING_CLICK =  "KING-CLICK";
const FIGURE_MOVE = "FIGURE-MOVE";
const CLEAN_CLICK = "CLEAN-CLICK";
const SET_STATE = "SET-STATE";
const CHANGE_FIGURE = "CHANGE-FIGURE";

let initialState = {
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
    ],
    imgFigures: {
        black: {
            pawn: pawnBlack,
            rook: rookBlack,
            horse: horseBlack,
            elephant: elephantBlack,
            queen: queenBlack,
            king: kingBlack
        },
        white: {
            pawn: pawnWhite,
            rook: rookWhite,
            horse: horseWhite,
            elephant: elephantWhite,
            queen: queenWhite,
            king: kingWhite
        }
    },
    selectedFigure: null,
    winner: null,
    changeFigure: null,
    moveTeam: "white"
}

if(JSON.parse(localStorage.getItem("state")) !== null){
    initialState = JSON.parse(localStorage.getItem("state"));
}

const mainReducer = (state = initialState, action) => {
    let opponentColor = null, direction = null, myColor = null;

    if((9>=(action.arrId + 1)>=1 && 9>=(action.id +1)>=1 && state.arrangement[action.arrId][action.id].color)){
        opponentColor = (state.arrangement[action.arrId][action.id].color === "white")? "black": "white";
        direction = (opponentColor === "white")? 1: -1;
        myColor = (opponentColor === "black")? "white": "black";
    }

    if(state.moveTeam === opponentColor && action.type !== FIGURE_MOVE){
        return state
    }

    function checkRook(arrId, id) {
        let isWasOpponentFigure = false;

        function checkMove(arrId, id, isXCoordinate) {
            const firstPosition = (isXCoordinate)? arrId: id,
                secondPosition = (isXCoordinate)? id: arrId;

            if(isWasOpponentFigure || (state.arrangement[firstPosition][secondPosition].color === myColor)){
                isWasOpponentFigure = false
                return false;
            }else if((state.arrangement[firstPosition][secondPosition].color === opponentColor) && !isWasOpponentFigure){
                isWasOpponentFigure = true
            }
        }

        function checkPossibleMovesAlongCoordinate(positionFigure, positionMove, otherCoordinatePosition, isXCoordinate) {
            if(positionMove < positionFigure){
                for(let i = (positionFigure - 1); i >= positionMove; i--){
                    if(checkMove(i, otherCoordinatePosition, isXCoordinate) === false){
                        return false;
                    }
                }
            }else if(positionMove > positionFigure){
                for(let i = (positionFigure + 1); i <= positionMove; i++){
                    if(checkMove(i, otherCoordinatePosition, isXCoordinate) === false){
                        return false;
                    }
                }
            }

            isWasOpponentFigure = false;
            return true
        }

        function checkPositionOnFigure(arrId, id) {
            if(
            (arrId < action.arrId && id === action.id)||
            //Bottom
            (arrId > action.arrId && id === action.id)||
            //Right
            (arrId === action.arrId && id > action.id)||
            //Left
            (arrId === action.arrId && id < action.id)){
                if(id === action.id){
                    return checkPossibleMovesAlongCoordinate(action.arrId, arrId, action.id, true);
                }else if(arrId === action.arrId){
                    return checkPossibleMovesAlongCoordinate(action.id, id, action.arrId, false);
                }
            }
        }

        return checkPositionOnFigure(arrId, id);
    }

    function checkElephant(arrId, id) {
        let isWasOpponentFigure = false;

        function checkMove(arrId, directionArr, directionItem) {
            for(let i = 1; i <= Math.abs(action.arrId - arrId); i++){
                const color = state.arrangement[action.arrId + (i * directionArr)][action.id + (i * directionItem)].color;

                if(color && !isWasOpponentFigure){
                    if(color === opponentColor){
                        isWasOpponentFigure = true;
                    }else{
                        return false;
                    }
                }else if(isWasOpponentFigure){
                    return false;
                }
            }
        }

        function checkPossibleMovesAlongCoordinate(arrId, id) {
            if(action.arrId > arrId && action.id < id && (action.arrId - arrId) === (id - action.id)){
                if(checkMove(arrId, -1, 1) === false) {
                    return false;
                }
            }else if(action.arrId < arrId && action.id < id && (arrId - action.arrId) === (id - action.id)) {
                if(checkMove(arrId, 1, 1) === false) {
                    return false;
                }
            }else if(action.arrId > arrId && action.id > id && (action.arrId - arrId) === (action.id - id)) {
                if(checkMove(arrId, -1, -1) === false) {
                    return false;
                }
            }else if(action.arrId < arrId && action.id > id && (arrId - action.arrId) === (action.id - id)) {
                if(checkMove(arrId, 1, -1) === false) {
                    return false;
                }
            }

            isWasOpponentFigure = false;
            return true;
        }

        function checkPosition(arrId, id) {
            if(
            //Right Top
            ((action.arrId > arrId && action.id < id && (action.arrId - arrId) === (id - action.id))
            //Left Top
            || (action.arrId > arrId && action.id > id && (action.arrId - arrId) === (action.id - id))
            //Right Bottom
            || (action.arrId < arrId && action.id < id && (arrId - action.arrId) === (id - action.id))
            //Left bottom
            || (action.arrId < arrId && action.id > id && (arrId - action.arrId) === (action.id - id)))
            && state.arrangement[arrId][id].color !== myColor) {
                return checkPossibleMovesAlongCoordinate(arrId, id);
            }

            return false;
        }

        return checkPosition(arrId, id);
    }

    switch(action.type){
        case PAWN_CLICK:
            return {
                ...state,
                selectedFigure: {
                    arrId: action.arrId,
                    id: action.id
                },
                arrangement: state.arrangement.map((arr, q) => {
                    return arr.map((item, i) => {
                        if((q === (action.arrId + direction) && i === action.id && !item.type) || (q === (action.arrId + direction) && (i === (action.id - 1) || i === (action.id + 1)) && item.color === opponentColor)
                        || (state.arrangement[action.arrId][action.id].isFirstMove && q === (action.arrId + (direction * 2)) && i === action.id) && !state.arrangement[q][i].color) {
                            return{
                                ...item,
                                isPossibleMove: true
                            }
                        }else{
                            return {
                                ...item,
                                isPossibleMove: false
                            }
                        }
                    });
                })
            }
        case ROOK_CLICK:
            return {
                ...state,
                selectedFigure: {
                    arrId: action.arrId,
                    id: action.id
                },
                arrangement: state.arrangement.map((arr, q) => {
                    return arr.map((item, i) => {
                        if(checkRook(q, i)) {
                            return{
                                ...item,
                                isPossibleMove: true
                            }
                        }else{
                            return {
                                ...item,
                                isPossibleMove: false
                            }
                        }
                    });
                })
            }
        case HORSE_CLICK:
            return {
                ...state,
                selectedFigure: {
                    arrId: action.arrId,
                    id: action.id
                },
                arrangement: state.arrangement.map((arr, q) => {
                    return arr.map((item, i) => {
                        if(
                        //Top
                        (q === (action.arrId + (2 * direction)) && i === (action.id + 1) && (item.color === opponentColor || !item.color)) ||
                        (q === (action.arrId + (2 * direction)) && i === (action.id - 1) && (item.color === opponentColor || !item.color)) ||
                        //Left
                        (q === (action.arrId + direction) && i === (action.id - 2) && (item.color === opponentColor || !item.color)) ||
                        (q === (action.arrId - direction) && i === (action.id - 2) && (item.color === opponentColor || !item.color)) ||
                        //Right
                        (q === (action.arrId + direction) && i === (action.id + 2) && (item.color === opponentColor || !item.color)) ||
                        (q === (action.arrId - direction) && i === (action.id + 2) && (item.color === opponentColor || !item.color)) ||
                        //Bottom
                        (q === (action.arrId - (2 * direction)) && i === (action.id + 1) && (item.color === opponentColor || !item.color)) ||
                        (q === (action.arrId - (2 * direction)) && i === (action.id - 1) && (item.color === opponentColor || !item.color))){
                            return{
                                ...item,
                                isPossibleMove: true
                            }
                        }else{
                            return {
                                ...item,
                                isPossibleMove: false
                            }
                        }
                    });
                })
            }
        case ELEPHANT_CLICK:
            return {
                ...state,
                selectedFigure: {
                    arrId: action.arrId,
                    id: action.id
                },
                arrangement: state.arrangement.map((arr, q) => {
                    return arr.map((item, i) => {
                        if(checkElephant(q, i)) {
                            return{
                                ...item,
                                isPossibleMove: true
                            }
                        }else{
                            return {
                                ...item,
                                isPossibleMove: false
                            }
                        }
                    });
                })
            }
        case QUEEN_CLICK:
            return {
                ...state,
                selectedFigure: {
                    arrId: action.arrId,
                    id: action.id
                },
                arrangement: state.arrangement.map((arr, q) => {
                    return arr.map((item, i) => {
                        if(checkRook(q, i) || checkElephant(q, i)) {
                            return{
                                ...item,
                                isPossibleMove: true
                            }
                        }else{
                            return {
                                ...item,
                                isPossibleMove: false
                            }
                        }
                    });
                })
            }
        case KING_CLICK:
            return {
                ...state,
                selectedFigure: {
                    arrId: action.arrId,
                    id: action.id
                },
                arrangement: state.arrangement.map((arr, q) => {
                    return arr.map((item, i) => {
                        if(
                        //Top
                        (((q === (action.arrId - 1)) && (i === action.id)) && (state.arrangement[action.arrId - 1][action.id].color !== myColor)) ||
                        //Top Right
                        (((q === (action.arrId - 1)) && (i === (action.id + 1))) && (state.arrangement[action.arrId - 1][action.id + 1].color !== myColor)) ||
                        //Right
                        (((q === action.arrId) && (i === (action.id + 1))) && (state.arrangement[action.arrId][action.id + 1].color !== myColor)) ||
                        //Bottom Right
                        (((q === (action.arrId + 1)) && (i === (action.id + 1))) && (state.arrangement[action.arrId + 1][action.id + 1].color !== myColor)) ||
                        //Bottom
                        (((q === (action.arrId + 1)) && (i === action.id)) && (state.arrangement[action.arrId + 1][action.id].color !== myColor)) ||
                        //Bottom Left
                        (((q === (action.arrId + 1)) && (i === (action.id - 1))) && (state.arrangement[action.arrId + 1][action.id - 1].color !== myColor)) ||
                        //Left
                        (((q === action.arrId) && (i === (action.id - 1))) && (state.arrangement[action.arrId][action.id - 1].color !== myColor)) ||
                        //Top Left
                        (((q === (action.arrId - 1)) && (i === (action.id - 1))) && (state.arrangement[action.arrId - 1][action.id - 1].color !== myColor))) {
                            return{
                                ...item,
                                isPossibleMove: true
                            }
                        }else{
                            return {
                                ...item,
                                isPossibleMove: false
                            }
                        }
                    });
                })
            }
        case FIGURE_MOVE:
            let winner = null;

            state.arrangement.forEach((arr, q) => {
                arr.forEach((item, i) => {
                    if(q === action.arrId && i === action.id && state.arrangement[action.arrId][action.id].type === "king"){
                        winner = state.arrangement[state.selectedFigure.arrId][state.selectedFigure.id].color;
                    }
                });
            });

            if(winner === null){
                state.arrangement.forEach((arr, q) => {
                    if(((q === 0 && state.arrangement[state.selectedFigure.arrId][state.selectedFigure.id].color === "white" && action.arrId === 0) ||
                    (q === 7 && state.arrangement[state.selectedFigure.arrId][state.selectedFigure.id].color === "black"  && action.arrId === 7)) &&
                    state.arrangement[state.selectedFigure.arrId][state.selectedFigure.id].type === "pawn"){
                        state.changeFigure = {
                            color: state.arrangement[state.selectedFigure.arrId][state.selectedFigure.id].color,
                            arrId: action.arrId,
                            id: action.id
                        };
                    }
                });
            }
            return {
                ...state,
                winner,
                moveTeam: state.arrangement[state.selectedFigure.arrId][state.selectedFigure.id].color === "white"? "black": "white",
                arrangement: state.arrangement.map((arr, q) => {
                    return arr.map((item, i) => {
                        if(q === action.arrId && i === action.id){
                            if(state.arrangement[state.selectedFigure.arrId][state.selectedFigure.id].type === "pawn"){
                                return {
                                    ...state.arrangement[state.selectedFigure.arrId][state.selectedFigure.id],
                                    isFirstMove: false
                                }
                            }else{
                                return state.arrangement[state.selectedFigure.arrId][state.selectedFigure.id]
                            }
                        }else if(q === state.selectedFigure.arrId && i === state.selectedFigure.id){
                            return {
                                isPossibleMove: false
                            }
                        }else{
                            return {
                                ...item,
                                isPossibleMove: false
                            }
                        }
                    });
                })
            }
        case CLEAN_CLICK:
            return {
                ...state,
                selectedFigure: null,
                arrangement: state.arrangement.map(arr => {
                    return arr.map(item => {
                        return {
                            ...item,
                            isPossibleMove: false
                        }
                    });
                })
            }
        case SET_STATE:
            return{
                ...state,
                ...action.state,
                selectedFigure: null,
                winner: null,
                changeFigure: null,
                moveTeam: "white"
            }
        case CHANGE_FIGURE:
            return {
                ...state,
                changeFigure: null,
                arrangement: state.arrangement.map((arr, q) => {
                    return arr.map((item, i) => {
                        if(q === state.changeFigure.arrId && i === state.changeFigure.id){
                            return {
                                ...item,
                                type: action.item.type
                            }
                        }else{
                            return item;
                        }
                    });
                })
            }
        default:
            return state;
    }
}

export const pawnClick = (arrId, id) => ({type: PAWN_CLICK, arrId: arrId, id: id});
export const rookClick = (arrId, id) => ({type: ROOK_CLICK, arrId: arrId, id: id});
export const horseClick = (arrId, id) => ({type: HORSE_CLICK, arrId: arrId, id: id});
export const elephantClick = (arrId, id) => ({type: ELEPHANT_CLICK, arrId: arrId, id: id});
export const queenClick = (arrId, id) => ({type: QUEEN_CLICK, arrId: arrId, id: id});
export const kingClick = (arrId, id) => ({type: KING_CLICK, arrId: arrId, id: id});
export const figureMove = (arrId, id) => ({type: FIGURE_MOVE, arrId: arrId, id: id});
export const cleanClick = () => ({type: CLEAN_CLICK});
export const setState = (state) => ({type: SET_STATE, state: state});
export const changeFigure = (type) => ({type: CHANGE_FIGURE, item: {type}})

export default mainReducer;