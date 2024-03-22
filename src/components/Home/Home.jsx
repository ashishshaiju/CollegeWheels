import "./Home.scss";
import img1 from "../../assets/Images/Home/web_HD2.png";

const Home = () => {
	return (
		<div className="home">
			<div className="home_img-container">
				<img src={img1} alt="Image 1" className="home_img"/>
			</div>
			<div className="heading">
				<h1>College Wheels</h1>
			</div>
		</div>
	);
};

export default Home;
