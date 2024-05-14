import { Editor } from "@tinymce/tinymce-react";
import { Control, Controller } from "react-hook-form";
import { Props as P } from "./PostForm/PostFrom";

interface Props {
    name: string;
    control: Control<P>;
    label: string;
    defaultValue: string;
}

function Rte({ name, control, label, defaultValue = "" }: Props) {
    return (
        <div className="w-full">
            {label && <label className="inline-block mb-1 pl-1">{label}</label>}

            <Controller
                name={name || "content"}
                control={control}
                defaultValue={defaultValue}
                render={({ field: { onChange } }) => (
                    <Editor
                        initialValue="default value"
                        init={{
                            branding: false,
                            height: 500,
                            menubar: true,
                            plugins: [
                                'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                                'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                            ],
                            toolbar: 'undo redo | blocks | ' +
                                'bold italic forecolor | alignleft aligncenter ' +
                                'alignright alignjustify | bullist numlist outdent indent | ' +
                                'removeformat | help',
                            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                        }}
                        onEditorChange={onChange}
                    />
                )}
            />


        </div>
    );
}

export default Rte;