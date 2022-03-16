import { useState } from "react";

function NewPostForm() {
    const [title, setTitle] = useState('');
    const [errors, setErrors] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <form onSubmit={(e) => handleSubmit(e)}>
            <input
                type="textarea"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <button>Submit</button>
        </form>
    )
}

export default NewPostForm;
