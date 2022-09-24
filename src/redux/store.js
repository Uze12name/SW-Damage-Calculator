import { configureStore } from "@reduxjs/toolkit";
import statReducer from "./statSlice";
import artifactReducer from "./artifactSlice";
import effectReducer from "./effectSlice";
import buildingReducer from "./buildingSlice";
import monsInfoReducer from "./monsInfoSlice";
import skillReducer from "./skillSlice";


export default configureStore({
  reducer: {
    building: buildingReducer,
    stat: statReducer,
    artifact: artifactReducer,
    effect: effectReducer,
    monsInfo: monsInfoReducer,
    skillInfo: skillReducer,
  },
})