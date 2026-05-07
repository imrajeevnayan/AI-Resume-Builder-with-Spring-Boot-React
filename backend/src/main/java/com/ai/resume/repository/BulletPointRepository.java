package com.ai.resume.repository;

import com.ai.resume.entity.BulletPoint;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BulletPointRepository extends JpaRepository<BulletPoint, Long> {
    List<BulletPoint> findByParentIdAndParentTypeOrderByDisplayOrderAsc(Long parentId, String parentType);
    void deleteByParentId(Long parentId);
}
