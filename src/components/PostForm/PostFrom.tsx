import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import databasesService from "../../appwrite/databases";
import storageService from "../../appwrite/storage";
import { useCallback, useEffect } from "react";
import { Button, Input, Rte, Select } from "..";
import { Props } from "../../pages/EditPost";

function PostFrom(post?: Props) {
    const { register, handleSubmit, control, setValue, watch, getValues } = useForm<Props>({
        defaultValues: {
            title: post?.title || "",
            slug: post?.slug || "",
            content: post?.content || "",
            status: post?.status || "active",
        }
    });

    const navigate = useNavigate();
    const userData = useAppSelector(state => state.auth.userData);

    const onSubmit: SubmitHandler<Props> = async (data) => {
        if (post) {
            const file = data.image[0] ? await storageService.uploadFile(data.image[0]) : null;

            if (file) {
                storageService.deleteFile(post.featuredImage);
            }
            const dbPost = await databasesService.updatePost(post.$id, { ...data, featuredImage: file ? file.$id : "", userId: userData?.$id as string });

            dbPost && navigate(`/post/${dbPost.$id}`);
        } else {
            const file = await storageService.uploadFile(data.image[0]);

            if (file) {
                const fileId = file.$id;
                data.featuredImage = fileId;
                const dbPost = await databasesService.createPost({ ...data, userId: userData?.$id as string });

                dbPost && navigate(`post/${dbPost.$id}`);
            }
        }
    };

    const slugTransform = useCallback((value: string) => {
        if (value)
            return value
                .trim()
                .toLowerCase()
                .replace(/^[a-zA-Z\d]+/g, "-");

        return '';
    }, []);

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue('slug', slugTransform(value.title as string), { shouldValidate: true });
            }
        });

        return () => {
            subscription.unsubscribe();
        };
    }, [watch, slugTransform, setValue]);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <Rte label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={`${storageService.getFilePreview(post.featuredImage)}`}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
}

export default PostFrom;