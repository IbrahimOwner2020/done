import type { NextPage } from "next";
import Head from "next/head";
import { useAuth } from '../hooks/AuthProvider'

const Home: NextPage = () => {
    const { user } = useAuth()
    console.log(user)
    
	return (
		<div>
			<Head>
				<title>Done.</title>
				<meta
					name="description"
					content="The next gen todo app with tones of features"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<div className="text-4xl text-red-700">
				The done app has started
			</div>
		</div>
	);
};

export default Home;
