package org.anta.cloud_service.cloud_service.repository;


import org.anta.cloud_service.cloud_service.entity.FileMetadata;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FileMetadataRepository extends JpaRepository<FileMetadata , Long> {

    List<FileMetadata> findByProductId(Long productId);

}
