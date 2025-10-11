package com.example.product_service.controller;

import com.example.product_service.dto.request.ProductRequest;
import com.example.product_service.dto.response.ProductResponse;
import com.example.product_service.entity.Product;
import com.example.product_service.repository.ProductRepository;
import com.example.product_service.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/product")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    //@GetMapping("/all")
    //public

    @PostMapping("/add")
    public ResponseEntity<Map<String, Object>> addProduct(@RequestBody ProductRequest productRequest ){

        ProductResponse productResponse = productService.createProduct(productRequest);

        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(productResponse.getId())
                .toUri();

        Map<String, Object> body = Map.of(
                "id", productResponse.getId(),
                "name", productResponse.getName()
        );

        return ResponseEntity.created(location).body(body) ;
    }

//    @PostMapping("/add")
//    public ResponseEntity<ProductResponse> addProduct(@RequestBody ProductRequest productRequest ){
//        return ResponseEntity.ok(productService.createProduct(productRequest)) ;
//    }

//    @PostMapping("/addProduct")
//    public ResponseEntity<Product> addProduct(@RequestBody Product product) {
//        Product saved = productRepository.save(product);
//        return ResponseEntity.ok(saved);
//    }

//    @PutMapping("/update")
//    public ResponseEntity<?> update(@PathVariable Long id , ProductResponse productResponse){
//
//        return ResponseEntity.ok("Update :" +id);
//    }



}
