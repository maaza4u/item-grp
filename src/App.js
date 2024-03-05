import React, { useState, useEffect } from "react";
import dummyData from "./dummy.json";

const FilterToggle = ({ categories, selectedCategories, onToggleCategory }) => {
  return (
    <div style={{ margin: "10px", border: "1px solid #ccc", padding: "10px" }}>
      <h3>Filter by Category</h3>
      {categories.map((category) => (
        <div key={category} style={{ marginBottom: "5px" }}>
          <input
            type="checkbox"
            id={category}
            checked={selectedCategories.includes(category)}
            onChange={() => onToggleCategory(category)}
          />
          <label htmlFor={category} style={{ marginLeft: "5px" }}>
            {category}
          </label>
        </div>
        
      ))}
    </div>
  );
};

const App = () => {
  const [data, setData] = useState(dummyData);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState(
    Object.keys(dummyData),
  );

  useEffect(() => {
    setData(dummyData);
  }, []);

  const debounce = (func, delay) => {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const handleSearch = debounce((value) => {
    setSearchTerm(value);
  }, 30);

  const handleToggleCategory = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <FilterToggle
        categories={Object.keys(dummyData)}
        selectedCategories={selectedCategories}
        onToggleCategory={handleToggleCategory}
      />
      <div style={{ marginLeft: "20px" }}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search"
          style={{ marginBottom: "10px", padding: "5px" }}
        />
        {selectedCategories.map((category) => (
          <div key={category} style={{ marginBottom: "20px" }}>
            <h2>{category}</h2>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {data[category]
                .filter((item) =>
                  item.text.toLowerCase().includes(searchTerm.toLowerCase()),
                )
                .map((item) => (
                  <div
                    key={item.text}
                    style={{ marginRight: "20px", marginBottom: "20px" }}
                  >
                    <img
                      src={item.image}
                      alt={item.text}
                      style={{
                        width: "150px",
                        height: "150px",
                        marginBottom: "5px",
                      }}
                    />
                    <p style={{ textAlign: "center" }}>{item.text}</p>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
