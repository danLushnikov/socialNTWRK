import { useSelector } from 'react-redux'
import { getIsFetching } from '../../redux/usersSelector'
import Preloader from '../common/Preloader/Preloader'
import { Users } from './Users'

const UsersPage: React.FC = () => {
	const isFetching = useSelector(getIsFetching)
	return (
		<>
			{isFetching && <Preloader />}
			<Users />
		</>
	)
}
export default UsersPage
