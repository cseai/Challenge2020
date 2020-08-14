class App extends React.Component {
	state = {
		posts: [],
		open: false,
		selectedPost: null, // Keep track of the selected post
	};

	componentDidMount() {
		let url = 'https://jsonplaceholder.typicode.com/posts';
		Axios.get(url).then((res) => {
			this.setState({
				posts: res.data.slice(0, 10),
			});
			console.log(res.data.slice(0, 10));
		});
	}

	onOpenModal = (i) => {
		this.setState({
			open: true,
			selectedPost: i, // When a post is clicked, mark it as selected
		});
	};

	onCloseModal = () => {
		this.setState({ open: false });
	};

	renderPosts = () => {
		return this.state.posts.map((post, i) => {
			return (
				<div
					key={post.id}
					style={{ width: 400, height: 400, backgroundColor: 'orange' }}
					onClick={() => this.onOpenModal(i)} // Pass the id of the clicked post
				>
					<h1>{post.title}</h1>
				</div>
			);
		});
	};

	renderModal = () => {
		// Check to see if there's a selected post. If so, render it.
		if (this.state.selectedPost !== null) {
			const post = this.state.posts[this.state.selectedPost];
			return (
				<div style={{ width: 400, height: 400, backgroundColor: 'orange' }}>
					<h1>{post.id}</h1>
					<h1>{post.title}</h1>
					<p>{post.body}</p>
				</div>
			);
		}
	};

	render() {
		const { open } = this.state;
		return (
			<div style={styles}>
				<h2>react-responsive-modal</h2>

				<div>{this.renderPosts()}</div>
				<Modal open={open} onClose={this.onCloseModal} center>
					<h2>Simple centered modal</h2>
					<div>{this.renderModal()}</div>
				</Modal>
			</div>
		);
	}
}
