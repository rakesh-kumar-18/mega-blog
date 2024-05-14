import { Link } from "react-router-dom";
import storageService from "../appwrite/storage";
import { Props } from "../pages/AllPosts";

function PostCard(post: Props) {
    return (
        <Link to={`/post/${post.$id}`}>
            <div className="w-full bg-gray-100 rounded-xl p-4">
                <div className="w-full justify-center mb-4">
                    <img
                        src={`${storageService.getFilePreview(post.featuredImage)}`}
                        alt={post.title}
                        className="rounded-xl"
                    />
                </div>

                <h2 className="text-xl font-bold">{post.title}</h2>
            </div>
        </Link>
    );
}

export default PostCard;