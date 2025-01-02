//custom selector
import { createSelector } from 'reselect';

export const getEvents = createSelector(
    (state) => state.events,
    (allEvents) => Object.values(allEvents)
)

//token verification
import { csrfFetch } from './csrf'