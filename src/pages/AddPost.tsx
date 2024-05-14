import { Container, PostFrom } from "../components";
// import { Props } from "./EditPost";

function AddPost() {
    return (
        <div className="py-8">
            <Container>
                <PostFrom />
            </Container>
        </div>
    );
}

export default AddPost;