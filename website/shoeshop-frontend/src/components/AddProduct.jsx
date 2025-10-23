import React, { useState } from 'react';
import './AddProduct.css';

export default function AddProduct() {
  const [formData, setFormData] = useState({
    productName: '',
    description: '',
    stock: '',
    category: ''
  });
  const [selectedCategory, setSelectedCategory] = useState('quan-ao-nam');
  const [images, setImages] = useState([]);

  const categories = [
    { id: 'quan-ao-nam', name: 'Quần áo nam' },
    { id: 'quan-ao-nu', name: 'Quần áo nữ' },
    { id: 'giay-nam', name: 'Giày nam' },
    { id: 'giay-nu', name: 'Giày nữ' },
    { id: 'phu-kien', name: 'Phụ kiện' },
    { id: 'the-thao', name: 'Thể thao' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    setFormData(prev => ({
      ...prev,
      category: categories.find(cat => cat.id === categoryId)?.name || ''
    }));
  };

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    const newImages = files.map(file => ({
      id: Date.now() + Math.random(),
      file,
      preview: URL.createObjectURL(file)
    }));
    setImages(prev => [...prev, ...newImages]);
  };

  const removeImage = (imageId) => {
    setImages(prev => prev.filter(img => img.id !== imageId));
  };

  const handleSubmit = () => {
    // TODO: Implement product submission
    // console.log('Submitting product:', formData);
    // console.log('Images:', images);
  };

  const handleEdit = () => {
    // TODO: Implement product editing
    // console.log('Editing product');
  };

  return (
    <div className="add-product">
      <div className="admin-content">
        <div className="page-header">
          <h1 className="page-title">Sản phẩm</h1>
          <div className="header-actions">
            <select className="month-selector">
              <option value="May 2022">May 2022</option>
              <option value="April 2022">April 2022</option>
              <option value="March 2022">March 2022</option>
            </select>
          </div>
        </div>

        <div className="tabs">
          <button className="tab">Sản phẩm của tôi</button>
          <button className="tab active">Thêm sản phẩm</button>
          <button className="tab">Vi phạm</button>
        </div>

        <div className="add-product-section">
          <div className="product-form">
            <div className="form-section">
              <h3>Thêm sản phẩm mới</h3>
              
              <div className="form-fields">
                <div className="form-group">
                  <label>Tên sản phẩm</label>
                  <input
                    type="text"
                    value={formData.productName}
                    onChange={(e) => handleInputChange('productName', e.target.value)}
                    placeholder="Nhập tên sản phẩm"
                  />
                </div>
                
                <div className="form-group">
                  <label>Mô tả sản phẩm</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Nhập mô tả sản phẩm"
                    rows="4"
                  />
                </div>
                
                <div className="form-group">
                  <label>Cổ phần</label>
                  <input
                    type="number"
                    value={formData.stock}
                    onChange={(e) => handleInputChange('stock', e.target.value)}
                    placeholder="Nhập số lượng"
                  />
                </div>
              </div>
              
              <div className="form-actions">
                <button className="edit-btn" onClick={handleEdit}>
                  Chỉnh sửa
                </button>
                <button className="submit-btn" onClick={handleSubmit}>
                  Gửi
                </button>
              </div>
            </div>

            <div className="category-section">
              <div className="form-group">
                <label>Tên danh mục</label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  placeholder="Nhập tên danh mục"
                />
              </div>
              
              <div className="category-list">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    className={`category-item ${selectedCategory === category.id ? 'selected' : ''}`}
                    onClick={() => handleCategorySelect(category.id)}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="image-upload-section">
              <div className="image-grid">
                {Array.from({ length: 6 }, (_, index) => {
                  const image = images[index];
                  return (
                    <div key={index} className="image-upload-box">
                      {image ? (
                        <div className="image-preview">
                          <img src={image.preview} alt={`Preview ${index + 1}`} />
                          <button 
                            className="remove-image"
                            onClick={() => removeImage(image.id)}
                          >
                            ✕
                          </button>
                        </div>
                      ) : (
                        <label className="upload-placeholder">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            style={{ display: 'none' }}
                          />
                          <div className="upload-icon">📷</div>
                          <span>Thêm ảnh</span>
                        </label>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          
          <div className="confirm-section">
            <button className="confirm-btn" onClick={handleSubmit}>
              Xác nhận
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
