import { DialogDataType, MessageDataType } from "../types/commonTypes";
import { InferActionsTypes } from './reduxStore'
//Constants for Reducers
const ADD_MESSAGE = 'social network/message/ADD-MESSAGE';
//First initial state for first loading and type of it
let initialState = {
	dialogData: [
		{ id: 1, name: 'Oreg' },
		{ id: 2, name: 'Bob' },
		{ id: 3, name: 'Tod' },
		{ id: 4, name: 'Roy' },
		{ id: 5, name: 'Pit' },
	] as Array<DialogDataType>,
	messageData: [
		{ id: 1, message: 'Hi' },
		{ id: 2, message: 'How are you?' },
		{ id: 3, message: "I'm fine thank you, what about you?" },
	] as Array<MessageDataType>,
	messageText:''
}
export type InitialStateType = typeof initialState
//Reducer
const messagesReducer = (state = initialState, action:Action):InitialStateType => {
	switch (action.type) {
		case ADD_MESSAGE:
			let newMessage = { id: state.messageData.length+1, message: action.messageText };
			return {
				...state,
				messageData: [...state.messageData, newMessage],
			};
		default:
			return state;
	}
}
export default messagesReducer;
//Actions and Action Types
type Action = InferActionsTypes<typeof actions>

export const actions = {
	addMessage: (messageText: string) => ({
		type: ADD_MESSAGE,
		messageText
	} as const)
} 

