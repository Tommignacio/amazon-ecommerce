import { useEffect, useReducer } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import logger from 'use-reducer-logger';


const reducer = (state, action) => {
	switch (action.type) {
		case "FETCH_REQUEST":
			return { ...state, loading: true }
		case 'FETCH_SUCCESS':
			return { ...state, loading: false, products: action.payload }
		case 'FETCH_FAIL':
			return { ...state, loading: false, error: action.payload }
		default:
			return state;
	}
}


function HomeScreen() {
	//save products in stateReducer from backend
	const [{ loading, error, products }, dispatch] = useReducer(logger(reducer), {
		products: [],
		loading: true,
		error: "",
	})
	//load only after the component is rendered
	useEffect(() => {
		const fetchData = async () => {
			dispatch({ type: 'FETCH_REQUEST' });
			try {
				//get products from backend
				const result = await axios.get("/api/products");
				dispatch({ type: 'FETCH_SUCCESS', payload: result.data })
			} catch (error) {
				dispatch({ type: "FETCH_FAIL", payload: error.message })
			}
		}
		fetchData();
	}, []);

	return (
		<div>
			<h1>Featured Products</h1>
			<div className="products">
				{loading ?
					<div>loading...</div>
					: error ?
						<div>{error}</div>
						:
						products.map((product) => (
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
