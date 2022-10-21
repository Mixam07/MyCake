import { connect } from "react-redux";
import React from "react";
import Main from "./Main";
import { pawnClick, rookClick, horseClick, elephantClick, queenClick, kingClick, figureMove, cleanClick, setState } from "../../../redux/reducers/main-reducer";

class MainContainer extends React.Component {
    componentDidUpdate(){
        localStorage.setItem("state", JSON.stringify(this.props.state));
    }
    render() {
        return <Main {...this.props} />
    }
}

const mapStateToProps = (state) => {
    return{
        arrangement: state.mainPage.arrangement,
        imgFigures: state.mainPage.imgFigures,
        winner: state.mainPage.winner,
        state: state.mainPage
    }
}

export default connect(mapStateToProps, {
    pawnClick, rookClick, horseClick, elephantClick, queenClick, kingClick, figureMove, cleanClick, setState
})(MainContainer);