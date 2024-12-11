import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import ArticleForm from "./ArticleForm";
import ArticleTable from "./ArticleTable";

const Dashboard = () => {
  const API_URL = process.env.REACT_APP_API_URL;
  const article_URL = `${API_URL}/articles`; 
  const [articles, setArticles] = useState([]);
  const [editingArticle, setEditingArticle] = useState(null);

  // Fetch articles using useCallback 
  const fetchArticles = useCallback(async () => {
    try {
      const response = await axios.get(article_URL);
      console.log(response.data);
      if (response.data && response.data.data) {
        setArticles(response.data.data); 
      }
    } catch (error) {
      console.error("Error fetching articles:", error);
    }
  }, [article_URL]); 

  // Add or update an article
  const handleSave = async (article) => {
    console.log("Saving article:", article);  // Log data yang dikirim
    try {
      const formData = new FormData();
      formData.append("name", article.title);
      formData.append("description", article.content);
      if (article.image) {
        formData.append("image", article.image);
      }
      // Pastikan URL dan endpoint sudah benar
      const response = await axios.post(article_URL, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("Response:", response);  // Log response dari API
      await fetchArticles();
    } catch (error) {
      console.error("Error saving article:", error);
    }
  };

  // Delete an article
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      await fetchArticles(); 
    } catch (error) {
      console.error("Error deleting article:", error);
    }
  };

  // Edit an article
  const handleEdit = (article) => {
    setEditingArticle(article);
  };

  useEffect(() => {
    fetchArticles(); 
  }, [fetchArticles]); 

  return (
    <div className="container mt-5">
      <h1 className="mb-4 text-center">Dashboard</h1>
      <div className="row">
        <div className="col-md-5">
          <div className="p-4 border rounded mb-4">
            <h3 className="mb-3">
              {editingArticle ? "Edit Article" : "Add Article"}
            </h3>
            <ArticleForm onSave={handleSave} initialData={editingArticle} />
          </div>
        </div>
        <div className="col-md-7">
          <div className="p-4 border rounded">
            <h3 className="mb-3">Articles</h3>
            <ArticleTable
              articles={articles}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
