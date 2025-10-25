package org.anta.repository;

import org.anta.entity.ProductVariant;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ProductVariantRepository extends JpaRepository<ProductVariant , Long> {

    List<ProductVariant> findByProductId(Long productId);
    boolean existsBySku(String sku);
}
