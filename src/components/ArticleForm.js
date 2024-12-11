import React, { useState, useEffect } from "react";

const ArticleForm = ({ onSave, initialData }) => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    image: null, // Untuk file gambar
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.name,  // Gunakan `name` sebagai `title`
        content: initialData.description,  // Gunakan `description` sebagai `content`
        image: null, // Reset file input saat mengedit artikel
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] }); // Menyimpan file gambar
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);  // Kirim form data ke parent (Dashboard)
    setFormData({ title: "", content: "", image: null }); // Reset form setelah submit
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">Title</label>
        <input
          type="text"
          className="form-control"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Content</label>
        <textarea
          className="form-control"
          name="content"
          rows="4"
          value={formData.content}
          onChange={handleChange}
          required
        ></textarea>
      </div>
      <div className="mb-3">
        <label className="form-label">Image</label>
        <input
          type="file"
          className="form-control"
          name="image"
          onChange={handleFileChange}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        {initialData ? "Update" : "Add"}
      </button>
    </form>
  );
};

export default ArticleForm;
