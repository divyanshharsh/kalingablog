import { Link, useLocation, useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { FaBars, FaPencilAlt } from "react-icons/fa";
import { useContext, useState } from "react";
import Menu from "./Menu";
import { UserContext } from "../context/UserContext";

const Navbar = () => {
	const [prompt, setPrompt] = useState("");
	const [menu, setMenu] = useState(false);
	const navigate = useNavigate();
	const path = useLocation().pathname;

	// console.log(prompt)

	const showMenu = () => {
		setMenu(!menu);
	};

	const { user } = useContext(UserContext);

	return (
		<div className="flex items-center justify-between px-6 md:px-[200px] py-4 ">
			<div className="">
				<Link to="/">
					<h1 className="text-lg md:text-2xl font-extrabold font-poppins">
						Blogging Blitz
					</h1>
					<p className="text-right font-medium text-orange-900">
						by Kalinga Jyoti
					</p>
				</Link>
			</div>
			{path === "/" && (
				<div className="flex justify-center items-center space-x-0 border-2 py-2 px-8 border-neutral-200 rounded-full shadow-lg">
					<p
						onClick={() =>
							navigate(prompt ? "?search=" + prompt : navigate("/"))
						}
						className="cursor-pointer"
					>
						<BsSearch />
					</p>
					<input
						onChange={(e) => setPrompt(e.target.value)}
						className="outline-none px-3 "
						placeholder="Search a post"
						type="text"
					/>
				</div>
			)}
			<div className="hidden md:flex items-center justify-center space-x-2 md:space-x-4">
				{user ? (
					<Link to="/write">
						<div
							className="flex justify-center items-center gap-2 text-lg bg-blue-500 text-white rounded-full px-4 py-2 font-medium hover:shadow-md hover:shadow-blue-500 hover:text-blue-500 hover:bg-white transition duration-300 ease-in-out cursor-pointer
            "
						>
							<FaPencilAlt size={15} />
							Write
						</div>
					</Link>
				) : (
					<h3>
						<Link to="/login">Login</Link>
					</h3>
				)}
				{user ? (
					<div onClick={showMenu}>
						<p className="cursor-pointer relative">
							<FaBars />
						</p>
						{menu && <Menu />}
					</div>
				) : (
					<h3>
						<Link to="/register">Register</Link>
					</h3>
				)}
			</div>
			<div onClick={showMenu} className="md:hidden text-lg">
				<p className="cursor-pointer relative">
					<FaBars />
				</p>
				{menu && <Menu />}
			</div>
		</div>
	);
};

export default Navbar;
