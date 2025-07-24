const nodemailer = require('nodemailer');

// Tạo transporter cho Gmail
const createTransporter = () => {
  return nodemailer.createTransporter({
    service: 'gmail',
    auth: {
      user: process.env.ADMIN_EMAIL || 'nhuthoas04@gmail.com',
      pass: process.env.ADMIN_EMAIL_PASSWORD // App Password từ Gmail
    }
  });
};

// Gửi email thông báo đơn hàng mới
const sendOrderNotification = async (orderData) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: process.env.ADMIN_EMAIL || 'nhuthoas04@gmail.com',
      to: 'nhuthoas04@gmail.com', // Email admin nhận thông báo
      subject: `🛎️ Đơn hàng mới #${orderData.orderId}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #FF6B35; text-align: center;">🛎️ ĐỔN HÀNG MỚI</h2>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; margin: 20px 0;">
            <h3>📋 Thông tin đơn hàng:</h3>
            <p><strong>Mã đơn hàng:</strong> #${orderData.orderId}</p>
            <p><strong>Thời gian:</strong> ${new Date().toLocaleString('vi-VN')}</p>
            <p><strong>Tổng tiền:</strong> ${new Intl.NumberFormat('vi-VN', {style: 'currency', currency: 'VND'}).format(orderData.totalAmount)}</p>
            <p><strong>Trạng thái:</strong> ${orderData.status === 'pending' ? 'Chờ xử lý' : orderData.status}</p>
          </div>

          <div style="background: #fff; border: 1px solid #ddd; padding: 20px; border-radius: 10px; margin: 20px 0;">
            <h3>👤 Thông tin khách hàng:</h3>
            <p><strong>Tên:</strong> ${orderData.customerInfo.name}</p>
            <p><strong>Email:</strong> ${orderData.customerInfo.email}</p>
            <p><strong>Số điện thoại:</strong> ${orderData.customerInfo.phone}</p>
            <p><strong>Địa chỉ:</strong> ${orderData.customerInfo.address}</p>
          </div>

          <div style="background: #fff; border: 1px solid #ddd; padding: 20px; border-radius: 10px; margin: 20px 0;">
            <h3>🍹 Chi tiết sản phẩm:</h3>
            ${orderData.items.map(item => `
              <div style="border-bottom: 1px solid #eee; padding: 10px 0;">
                <p><strong>${item.name}</strong></p>
                <p>Size: ${item.size} | Nhiệt độ: ${item.temperature} | Độ ngọt: ${item.sweetness}</p>
                <p>Số lượng: ${item.quantity} x ${new Intl.NumberFormat('vi-VN', {style: 'currency', currency: 'VND'}).format(item.price)}</p>
                ${item.note ? `<p>Ghi chú: ${item.note}</p>` : ''}
              </div>
            `).join('')}
          </div>

          <div style="text-align: center; margin: 30px 0;">
            <a href="http://localhost:3000/admin" style="background: #FF6B35; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold;">
              Xem chi tiết trong Admin
            </a>
          </div>

          <div style="text-align: center; color: #666; font-size: 14px; margin-top: 30px;">
            <p>ECLIPSE - Hệ thống quản lý đơn hàng</p>
          </div>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log('✅ Email thông báo đơn hàng đã được gửi');
    return { success: true };

  } catch (error) {
    console.error('❌ Lỗi gửi email:', error);
    return { success: false, error: error.message };
  }
};

// Gửi email xác nhận cho khách hàng
const sendOrderConfirmation = async (orderData) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: process.env.ADMIN_EMAIL || 'nhuthoas04@gmail.com',
      to: orderData.customerInfo.email,
      subject: `✅ Xác nhận đơn hàng #${orderData.orderId} - ECLIPSE`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #FF6B35; text-align: center;">✅ CẢM ƠN BẠN ĐÃ ĐẶT HÀNG!</h2>
          
          <p>Xin chào <strong>${orderData.customerInfo.name}</strong>,</p>
          <p>Chúng tôi đã nhận được đơn hàng của bạn và đang xử lý.</p>

          <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; margin: 20px 0;">
            <h3>📋 Thông tin đơn hàng:</h3>
            <p><strong>Mã đơn hàng:</strong> #${orderData.orderId}</p>
            <p><strong>Thời gian đặt:</strong> ${new Date().toLocaleString('vi-VN')}</p>
            <p><strong>Tổng tiền:</strong> ${new Intl.NumberFormat('vi-VN', {style: 'currency', currency: 'VND'}).format(orderData.totalAmount)}</p>
          </div>

          <div style="background: #fff; border: 1px solid #ddd; padding: 20px; border-radius: 10px; margin: 20px 0;">
            <h3>🍹 Sản phẩm đã đặt:</h3>
            ${orderData.items.map(item => `
              <div style="border-bottom: 1px solid #eee; padding: 10px 0;">
                <p><strong>${item.name}</strong></p>
                <p>Size: ${item.size} | Nhiệt độ: ${item.temperature} | Độ ngọt: ${item.sweetness}</p>
                <p>Số lượng: ${item.quantity} x ${new Intl.NumberFormat('vi-VN', {style: 'currency', currency: 'VND'}).format(item.price)}</p>
              </div>
            `).join('')}
          </div>

          <div style="background: #e8f5e8; padding: 15px; border-radius: 10px; margin: 20px 0;">
            <p><strong>🕒 Thời gian chuẩn bị dự kiến:</strong> 15-20 phút</p>
            <p><strong>📞 Hotline:</strong> 1900-xxxx</p>
          </div>

          <div style="text-align: center; color: #666; font-size: 14px; margin-top: 30px;">
            <p>Cảm ơn bạn đã chọn ECLIPSE! ☕</p>
          </div>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log('✅ Email xác nhận đã được gửi cho khách hàng');
    return { success: true };

  } catch (error) {
    console.error('❌ Lỗi gửi email xác nhận:', error);
    return { success: false, error: error.message };
  }
};

module.exports = {
  sendOrderNotification,
  sendOrderConfirmation
};
