import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Layout } from '../components';
import './BlogDetailPage.css';

export default function BlogDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const post = {
    id: id,
    title: 'ANTA tặng code ưu đãi độc quyền sốc cho khách hàng thành viên',
    image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=1200',
    category: 'Khuyến mãi',
    date: '2024-01-15',
    author: 'ANTA Việt Nam',
    readTime: '3 phút đọc',
    content: `
      <p>Chương trình ưu đãi đặc biệt dành riêng cho khách hàng thành viên của ANTA Việt Nam đã chính thức được triển khai. Đây là cơ hội tuyệt vời để các khách hàng trung thành có thể sở hữu những sản phẩm chất lượng cao với mức giá ưu đãi nhất.</p>

      <h2>Các mã giảm giá độc quyền</h2>
      <p>ANTA Việt Nam tự hào giới thiệu ba mức ưu đãi hấp dẫn dành cho khách hàng thành viên:</p>

      <ul>
        <li><strong>CAMP50</strong> - Giảm 50.000₫ cho đơn hàng từ 999.000₫</li>
        <li><strong>CAMP100</strong> - Giảm 100.000₫ cho đơn hàng từ 1.599.000₫</li>
        <li><strong>CAMP250</strong> - Giảm 250.000₫ cho đơn hàng từ 2.999.000₫</li>
      </ul>

      <h2>Cách thức áp dụng</h2>
      <p>Việc sử dụng mã giảm giá vô cùng đơn giản. Bạn chỉ cần:</p>

      <ol>
        <li>Chọn sản phẩm yêu thích và thêm vào giỏ hàng</li>
        <li>Tiến hành thanh toán</li>
        <li>Nhập mã giảm giá phù hợp vào ô "Mã giảm giá"</li>
        <li>Nhấn "Áp dụng" để hưởng ưu đãi</li>
      </ol>

      <h2>Thời gian áp dụng</h2>
      <p>Chương trình có hiệu lực từ ngày 15/01/2024 đến hết ngày 31/01/2024. Đừng bỏ lỡ cơ hội tuyệt vời này!</p>

      <h2>Điều khoản và điều kiện</h2>
      <ul>
        <li>Mỗi khách hàng chỉ được sử dụng mỗi mã giảm giá một lần</li>
        <li>Không áp dụng đồng thời với các chương trình khuyến mãi khác</li>
        <li>Mã giảm giá chỉ áp dụng cho sản phẩm không sale</li>
        <li>ANTA Việt Nam có quyền thay đổi hoặc kết thúc chương trình mà không cần báo trước</li>
      </ul>

      <p>Hãy nhanh tay đăng ký thành viên và tận hưởng những ưu đãi độc quyền từ ANTA Việt Nam. Trải nghiệm mua sắm tuyệt vời với những sản phẩm thể thao chất lượng cao đang chờ đón bạn!</p>
    `
  };

  const relatedPosts = [
    {
      id: 2,
      title: 'Bí quyết chọn giày chạy bộ phù hợp cho người mới bắt đầu',
      image: 'https://images.pexels.com/photos/2529157/pexels-photo-2529157.jpeg?auto=compress&cs=tinysrgb&w=600',
      date: '2024-01-12'
    },
    {
      id: 3,
      title: 'ANTA ra mắt bộ sưu tập mới dành cho mùa hè 2024',
      image: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=600',
      date: '2024-01-10'
    },
    {
      id: 4,
      title: '5 bài tập thể dục tại nhà hiệu quả với trang phục ANTA',
      image: 'https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg?auto=compress&cs=tinysrgb&w=600',
      date: '2024-01-08'
    }
  ];

  return (
    <Layout>
      <div className="blog-detail-page">
        <div className="breadcrumbs">
          <div className="container">
            <span className="breadcrumb-link" onClick={() => navigate('/home')}>Trang chủ</span>
            <span className="breadcrumb-separator">/</span>
            <span className="breadcrumb-link" onClick={() => navigate('/blog')}>Tin tức</span>
            <span className="breadcrumb-separator">/</span>
            <span className="breadcrumb-current">{post.title}</span>
          </div>
        </div>

        <div className="blog-detail-container">
          <div className="container">
            <article className="blog-article">
              <header className="article-header">
                <span className="article-category">{post.category}</span>
                <h1 className="article-title">{post.title}</h1>
                <div className="article-meta">
                  <span className="meta-item">
                    <span className="meta-icon">👤</span>
                    {post.author}
                  </span>
                  <span className="meta-item">
                    <span className="meta-icon">📅</span>
                    {new Date(post.date).toLocaleDateString('vi-VN')}
                  </span>
                  <span className="meta-item">
                    <span className="meta-icon">⏱️</span>
                    {post.readTime}
                  </span>
                </div>
              </header>

              <div className="article-image">
                <img src={post.image} alt={post.title} />
              </div>

              <div className="article-content" dangerouslySetInnerHTML={{ __html: post.content }} />

              <footer className="article-footer">
                <div className="article-tags">
                  <span className="tag">ANTA</span>
                  <span className="tag">Khuyến mãi</span>
                  <span className="tag">Ưu đãi</span>
                  <span className="tag">Thành viên</span>
                </div>

                <div className="article-share">
                  <span className="share-label">Chia sẻ:</span>
                  <button className="share-btn facebook">Facebook</button>
                  <button className="share-btn twitter">Twitter</button>
                  <button className="share-btn zalo">Zalo</button>
                </div>
              </footer>
            </article>

            <div className="related-posts-section">
              <h2 className="section-title">Bài viết liên quan</h2>
              <div className="related-posts-grid">
                {relatedPosts.map(relatedPost => (
                  <div
                    key={relatedPost.id}
                    className="related-post-card"
                    onClick={() => navigate(`/blog/${relatedPost.id}`)}
                  >
                    <div className="related-post-image">
                      <img src={relatedPost.image} alt={relatedPost.title} />
                    </div>
                    <div className="related-post-content">
                      <span className="related-post-date">
                        {new Date(relatedPost.date).toLocaleDateString('vi-VN')}
                      </span>
                      <h3 className="related-post-title">{relatedPost.title}</h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="comments-section">
              <h2 className="section-title">Bình luận</h2>
              <div className="comment-form">
                <textarea
                  placeholder="Để lại bình luận của bạn..."
                  rows="4"
                  className="comment-input"
                ></textarea>
                <button className="submit-comment-btn">Gửi bình luận</button>
              </div>

              <div className="comments-list">
                <div className="comment-item">
                  <div className="comment-avatar">N</div>
                  <div className="comment-content">
                    <div className="comment-header">
                      <strong className="commenter-name">Nguyễn Văn A</strong>
                      <span className="comment-date">2 ngày trước</span>
                    </div>
                    <p className="comment-text">
                      Chương trình rất hấp dẫn! Cảm ơn ANTA đã mang đến những ưu đãi tuyệt vời cho khách hàng.
                    </p>
                  </div>
                </div>

                <div className="comment-item">
                  <div className="comment-avatar">T</div>
                  <div className="comment-content">
                    <div className="comment-header">
                      <strong className="commenter-name">Trần Thị B</strong>
                      <span className="comment-date">3 ngày trước</span>
                    </div>
                    <p className="comment-text">
                      Mình đã sử dụng mã CAMP100 và rất hài lòng. Sản phẩm chất lượng, giao hàng nhanh!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
