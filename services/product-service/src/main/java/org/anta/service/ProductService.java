package org.anta.service;


import org.anta.dto.request.ProductRequest;
import org.anta.dto.response.ProductResponse;
import org.anta.entity.Product;
import org.anta.mapper.ProductMapper;
import org.anta.repository.ProductRepository;
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

    public ProductResponse getProductById(Long id){
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));
        return productMapper.toResponse(product);
    }

    public ProductResponse addProduct(ProductRequest productRequest){

        Product product = new Product();
        product.setName(productRequest.getName());
        product.setBrand(productRequest.getBrand());
        product.setDescription(productRequest.getDescription());
        product.setPrice(productRequest.getPrice());
        product.setCategory(productRequest.getCategory());
        product.setImages(productRequest.getImages() == null ? List.of() :
                productRequest.getImages());
        product.setCreatedAt(productRequest.getCreatedAt());

        return productMapper.toResponse(productRepository.save(product));
    }

    public ProductResponse updateProduct(Long id , ProductRequest productRequest){
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));

        product.setName(productRequest.getName());
        product.setBrand(productRequest.getBrand());
        product.setDescription(productRequest.getDescription());
        product.setPrice(productRequest.getPrice());
        product.setCategory(productRequest.getCategory());
        product.setImages(productRequest.getImages() == null ? List.of() :
                productRequest.getImages());
        product.setCreatedAt(productRequest.getCreatedAt());

        return productMapper.toResponse(productRepository.save(product));
    }


    public ProductResponse deleteProduct(Long id){
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));
        productRepository.delete(product);
        return productMapper.toResponse(product);
    }


}
