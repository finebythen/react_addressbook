import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout';
import AddressList from './features/AddressList';

const App = () => {
	return(
		<Routes>
			<Route path="/" element={<Layout />}>
				<Route index element={<AddressList />} />
			</Route>
			{/* Catch all - could be replaced with 404 if wanted */}
			<Route path="*" element={<Navigate to="/" replace />} />
		</Routes>
	)
};

export default App;