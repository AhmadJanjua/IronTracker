import RouteButton from '../../components/RouteButton'

function Home() {
	return (
		<div>
			<h1>Iron Tacker</h1>
			<p>
				Improve your workouts with data driven techniques.
			</p>
			<section>
				<RouteButton title="Start" href="/start" />
				<br />
				<RouteButton title="Explore" href="/trends" />
				<br />
				<RouteButton title="Manage" href="/manage" />
			</section>
		</div>
	);
};

export default Home;
