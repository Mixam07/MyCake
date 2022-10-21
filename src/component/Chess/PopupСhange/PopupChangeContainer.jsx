import { connect } from "react-redux";
import { changeFigure} from "../../../redux/reducers/main-reducer";
import PopupСhange from "./PopupСhange";

const mapStateToProps = (state) => {
    return{
        colorChangeFigure: state.mainPage.changeFigure,
        imgFigures: state.mainPage.imgFigures
    }
}

export default connect(mapStateToProps, {changeFigure})(PopupСhange);