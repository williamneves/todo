import './App.css';
import { Routes, Route } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { themeAtom } from './atoms/themeAtom';
import Home from './Home';
import { ProtectedRoute } from './components';
import {Login, Register, Todos, UserSettings} from './pages';

function App() {
	const [theme, setTheme] = useRecoilState(themeAtom);
	return (
		<>
			<div className={theme === 'dark' ? 'dark' : 'light'}>
				<div className='mainApp'>
					<Routes>
						<Route
							path='/'
							element={
								<ProtectedRoute>
									<Home />
								</ProtectedRoute>
							}>
							<Route path='/todos' element={<Todos/>} />
							<Route path='/user' element={<UserSettings/>} />
						</Route>
						<Route path='/login' element={<Login/>} />
						<Route path='/register' element={<Register/>} />
					</Routes>
				</div>
			</div>
		</>
	);
}

export default App;
