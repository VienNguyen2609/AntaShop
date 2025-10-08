package com.example.product_service.controller;

import com.example.product_service.entity.Product;
import com.example.product_service.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/product")
@RequiredArgsConstructor
public class ProductController {

    private final ProductRepository productRepository ;

    @PostMapping(value = "/add", consumes = "multipart/form-data")
    public ResponseEntity<Product> addProduct(
            @RequestParam("name") String name,
            @RequestParam("brand") String brand,
            @RequestParam("description") String description,
            @RequestParam("price") Double price,
            @RequestParam("stock") Integer stock,
            @RequestParam("size") String size,
            @RequestParam("color") String color,
            @RequestParam("category") String category,
            @RequestParam("images") List<MultipartFile> images
    ) {
        // Giả lập lưu file
        List<String> imagePaths = new ArrayList<>();
        for (MultipartFile file : images) {
            imagePaths.add(file.getOriginalFilename());
        }

        Product product = Product.builder()
                .name(name)
                .brand(brand)
                .description(description)
                .price(price)
                .stock(stock)
                .size(size)
                .color(color)
                .category(category)
                .images(imagePaths)
                .build();

        Product saved = productRepository.save(product);
        return ResponseEntity.ok(saved);
    }

//    @PostMapping("/addProduct")
//    public ResponseEntity<Product> addProduct(@RequestBody Product product) {
//        Product saved = productRepository.save(product);
//        return ResponseEntity.ok(saved);
//    }

}
