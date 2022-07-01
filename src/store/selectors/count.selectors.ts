import { createFeatureSelector, createSelector } from "@ngrx/store";
import { countNode, CountState } from "../reducers/count.reducer";

export const selectCountFeature = createFeatureSelector<CountState>(countNode)


export const selectCount = createSelector(
    selectCountFeature,
    (state: CountState): number => state.count
);

export const selectUpdatedAt = createSelector(
    selectCountFeature,
    (state: CountState): number => state.updatedAt
)
export const selectText = createSelector(
    selectCountFeature,
    (state: CountState): string => state.text
)
