package com.ai.resume.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "bullet_point")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BulletPoint {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "parent_id", nullable = false)
    private Long parentId;

    @Column(name = "parent_type", nullable = false, length = 50)
    private String parentType;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String content;

    @Column(name = "display_order")
    @Builder.Default
    private Integer displayOrder = 0;
}
