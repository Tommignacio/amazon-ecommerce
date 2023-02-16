import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
//import data from "../data";

function HomeScreen() {
	//save products in state from backend
	const [products, setProducts] = useState([]);
	//load only after the component is rendered
	useEffect(() => {
		//get products from backend
		const fetchData = async () => {
			const result = await axios.get("/api/products");
			setProducts(result.data);
		};
		fetchData();
	}, []);

	return (
		<div>
			<h1>Featured Products</h1>
			<div className="products">
				{products.map((product) => (
					<div className="product" key={product.slug}>
						{/* Link replaces <a> to work on a single page app   */}
						<Link to={`/product/${product.slug}`}>
							<img src={product.image} alt={product.name} />
						</Link>
						<div className="product-info">
							<Link to={`/product/${product.slug}`}>
								<p>{product.name}</p>
							</Link>
							<p>
								<strong>${product.price} </strong>
							</p>
							<button> Add to cart</button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
export default HomeScreen;
