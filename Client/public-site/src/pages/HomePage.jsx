import Card from "../components/Card";
import axios from "../../config/instance";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";

export default function HomePage() {
  const [products, setProducts] = useState({
    data: [],
    currentPage: 1,
    totalPage: 1,
  });
  const [categories, setCategories] = useState([]);
  const [query, setQuery] = useState({
    search: "",
    page: 1,
    pageSize: 10,
    sort: "-name",
    filter: "",
  });

  const fetchCategories = async () => {
    try {
      const { data } = await axios({
        method: "get",
        url: "/categories",
      });
      setCategories(data);
    } catch (error) {
      Swal.fire("Failed to fetch categories");
    }
  };

  const fetchProducts = async () => {
    try {
      const { search, page, pageSize, sort, filter } = query;

      const { data } = await axios({
        method: "get",
        url: `/pub/?search=${search}&page[number]=${page}&page[size]=${pageSize}&sort=${sort}&filter=${filter}`,
      });
      console.log(data, "ini dataaaa");

      setProducts(data);
      setQuery((el) => ({ ...el, page: data.currentPage }));
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setQuery({ ...query, search: e.target.value });
  };

  const handleSort = (e) => {
    setQuery({ ...query, sort: e.target.value });
  };

  const handleFilter = (e) => {
    setQuery({ ...query, filter: e.target.value });
  };

  const handlePageSizeChange = (e) => {
    setQuery({ ...query, pageSize: Number(e.target.value), page: 1 });
  };

  const handlePageChange = (newPage) => {
    setQuery({ ...query, page: newPage });
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [query.search, query.page, query.pageSize, query.sort, query.filter]);

  return (
    <div className="home-page">
      <div
        className="filters filter-container"
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "20px",
          padding: "10px",
          backgroundColor: "#f8f9fa",
          borderRadius: "5px",
        }}
      >
        <input
          type="text"
          placeholder="Search..."
          value={query.search}
          onChange={handleSearch}
          style={{
            flex: 1,
            padding: "8px",
            border: "1px solid #ced4da",
            borderRadius: "4px",
          }}
        />
        <select
          value={query.sort}
          onChange={handleSort}
          style={{
            flex: 1,
            padding: "8px",
            border: "1px solid #ced4da",
            borderRadius: "4px",
          }}
        >
          <option value="-name">Sort by Name (Descending)</option>
          <option value="name">Sort by Name (Ascending)</option>
          <option value="-price">Sort by Price (Descending)</option>
          <option value="price">Sort by Price (Ascending)</option>
          <option value="-stock">Sort by Stock (Descending)</option>
          <option value="stock">Sort by Stock (Ascending)</option>
          <option value="-createdAt">Sort by createdAt (Descending)</option>
          <option value="createdAt">Sort by createdAt (Ascending)</option>
          <option value="-updatedAt">Sort by updatedAt (Descending)</option>
          <option value="updatedAt">Sort by updatedAt (Ascending)</option>
        </select>
        <select
          value={query.filter}
          onChange={handleFilter}
          style={{
            flex: 1,
            padding: "8px",
            border: "1px solid #ced4da",
            borderRadius: "4px",
          }}
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.id}. {category.name}
            </option>
          ))}
        </select>
        <select
          value={query.pageSize}
          onChange={handlePageSizeChange}
          style={{
            flex: 1,
            padding: "8px",
            border: "1px solid #ced4da",
            borderRadius: "4px",
          }}
        >
          <option value={10}>10 items per page</option>
          <option value={20}>20 items per page</option>
          <option value={50}>50 items per page</option>
          <option value={100}>100 items per page</option>
        </select>
      </div>
      <div className="container mt-4">
        <div className="row">
          {products.data.length > 0 ? (
            products.data.map((product) => (
              <Card key={product.id} product={product} />
            ))
          ) : (
            <p>No products found</p>
          )}
        </div>
      </div>
      <div className="pagination">
        <button
          onClick={() => handlePageChange(query.page - 1)}
          disabled={query.page === 1}
        >
          Previous
        </button>
        <span>
          Page {query.page} of {products.totalPage}
        </span>
        <button
          onClick={() => handlePageChange(query.page + 1)}
          disabled={query.page === products.totalPage}
        >
          Next
        </button>
      </div>
    </div>
  );
}
