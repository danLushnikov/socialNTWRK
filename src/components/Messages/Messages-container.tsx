import { connect } from 'react-redux'
import { compose } from 'redux'
import withAuthRedirect from '../../hoc/withAuthRedirect'
import { actions } from '../../redux/messagesReducer'
import { AppStateType } from '../../redux/reduxStore'
import Messages from './Messages'


let mapStateToProps = (state: AppStateType) => {
	return {
		dialogData: state.messagesPage.dialogData,
		messageData: state.messagesPage.messageData,
		messageText: state.messagesPage.messageText,
	}
}
export default compose(
	connect(mapStateToProps, { ...actions }),
	withAuthRedirect
)(Messages) as React.ComponentType

// let AuthRedirectComponent = withAuthRedirect(Messages)
// export default connect(mapStateToProps, {addMessage, updateMessageText})(AuthRedirectComponent)
