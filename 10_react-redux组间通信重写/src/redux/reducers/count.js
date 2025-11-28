import { INCREMENT, DECREMRNT } from "../constant";

const initState = 0
export default function countReducer(prevState = initState, action) {
    const { type, data } = action
    switch (type) {
        case INCREMENT:
            return prevState + data
        case DECREMRNT:
            return prevState - data

        default:
            return prevState
    }
}