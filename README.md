# 🛍️ AntaShop — Microservice E-Commerce

[![JDK 21](https://img.shields.io/badge/JDK-21-blue?logo=java&logoColor=white)](https://www.oracle.com/java/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.x-brightgreen?logo=spring&logoColor=white)](https://spring.io/projects/spring-boot)
[![Maven](https://img.shields.io/badge/Maven-3.x-C71A36?logo=apachemaven&logoColor=white)](https://maven.apache.org/)
[![MySQL](https://img.shields.io/badge/MySQL-8.x-4479A1?logo=mysql&logoColor=white)](https://www.mysql.com/)
[![MapStruct](https://img.shields.io/badge/MapStruct-1.x-0B83A5?logo=mapbox&logoColor=white)](https://mapstruct.org/)
[![OpenAPI](https://img.shields.io/badge/OpenAPI-Springdoc-blue?logo=openapi&logoColor=white)](https://springdoc.org/)
[![Postman](https://img.shields.io/badge/Postman-Collection-FF6C37?logo=postman&logoColor=white)](https://www.postman.com/)

---

## 📘 Giới thiệu

**AntaShop** là một dự án e-commerce mini được triển khai theo kiến trúc **Microservice / SOA**.  
Mục tiêu: tách rõ ràng các bounded-context (identity, product, cloud/file, mail, payment) để thuận lợi cho phát triển, testing và mở rộng.

**Yêu cầu môi trường (dev):**
- Java 21 (JDK 21)
- Maven
- MySQL 8.x
- Postman (test API)
- Không dùng Docker (chạy local bằng `mvn spring-boot:run`)

---

## 🏗️ Kiến trúc hệ thống

Hệ thống gồm các service chính:

- `identity-service` — Quản lý user, authentication (JWT), addresses, audit_logs. (DB: `identity_service`)
- `product-service` — CRUD sản phẩm, lưu thông tin images (images JSON). (DB: `product_service`)
- `cloud-service` — Lưu metadata file, tích hợp Cloudinary (upload/serve). (DB: `cloud_service`)
- `mail-service` — Gửi email HTML/text, reset password emails. (Không DB)
- `payment-service` — Skeleton cho tích hợp Momo (sẽ mở rộng, có DB khi cần).

**Luồng ví dụ**: upload ảnh → `cloud-service` trả về URL → lưu URL vào `product-service` → hiển thị frontend.  
Các service giao tiếp qua REST + JWT cho authorization.

---

## 🔧 Tech Stack

### Backend
- Java 21 + Spring Boot 3.x  
- Maven
- Spring Data JPA / Hibernate
- MapStruct (entity ⇄ DTO)
- Springdoc OpenAPI (Swagger UI)
- MySQL 8.x

### Storage / 3rd party
- Cloudinary (file storage)
- SMTP provider (Mail service)
- Momo (payment client skeleton)

### Tools
- Postman (API testing)
- IntelliJ IDEA (IDE)

---

## ⚙️ Ports & DB (gợi ý dev)

| Service | Port (gợi ý) | Database |
|---|---:|:---|
| identity-service | 8081 | `identity_service` |
| product-service  | 8082 | `product_service` |
| cloud-service    | 8083 | `cloud_service` |
| mail-service     | 8084 | — |
| payment-service  | 8085 | TBD |

> Lưu ý: cập nhật `server.port` và `spring.datasource` trong `application.yml` tương ứng.

---

## 🚀 Quickstart (chạy local)

1. **Cài đặt**
   - Cài JDK 21 và set `JAVA_HOME`.
   - Cài MySQL 8.x, tạo user/password.

2. **Tạo database**
   - Mở MySQL Workbench / CLI và chạy các SQL bên dưới (hoặc dùng script).

3. **Cấu hình từng service**
   - Mở `src/main/resources/application.yml` cho mỗi service.
   - Đặt `spring.datasource.url`, `username`, `password`.
   - Đặt `server.port`.

4. **Build & chạy**
   ```bash
   # ví dụ: product-service
   cd product-service
   mvn clean package -DskipTests
   mvn spring-boot:run
