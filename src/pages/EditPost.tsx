import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import databasesService from "../appwrite/databases";
import { Models } from "appwrite";
import { Container, PostFrom } from "../components";

export interface Props extends Models.Document {
    title: string;
    slug: string;
    content: string;
    status: "active" | "inactive";
    featuredImage: string;
    userId: string;
    image: Array<File>;
}

function EditPost() {
    const [post, setPost] = useState<Props>();
    const { slug } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (slug) {
            databasesService.getPost(slug)
                .then((post) => {
                    post && setPost(post as Props);
                })
                .catch(error => console.log(error));
        } else {
            navigate("/");
        }
    }, [slug, navigate]);

    return post ? (
        <div className="py-8">
            <Container>
                <PostFrom {...post as Props} />
            </Container>
        </div>
    ) : null;
}

export default EditPost;