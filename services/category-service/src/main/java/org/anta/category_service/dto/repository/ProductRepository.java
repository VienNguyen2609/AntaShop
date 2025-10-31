package org.anta.category_service.dto.repository;

import org.anta.category_service.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByCategoryId(Long CategoryId);
    boolean existsBySlug(String slug);
}
