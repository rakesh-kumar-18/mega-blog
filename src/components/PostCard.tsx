import { Link } from "react-router-dom";
import storageService from "../appwrite/storage";

type Props = {
    $id: string;
    title: string;
    featuredImage: string;
};

function PostCard({ $id, title, featuredImage }: Props) {
    return (
        <Link to={`/post/${$id}`}>
            <div className="w-full bg-gray-100 rounded-xl p-4">
                <div className="w-full justify-center mb-4">
                    <img
                        src={`${storageService.getFilePreview(featuredImage)}`}
                        alt={title}
                        className="rounded-xl"
                    />
                </div>

                <h2 className="text-xl font-bold">{title}</h2>
            </div>
        </Link>
    );
}

export default PostCard;