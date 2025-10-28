import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../components';
import './BlogPage.css';

export default function BlogPage() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'Tất cả' },
    { id: 'news', name: 'Tin tức' },
    { id: 'promotion', name: 'Khuyến mãi' },
    { id: 'sport', name: 'Thể thao' },
    { id: 'guide', name: 'Hướng dẫn' }
  ];

  const blogPosts = [
    {
      id: 1,
      title: 'ANTA tặng code ưu đãi độc quyền sốc cho khách hàng thành viên',
      excerpt: 'Chương trình ưu đãi đặc biệt dành riêng cho khách hàng thành viên của ANTA Việt Nam. Nhận ngay mã giảm giá lên đến 250.000đ...',
      image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'promotion',
      date: '2024-01-15',
      author: 'ANTA Việt Nam',
      readTime: '3 phút đọc'
    },
    {
      id: 2,
      title: 'Bí quyết chọn giày chạy bộ phù hợp cho người mới bắt đầu',
      excerpt: 'Việc lựa chọn một đôi giày chạy bộ phù hợp là vô cùng quan trọng đối với người mới bắt đầu. Hãy cùng ANTA tìm hiểu những tiêu chí quan trọng...',
      image: 'https://images.pexels.com/photos/2529157/pexels-photo-2529157.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'guide',
      date: '2024-01-12',
      author: 'Nguyễn Văn A',
      readTime: '5 phút đọc'
    },
    {
      id: 3,
      title: 'ANTA ra mắt bộ sưu tập mới dành cho mùa hè 2024',
      excerpt: 'Bộ sưu tập mùa hè 2024 của ANTA mang đến những thiết kế trẻ trung, năng động với chất liệu thoáng mát, phù hợp cho mọi hoạt động thể thao...',
      image: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'news',
      date: '2024-01-10',
      author: 'ANTA Việt Nam',
      readTime: '4 phút đọc'
    },
    {
      id: 4,
      title: '5 bài tập thể dục tại nhà hiệu quả với trang phục ANTA',
      excerpt: 'Không cần đến phòng gym, bạn vẫn có thể duy trì vóc dáng hoàn hảo với 5 bài tập đơn giản tại nhà cùng trang phục thể thao ANTA...',
      image: 'https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'sport',
      date: '2024-01-08',
      author: 'Trần Thị B',
      readTime: '6 phút đọc'
    },
    {
      id: 5,
      title: 'Mega Sale cuối năm - Giảm giá lên đến 50% toàn bộ sản phẩm',
      excerpt: 'Sự kiện Mega Sale lớn nhất trong năm đã quay trở lại! Hàng ngàn sản phẩm giảm giá sốc lên đến 50%. Đừng bỏ lỡ cơ hội sở hữu sản phẩm chính hãng...',
      image: 'https://images.pexels.com/photos/1619654/pexels-photo-1619654.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'promotion',
      date: '2024-01-05',
      author: 'ANTA Việt Nam',
      readTime: '2 phút đọc'
    },
    {
      id: 6,
      title: 'Cách bảo quản giày thể thao để giữ được lâu nhất',
      excerpt: 'Những mẹo đơn giản nhưng hiệu quả giúp bạn bảo quản giày thể thao luôn mới và bền đẹp theo thời gian. Tìm hiểu ngay để giày của bạn được bảo vệ tốt nhất...',
      image: 'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'guide',
      date: '2024-01-03',
      author: 'Lê Văn C',
      readTime: '4 phút đọc'
    }
  ];

  const filteredPosts = selectedCategory === 'all' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  const featuredPost = blogPosts[0];

  return (
    <Layout>
      <div className="blog-page">
        <div className="breadcrumbs">
          <div className="container">
            <span className="breadcrumb-link" onClick={() => navigate('/home')}>Trang chủ</span>
            <span className="breadcrumb-separator">/</span>
            <span className="breadcrumb-current">Tin tức</span>
          </div>
        </div>

        <div className="blog-container">
          <div className="container">
            <div className="blog-header">
              <h1>Tin Tức & Sự Kiện</h1>
              <p>Cập nhật những thông tin mới nhất từ ANTA Việt Nam</p>
            </div>

            <div className="featured-post" onClick={() => navigate(`/blog/${featuredPost.id}`)}>
              <div className="featured-image">
                <img src={featuredPost.image} alt={featuredPost.title} />
                <span className="featured-badge">Nổi bật</span>
              </div>
              <div className="featured-content">
                <div className="post-meta">
                  <span className="post-category">{categories.find(c => c.id === featuredPost.category)?.name}</span>
                  <span className="post-date">{new Date(featuredPost.date).toLocaleDateString('vi-VN')}</span>
                </div>
                <h2>{featuredPost.title}</h2>
                <p>{featuredPost.excerpt}</p>
                <div className="post-footer">
                  <span className="post-author">Bởi {featuredPost.author}</span>
                  <span className="post-read-time">{featuredPost.readTime}</span>
                </div>
              </div>
            </div>

            <div className="blog-categories">
              {categories.map(category => (
                <button
                  key={category.id}
                  className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  {category.name}
                </button>
              ))}
            </div>

            <div className="blog-grid">
              {filteredPosts.slice(1).map(post => (
                <article
                  key={post.id}
                  className="blog-card"
                  onClick={() => navigate(`/blog/${post.id}`)}
                >
                  <div className="blog-card-image">
                    <img src={post.image} alt={post.title} />
                    <span className="category-badge">
                      {categories.find(c => c.id === post.category)?.name}
                    </span>
                  </div>
                  <div className="blog-card-content">
                    <div className="blog-card-meta">
                      <span className="blog-date">{new Date(post.date).toLocaleDateString('vi-VN')}</span>
                      <span className="blog-read-time">{post.readTime}</span>
                    </div>
                    <h3>{post.title}</h3>
                    <p>{post.excerpt}</p>
                    <div className="blog-card-footer">
                      <span className="blog-author">Bởi {post.author}</span>
                      <button className="read-more-btn">Đọc thêm →</button>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="blog-pagination">
              <button className="pagination-btn" disabled>Trước</button>
              <button className="pagination-btn active">1</button>
              <button className="pagination-btn">2</button>
              <button className="pagination-btn">3</button>
              <button className="pagination-btn">Sau</button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
