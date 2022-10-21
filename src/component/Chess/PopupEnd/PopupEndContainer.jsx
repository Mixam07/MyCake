import { connect } from "react-redux";
import { setState } from "../../../redux/reducers/main-reducer";
import PopupEnd from "./PopupEnd";

const mapStateToProps = (state) => {
    return{
        winner: state.mainPage.winner
    }
}

export default connect(mapStateToProps, {setState})(PopupEnd);