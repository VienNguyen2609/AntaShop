package org.anta.category_service.controller;

import lombok.RequiredArgsConstructor;
import org.anta.category_service.dto.mapper.CategoryMapper;
import org.anta.category_service.dto.request.CategoryRequest;
import org.anta.category_service.dto.response.CategoryResponse;
import org.anta.category_service.entity.Category;
import org.anta.category_service.service.CategoryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/categories")
public class CategoryController {
    private final CategoryService categoryService;
    private final CategoryMapper categoryMapper;

    @GetMapping
    public ResponseEntity<List<CategoryResponse>> getAllCategory(){
        var list=categoryService.getAll().stream().map(categoryMapper::toResponse).toList();
        return ResponseEntity.ok(list);
    }

    @PostMapping
    public ResponseEntity<CategoryResponse> create(@RequestBody CategoryRequest rq){
        var ctr=categoryService.create(rq);
        return ResponseEntity.ok(categoryMapper.toResponse(ctr));
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id){
        categoryService.delete(id);
        return ResponseEntity.noContent().build();
    }



}
