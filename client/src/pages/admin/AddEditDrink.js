import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import '../../styles/AddEditDrink.css';

const AddEditDrink = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const isEdit = Boolean(id);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'coffee',
    size: [],
    temperature: [],
    sweetness: [],
    ingredients: '',
    images: [],
    stock: 1,
    preparationTime: 5,
    calories: 0,
    discount: 0,
    isAvailable: true,
    isRecommended: false
  });

  const [imageFiles, setImageFiles] = useState([]); // Thêm state cho files
  const [uploadProgress, setUploadProgress] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const categories = [
    { value: 'coffee', label: 'Cà phê' },
    { value: 'a-me', label: 'A-Mê' },
    { value: 'hi-tea', label: 'Hi-Tea' },
    { value: 'matcha', label: 'Matcha' },
    { value: 'cake', label: 'Bánh mặn và ngọt' }
  ];

  const sizeOptions = [
    { value: 'S', label: 'Size S' },
    { value: 'M', label: 'Size M' },
    { value: 'L', label: 'Size L' },
    { value: 'XL', label: 'Size XL' }
  ];

  const temperatureOptions = [
    { value: 'hot', label: 'Nóng' },
    { value: 'cold', label: 'Lạnh' },
    { value: 'room', label: 'Thường' }
  ];

  const sweetnessOptions = [
    { value: 'none', label: 'Không đường' },
    { value: 'low', label: 'Ít đường' },
    { value: 'normal', label: 'Bình thường' },
    { value: 'high', label: 'Nhiều đường' }
  ];

  useEffect(() => {
    if (isEdit) {
      fetchDrink();
    }
  }, [id, isEdit]);

  const fetchDrink = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:5000/api/drinks/${id}`);
      
      if (response.data.success) {
        const drink = response.data.data;
        setFormData({
          ...drink,
          ingredients: Array.isArray(drink.ingredients) ? drink.ingredients.join(', ') : drink.ingredients,
          price: drink.price.toString(),
          preparationTime: drink.preparationTime || 5,
          calories: drink.calories || 0,
          discount: drink.discount || 0
        });
      }
    } catch (error) {
      setError('Không thể tải thông tin đồ uống');
      console.error('Error fetching drink:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
    } else if (type === 'number') {
      setFormData(prev => ({
        ...prev,
        [name]: Number(value)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleMultiSelectChange = (name, value) => {
    setFormData(prev => {
      const currentValues = prev[name] || [];
      if (currentValues.includes(value)) {
        return {
          ...prev,
          [name]: currentValues.filter(item => item !== value)
        };
      } else {
        return {
          ...prev,
          [name]: [...currentValues, value]
        };
      }
    });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    
    if (files.length > 5) {
      setError('Chỉ được chọn tối đa 5 ảnh');
      return;
    }

    setImageFiles(files);
    
    // Tạo preview cho ảnh mới
    const newPreviews = files.map(file => ({
      url: URL.createObjectURL(file),
      isNew: true,
      file: file
    }));
    
    setFormData(prev => ({
      ...prev,
      imagePreviews: newPreviews
    }));
  };

  const uploadImages = async () => {
    if (imageFiles.length === 0) return [];

    try {
      setUploadProgress(true);
      const formDataUpload = new FormData();
      
      imageFiles.forEach(file => {
        formDataUpload.append('images', file);
      });

      const response = await axios.post(
        'http://localhost:5000/api/drinks/upload',
        formDataUpload,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );

      if (response.data.success) {
        return response.data.data.images;
      }
      return [];
    } catch (error) {
      console.error('Upload error:', error);
      setError('Lỗi upload ảnh: ' + error.response?.data?.message || error.message);
      return [];
    } finally {
      setUploadProgress(false);
    }
  };

  const handleImageRemove = (index, isNew = false) => {
    if (isNew) {
      // Xóa ảnh mới (chưa upload)
      setImageFiles(prev => prev.filter((_, i) => i !== index));
      setFormData(prev => ({
        ...prev,
        imagePreviews: prev.imagePreviews?.filter((_, i) => i !== index) || []
      }));
    } else {
      // Xóa ảnh cũ (đã có trên server)
      setFormData(prev => ({
        ...prev,
        images: prev.images.filter((_, i) => i !== index)
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Kiểm tra token
    const currentToken = localStorage.getItem('token');
    if (!currentToken) {
      setError('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.');
      return;
    }
    
    // Validation
    if (!formData.name.trim()) {
      setError('Tên đồ uống không được để trống');
      return;
    }
    
    if (!formData.description.trim()) {
      setError('Mô tả không được để trống');
      return;
    }
    
    if (!formData.price || Number(formData.price) <= 0) {
      setError('Giá phải là số dương');
      return;
    }

    if (!formData.size.length) {
      setError('Phải chọn ít nhất một size');
      return;
    }

    try {
      setLoading(true);
      setError('');
      setSuccess('');

      // Upload ảnh trước (nếu có)
      let uploadedImages = [];
      if (imageFiles.length > 0) {
        uploadedImages = await uploadImages();
      }

      const submitData = {
        ...formData,
        price: Number(formData.price),
        ingredients: formData.ingredients.split(',').map(item => item.trim()).filter(item => item),
        preparationTime: Number(formData.preparationTime),
        calories: Number(formData.calories),
        discount: Number(formData.discount)
      };

      let response;
      if (isEdit) {
        // Khi edit, sử dụng FormData để gửi kèm file
        const formDataToSend = new FormData();
        
        // Thêm các trường thông tin
        Object.keys(submitData).forEach(key => {
          if (key === 'images') {
            // Gửi ảnh cũ (URL) riêng
            submitData[key].forEach(img => {
              formDataToSend.append('existingImages', img);
            });
          } else if (Array.isArray(submitData[key])) {
            // Gửi array dưới dạng JSON string
            formDataToSend.append(key, JSON.stringify(submitData[key]));
          } else {
            formDataToSend.append(key, submitData[key]);
          }
        });
        
        // Thêm file ảnh mới
        imageFiles.forEach(file => {
          formDataToSend.append('images', file);
        });
        
        response = await axios.put(`http://localhost:5000/api/drinks/${id}`, formDataToSend, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
      } else {
        // Khi thêm mới
        if (imageFiles.length > 0) {
          uploadedImages = await uploadImages();
        }
        
        submitData.images = [...(formData.images || []), ...uploadedImages];
        
        response = await axios.post('http://localhost:5000/api/drinks', submitData, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
      }

      if (response.data.success) {
        setSuccess(isEdit ? 'Cập nhật đồ uống thành công!' : 'Thêm đồ uống thành công!');
        setTimeout(() => {
          navigate('/admin/drinks');
        }, 2000);
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Có lỗi xảy ra');
      console.error('Error saving drink:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading && isEdit) {
    return <div className="loading">Đang tải...</div>;
  }

  return (
    <div className="add-edit-drink">
      <div className="add-edit-drink__header">
        <h1>{isEdit ? 'Sửa đồ uống' : 'Thêm đồ uống mới'}</h1>
        <button 
          className="btn-back"
          onClick={() => navigate('/admin/drinks')}
        >
          ← Quay lại
        </button>
      </div>

      {error && <div className="alert alert-error">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <form onSubmit={handleSubmit} className="drink-form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="name">Tên đồ uống *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              placeholder="Nhập tên đồ uống"
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Loại đồ uống *</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              required
            >
              {categories.map(cat => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="price">Giá (VNĐ) *</label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              required
              min="0"
              step="1000"
              placeholder="0"
            />
          </div>

          <div className="form-group">
            <label htmlFor="discount">Giảm giá (%)</label>
            <input
              type="number"
              id="discount"
              name="discount"
              value={formData.discount}
              onChange={handleInputChange}
              min="0"
              max="100"
              placeholder="0"
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="description">Mô tả</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows="4"
            placeholder="Mô tả về đồ uống..."
          />
        </div>

        <div className="form-group">
          <label htmlFor="image">Hình ảnh (tối đa 5 ảnh)</label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            multiple
            className="file-input"
          />
          
          {/* Hiển thị ảnh đã có (khi edit) */}
          {formData.images && formData.images.length > 0 && (
            <div className="image-preview-section">
              <h4>Ảnh hiện tại:</h4>
              <div className="image-preview-group">
                {formData.images.map((image, index) => (
                  <div key={index} className="image-preview">
                    <img src={image} alt={`Current ${index + 1}`} />
                    <button
                      type="button"
                      className="btn-remove-image"
                      onClick={() => handleImageRemove(index, false)}
                      title="Xóa ảnh"
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Hiển thị ảnh mới (preview) */}
          {formData.imagePreviews && formData.imagePreviews.length > 0 && (
            <div className="image-preview-section">
              <h4>Ảnh mới:</h4>
              <div className="image-preview-group">
                {formData.imagePreviews.map((preview, index) => (
                  <div key={index} className="image-preview">
                    <img src={preview.url} alt={`Preview ${index + 1}`} />
                    <button
                      type="button"
                      className="btn-remove-image"
                      onClick={() => handleImageRemove(index, true)}
                      title="Xóa ảnh"
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {uploadProgress && (
            <div className="upload-progress">
              <p>Đang upload ảnh...</p>
            </div>
          )}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Kích thước *</label>
            <div className="checkbox-group">
              {sizeOptions.map(size => (
                <label key={size.value} className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={formData.size.includes(size.value)}
                    onChange={() => handleMultiSelectChange('size', size.value)}
                  />
                  {size.label}
                </label>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>Nhiệt độ</label>
            <div className="checkbox-group">
              {temperatureOptions.map(temp => (
                <label key={temp.value} className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={formData.temperature.includes(temp.value)}
                    onChange={() => handleMultiSelectChange('temperature', temp.value)}
                  />
                  {temp.label}
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="form-group">
          <label>Độ ngọt</label>
          <div className="checkbox-group">
            {sweetnessOptions.map(sweet => (
              <label key={sweet.value} className="checkbox-label">
                <input
                  type="checkbox"
                  checked={formData.sweetness.includes(sweet.value)}
                  onChange={() => handleMultiSelectChange('sweetness', sweet.value)}
                />
                {sweet.label}
              </label>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="ingredients">Nguyên liệu (cách nhau bằng dấu phẩy)</label>
          <textarea
            id="ingredients"
            name="ingredients"
            value={formData.ingredients}
            onChange={handleInputChange}
            rows="3"
            placeholder="Cà phê, sữa, đường, đá..."
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="preparationTime">Thời gian chuẩn bị (phút)</label>
            <input
              type="number"
              id="preparationTime"
              name="preparationTime"
              value={formData.preparationTime}
              onChange={handleInputChange}
              min="1"
              max="60"
              placeholder="5"
            />
          </div>

          <div className="form-group">
            <label htmlFor="calories">Calories</label>
            <input
              type="number"
              id="calories"
              name="calories"
              value={formData.calories}
              onChange={handleInputChange}
              min="0"
              placeholder="0"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="isAvailable"
                checked={formData.isAvailable}
                onChange={handleInputChange}
              />
              Có sẵn
            </label>
          </div>

          <div className="form-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="isRecommended"
                checked={formData.isRecommended}
                onChange={handleInputChange}
              />
              Đề xuất
            </label>
          </div>
        </div>

        <div className="form-actions">
          <button 
            type="button" 
            className="btn btn-secondary"
            onClick={() => navigate('/admin/drinks')}
          >
            Hủy
          </button>
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? 'Đang xử lý...' : (isEdit ? 'Cập nhật' : 'Thêm mới')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEditDrink;
