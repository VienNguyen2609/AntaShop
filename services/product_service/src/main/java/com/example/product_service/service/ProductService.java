package com.example.product_service.service;


import com.example.product_service.dto.request.ProductRequest;
import com.example.product_service.dto.response.ProductResponse;
import com.example.product_service.entity.Product;
import com.example.product_service.mapper.ProductMapper;
import com.example.product_service.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor


public class ProductService {

    private final ProductRepository productRepository;

    private final ProductMapper productMapper;


    public List<ProductResponse> getAllProduct(){
        return productRepository.findAll()
                .stream()
                .map(productMapper::toResponse)
        .collect(Collectors.toList());

    }

    public ProductResponse createProduct(ProductRequest productRequest){

        Product product = new Product();
        product.setName(productRequest.getName());
        product.setBrand(productRequest.getBrand());
        product.setDescription(productRequest.getDescription());
        product.setPrice(productRequest.getPrice());
        product.setStock(productRequest.getStock());
        product.setSize(productRequest.getSize());
        product.setColor(productRequest.getColor());
        product.setCategory(productRequest.getCategory());

        product.setImages(productRequest.getImages() == null ? List.of() :
                productRequest.getImages());
        product.setCreatedAt(productRequest.getCreatedAt());

        return productMapper.toResponse(productRepository.save(product)); }


}
