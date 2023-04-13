import './App.css';
import MainMenu from './components/MainMenu/MainMenu';
import { BrowserRouter, Route, Routes, useLocation, useNavigate, useParams } from "react-router-dom";
import store, { AppStateType } from './redux/reduxStore'
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import HeaderContainer from "./components/Header/Header-container";
import {LoginPage} from "./components/Login/LoginPage";
import React, { Component, Suspense } from "react";
import { connect, Provider } from "react-redux";
import { compose } from "redux";
import { initializeApp } from "./redux/appReducer";
import Preloader from "./components/common/Preloader/Preloader";


const ProfileContainer = React.lazy(() => import('./components/Profile/Profile-container'))
//import UsersContainer from "./components/Users/Users-container";
const UsersPage = React.lazy(() => import('./components/Users/UsersPage'))
//import MessagesContainer from "./components/Messages/Messages-container";
const MessagesContainer = React.lazy(() => import('./components/Messages/Messages-container'))

type MapStateProps = ReturnType<typeof mapStateToProps>
type MapDispatchProps = {initializeApp:()=>void}
type Props = MapStateProps & MapDispatchProps

class App extends Component<Props> {
	catchAllUnhandledErrors = (e: PromiseRejectionEvent) => {
		alert('Some error occurred')
	}
	componentDidMount() {
		this.props.initializeApp()
		window.addEventListener('unhandledrejection', this.catchAllUnhandledErrors)
	}
	componentWillUnmount() {
	window.removeEventListener('unhandledrejection', this.catchAllUnhandledErrors)
	}
	render() {
		if (!this.props.initialized) return <Preloader />
		return (
			<div className='app-wrapper'>
				<HeaderContainer />
				<MainMenu />
				<div className='app-wrapper__content'>
					<Suspense fallback={<Preloader />}>
						<Routes>
							<Route path='/' element={<ProfileContainer />} />
							<Route path='/profile/:userId?' element={<ProfileContainer />} />
							<Route path='/messages/*' element={<MessagesContainer />} />
							<Route path='/users' element={<UsersPage />} />
							<Route path='/news' element={<News />} />
							<Route path='/music' element={<Music />} />
							<Route path='/settings' element={<Settings />} />
							<Route path='/login' element={<LoginPage />} />
							<Route path='/*' element={<div>Page not found! Error 404</div>} />
						</Routes>
					</Suspense>
				</div>
			</div>
		)
	}
}
const mapStateToProps = (state:AppStateType) => ({ initialized: state.app.initialized })

function withRouter(Component:React.ComponentType<Props>) {
	function ComponentWithRouterProp(props:any) {
		let location = useLocation();
		let navigate = useNavigate();
		let params = useParams();
		return (
			<Component
				{...props}
				router={{ location, navigate, params }}
			/>
		);
	}
	return ComponentWithRouterProp;
}
let AppContainer = compose<React.ComponentType>(
	withRouter,
	connect(mapStateToProps, { initializeApp }))(App);

const MainApp:React.FC = () => {
	return (
		<BrowserRouter>
			<Provider store={store}>
				<AppContainer />
			</Provider>
		</BrowserRouter>
	)
}

export default MainApp;